import { getAccessToken, getRefreshToken, setTokens, removeTokens } from '../lib/cookies'

const API_URL = 'https://dummyjson.com'

interface FetchOptions extends Omit<RequestInit, 'body'> {
    params?: Record<string, string | number>
    body?: unknown
}

export const apiClient = async <T>(endpoint: string, options: FetchOptions = {}, _isRetry = false): Promise<T> => {
    const { params, headers, body, ...customConfig } = options

    const url = new URL(API_URL + endpoint)
    if (params) {
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, String(value)))
    }

    const configHeaders = new Headers(headers)

    if (!configHeaders.has('Content-Type')) {
        configHeaders.set('Content-Type', 'application/json')
    }

    const token = getAccessToken()
    if (token) {
        configHeaders.set('Authorization', `Bearer ${token}`)
    }

    const config: RequestInit = {
        ...customConfig,
        headers: configHeaders,
    }

    if (body) {
        if (configHeaders.get('Content-Type')?.includes('application/json')) {
            config.body = JSON.stringify(body);
        } else {
            config.body = body as BodyInit;
        }
    }

    const response = await fetch(url.toString(), config)

    if (response.status === 401 && !_isRetry) {
        const refreshToken = getRefreshToken()
        if (!refreshToken) {
            removeTokens()
            window.location.href = '/login'
            throw new Error('Unauthorized')
        }

        try {
            const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
            })

            if (!refreshResponse.ok) {
                throw new Error('Refresh token failed')
            }

            const data = await refreshResponse.json()
            setTokens(data.token, data.refreshToken)

            return await apiClient<T>(endpoint, options, true)
        } catch (error) {
            removeTokens()
            window.location.href = '/login'
            throw new Error('Session expired', { cause: error })
        }
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Request failed')
    }

    return response.json()
}
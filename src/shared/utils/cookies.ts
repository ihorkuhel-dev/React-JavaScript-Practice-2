const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const getCookie = (name: string): string | undefined => {
    const match = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.substring(name.length + 1)) : undefined;
};

const setCookie = (name: string, value: string, days: number) => {
    const isSecure = location.protocol === 'https:' ? ';Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)};max-age=${days * 86400};path=/;SameSite=Strict${isSecure}`;
};

const deleteCookie = (name: string) => {
    document.cookie = `${name}=;max-age=0;path=/`;
};

export const getAccessToken = () => getCookie(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => getCookie(REFRESH_TOKEN_KEY);

export const setTokens = (accessToken: string, refreshToken: string) => {
    setCookie(ACCESS_TOKEN_KEY, accessToken, 1);
    setCookie(REFRESH_TOKEN_KEY, refreshToken, 7);
};

export const removeTokens = () => {
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
};
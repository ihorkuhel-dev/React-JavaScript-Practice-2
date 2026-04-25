import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {apiClient} from "@/shared/api/base.ts";
import {removeTokens, setTokens} from "@/shared/lib/cookies.ts";


export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
    username: string;
    password: string;
}

export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
};

const loginFn = async (credentials: LoginCredentials): Promise<User> => {
  const data = await apiClient<User>('/auth/login', {
    method: 'POST',
    body: credentials,
  });
  
  if (data.accessToken && data.refreshToken) {
    setTokens(data.accessToken, data.refreshToken);
  }
  
  return data;
};

const registerFn = async (userData: RegisterCredentials): Promise<User> => {
    return await apiClient<User>('/users/add', {
      method: 'POST',
      body: userData,
  });
};

const getCurrentUserFn = async (): Promise<User> => {
  return await apiClient<User>('/auth/me');
};

const logoutFn = async (): Promise<void> => {
  removeTokens();
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.currentUser(), data);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerFn,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUserFn,
    retry: false,
  });
};

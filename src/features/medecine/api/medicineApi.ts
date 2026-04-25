import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {apiClient} from "@/shared/api/base.ts";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const productsKeys = {
  all: ['products'] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (params: GetProductsParams) => [...productsKeys.lists(), params] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...productsKeys.details(), id] as const,
};

const getProductsFn = async (params?: GetProductsParams): Promise<ProductsResponse> => {
  return await apiClient<ProductsResponse>('/products', {
    params: params as Record<string, string | number>,
  });
};

const getProductByIdFn = async (id: number | string): Promise<Product> => {
  return await apiClient<Product>(`/products/${id}`);
};

export const useProducts = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: productsKeys.list(params || {}),
    queryFn: () => getProductsFn(params),
    placeholderData: keepPreviousData,
  });
};

export const useProductById = (id: number | string, enabled: boolean = true) => {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => getProductByIdFn(id),
    enabled: !!id && enabled,
  });
};

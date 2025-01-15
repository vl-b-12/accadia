import { REQUEST } from "@/store/storeTypes";
import { apiRtk } from "../";
import { Product } from "@/types/types";

export interface ProductsResponse {
  items: Product[];
  page: number;
  hasNextPage: boolean;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface ProductsQuery {
  page?: number;
  sku?: string;
  code?: string;
  collection?: string;
  name?: string;
  jewelryType?: string;
}

export const productsApi = apiRtk.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, ProductsQuery>({
      query: ({ page, sku, code, collection, name, jewelryType }) => ({
        url: "/catalog",
        method: REQUEST.GET,
        params: { page, sku, code, collection, name, jewelryType },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;

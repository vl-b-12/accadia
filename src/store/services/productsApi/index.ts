import { apiRtk } from "../";
import { Product } from "@/types/types";
import { REQUEST } from "@/types/requestTypes";

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
    getCertificate: build.query({
      query: (sku: string) => ({
        url: `/catalog/get-certificate/${sku}`,
        method: REQUEST.GET,
        responseHandler: (res) => res.blob(),
        headers: {
          "Accept-type": "application/pdf",
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useLazyGetCertificateQuery } = productsApi;

import { REQUEST } from "@/store/storeTypes";
import { BaseQueryMeta } from "@reduxjs/toolkit/query";
import { apiRtk } from "../";

interface QueryParams {
  test?: string;
}

export const productApi = apiRtk.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<QueryParams, QueryParams>({
      query: (props: QueryParams) => ({
        url: "/api/catalog",
        method: REQUEST.GET,
        params: props,
      }),
      transformErrorResponse: (
        error: unknown,
        meta: BaseQueryMeta<never>,
        arg: unknown,
      ) => {
        console.log("log TRK Query ERROR transformErrorResponse ", {
          error,
          meta,
          arg,
        });
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApi;

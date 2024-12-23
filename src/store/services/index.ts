import {
  createApi,
  FetchArgs,
  BaseQueryFn,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { ServerError } from "../storeTypes";

export const RTK_TAGS = {
  ITEM: "item",
};

const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers, {}) => {
    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ServerError>;

export const apiRtk = createApi({
  reducerPath: "apiRtk",
  baseQuery: baseQuery,
  tagTypes: Object.values(RTK_TAGS),
  endpoints: () => ({}),
});

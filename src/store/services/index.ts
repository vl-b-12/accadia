import {
  createApi,
  FetchArgs,
  BaseQueryFn,
  fetchBaseQuery,
  // FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
  // REQUEST,
  ServerError,
} from "../storeTypes";

// interface BaseQueryWithReAuthArgs {
//   url: string;
//   method: string;
//   body: Record<string, unknown>;
// }
//
// interface ReAuthResult {
//   data?: { access_token: string };
//   error?: FetchBaseQueryError;
// }
//
// type BaseQueryWithReAuthFn = BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   ServerError
// >;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "/";

export const RTK_TAGS = {
  PRODUCTS: "products",
  CUSTOMERS: "customers",
} as const;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers: Headers, {}) => {
    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ServerError>;

// export const baseQueryWithReAuth: BaseQueryWithReAuthFn = async (
//   args,
//   store,
//   extraOptions,
// ) => {
//   let result = await baseQuery(args, store, extraOptions);
//
//   if (result.error && result.error.status === 401) {
//     const refreshToken = localStorage.getItem("refresh_token");
//
//     if (refreshToken) {
//       const refreshRequest: BaseQueryWithReAuthArgs = {
//         url: `/refresh`,
//         method: REQUEST.POST,
//         body: { refresh: refreshToken },
//       };
//
//       const refreshResult: ReAuthResult = await baseQuery(
//         refreshRequest,
//         store,
//         extraOptions,
//       );
//
//       if (refreshResult.data) {
//         localStorage.setItem("access_token", refreshResult.data.access_token);
//
//         result = await baseQuery(args, store, extraOptions);
//       } else {
//         console.error("Failed to refresh token:", refreshResult.error);
//         // store.dispatch(logoutUser());
//       }
//     } else {
//       console.warn("No refresh token found. Logging out...");
//       // store.dispatch(logoutUser());
//     }
//   }
//
//   return result;
// };

export const apiRtk = createApi({
  reducerPath: "apiRtk",
  baseQuery: baseQuery,
  tagTypes: Object.values(RTK_TAGS),
  endpoints: () => ({}),
});

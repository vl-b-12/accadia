import {
  createApi,
  FetchArgs,
  BaseQueryFn,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { REQUEST, ServerError } from "@/types/requestTypes";

interface BaseQueryWithReAuthArgs {
  url: string;
  method: string;
  body: Record<string, unknown>;
}

interface ReAuthResult {
  data?: { accessToken: string; refreshToken: string };
  error?: FetchBaseQueryError;
}

type BaseQueryWithReAuthFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  ServerError
>;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "/";

const logout = () => {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

export const RTK_TAGS = {
  PRODUCTS: "products",
  CUSTOMERS: "customers",
  CUSTOMERS_SEARCH: "customersSearch",
  CUSTOMERS_HISTORY: "customersHistory",
} as const;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { endpoint }) => {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken && endpoint !== "/users/login") {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ServerError>;

export const baseQueryWithReAuth: BaseQueryWithReAuthFn = async (
  args,
  store,
  extraOptions,
) => {
  let result = await baseQuery(args, store, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = sessionStorage.getItem("refresh_token");

    if (refreshToken) {
      const refreshRequest: BaseQueryWithReAuthArgs = {
        url: `/users/refresh`,
        method: REQUEST.POST,
        body: { refreshToken },
      };

      const refreshResult: ReAuthResult = (await baseQuery(
        refreshRequest,
        store,
        extraOptions,
      )) as unknown as ReAuthResult;

      if (refreshResult.data) {
        sessionStorage.setItem("access_token", refreshResult.data.accessToken);

        result = await baseQuery(args, store, extraOptions);
      } else {
        console.error("Failed to refresh token:", refreshResult.error);
        logout();
      }
    } else {
      console.warn("No refresh token found. Logging out...");
      logout();
    }
  }

  return result;
};

export const apiRtk = createApi({
  reducerPath: "apiRtk",
  baseQuery: baseQueryWithReAuth,
  tagTypes: Object.values(RTK_TAGS),
  endpoints: () => ({}),
});

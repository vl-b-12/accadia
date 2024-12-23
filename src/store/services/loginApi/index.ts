import { REQUEST } from "@/store/storeTypes";
import { BaseQueryMeta } from "@reduxjs/toolkit/query";
import { apiRtk } from "../";

interface SignUp {
  email: string;
  password: string;
}

interface SignUpResponse {
  accessToken?: string;
  refreshToken?: string;
  status: string;
}

//TODO update types after API integration

export const loginApi = apiRtk.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse, SignUp>({
      query: (props: SignUp) => ({
        url: "/login",
        method: REQUEST.POST,
        body: props,
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

export const { useSignUpMutation } = loginApi;

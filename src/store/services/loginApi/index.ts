import { REQUEST } from "@/types/requestTypes";
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

export const loginApi = apiRtk.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse, SignUp>({
      query: (props: SignUp) => ({
        url: "/users/login",
        method: REQUEST.POST,
        body: props,
      }),
    }),
  }),
});

export const { useSignUpMutation } = loginApi;

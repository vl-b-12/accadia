import { store } from "./store";

export enum REQUEST {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export interface ServerError {
  status: number | "CUSTOM_ERROR";
  data?: unknown;
  error?: string;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

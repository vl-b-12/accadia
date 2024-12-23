import { store } from "./store";

export enum REQUEST {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export interface ServerError {
  data?: unknown;
  status?: unknown;
  message?: string;
  error?: unknown;
}

// export interface ServerViolation {
//     field: string;
//     message: string;
// }

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

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

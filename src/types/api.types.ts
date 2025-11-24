export interface EchoRequest {
  message: string;
}

export interface EchoResponse {
  status: "ok";
  echo: string;
}

export interface ApiErrorResponse {
  status: "error";
  message: string;
  retryAfter?: number; // seconds until rate limit resets
}
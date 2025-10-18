export interface ApiResponse {
  Message: string;
  Data: Record<string, string>;
  ErrorDetails: Record<string, string[]>;
}
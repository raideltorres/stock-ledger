export type Role = "ADMIN" | "USER";
export type Action = "GO_TO_SALES" | "GO_TO_PROFILE" | "LOG_OUT";

export interface ErrorDetails {
  error: string;
  message: string;
  statusCode: number;
}

export interface ErrorResponse {
  data: ErrorDetails;
  status: number;
}

export interface Identifiable {
  _id: string;
}

export interface Counts {
  count?: number;
}

export interface GetResponse<T> {
  count: number;
  data: T[];
  page: number;
  pageCount: number;
  total: number;
}

export interface SideMenuItem {
  title: string;
  url?: string;
  action?: Action;
  icon?: React.ReactNode;
}

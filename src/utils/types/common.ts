export type Role = "ALL" | "ADMIN" | "USER";
export type UserStatus = "ALL" | "PENDING" | "ACTIVE" | "INACTIVE" | "DELETED";
export type EntityStatus = "ALL" | "ACTIVE" | "INACTIVE" | "DELETED";
export type LocationStatus = "ALL" | "ACTIVE" | "INACTIVE" | "DELETED";
export type LocationType = "ALL" | "WAREHOUSE" | "SALES_FLOOR";
export type CustomerStatus = "ALL" | "ACTIVE" | "INACTIVE" | "DELETED";
export type ProviderStatus = "ALL" | "ACTIVE" | "INACTIVE" | "DELETED";
export type PoTransStatus = "ALL" | "QUOTED" | "RECEIVED" | "INVOICED";
export type Action =
  | "GO_TO_SALES"
  | "GO_TO_PROFILE"
  | "GO_TO_NOTIFICATIONS"
  | "LOG_OUT"
  | "EDIT"
  | "DELETE";

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
  _id?: string;
}

export interface Counts {
  count?: number;
}

export interface GetResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface SideMenuItem {
  title: string;
  url?: string;
  action?: Action;
  icon?: React.ReactNode;
}

export interface ActionData<T> extends Identifiable {
  partial?: T;
  action?: Action;
}

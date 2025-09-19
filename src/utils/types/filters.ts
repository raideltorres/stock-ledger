import type { UserStatus } from "./common";

export interface BaseFiltersState {
  page?: number;
  limit?: number;
}

export interface UsersFilterState extends BaseFiltersState {
  criteria?: string;
  status?: UserStatus;
  role?: string;
}

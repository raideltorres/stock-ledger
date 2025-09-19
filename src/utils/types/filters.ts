import type {
  EntityStatus,
  LocationStatus,
  LocationType,
  Role,
  UserStatus,
} from "./common";

export interface BaseFiltersState {
  page?: number;
  limit?: number;
}

export interface UsersFilterState extends BaseFiltersState {
  criteria?: string;
  status?: UserStatus;
  role?: Role;
}

export interface EntitiesFilterState extends BaseFiltersState {
  criteria?: string;
  status?: EntityStatus;
}

export interface LocationsFilterState extends BaseFiltersState {
  entity?: string;
  criteria?: string;
  type?: LocationType;
  status?: LocationStatus;
}

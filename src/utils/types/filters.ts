import type {
  CustomerStatus,
  EntityStatus,
  LocationStatus,
  LocationType,
  PoTransStatus,
  ProviderStatus,
  Role,
  SoTransStatus,
  UserStatus,
} from "./common";
import type { PoTrans, PoTransLine } from "./po-trans";
import type { SoTrans, SoTransLine } from "./so-trans";

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

export interface CustomersFilterState extends BaseFiltersState {
  criteria?: string;
  status?: CustomerStatus;
}

export interface ProvidersFilterState extends BaseFiltersState {
  criteria?: string;
  status?: ProviderStatus;
}

export interface ProductsFilterState extends BaseFiltersState {
  criteria?: string;
}

export interface PoTransFilterState extends BaseFiltersState {
  location?: string;
  user?: string;
  provider?: string;
  status?: PoTransStatus;
}

export interface PoTransDetailState {
  order?: PoTrans;
  editedLines?: PoTransLine[];
}

export interface SoTransFilterState extends BaseFiltersState {
  location?: string;
  user?: string;
  customer?: string;
  status?: SoTransStatus;
}

export interface SoTransDetailState {
  order?: SoTrans;
  editedLines?: SoTransLine[];
}

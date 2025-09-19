import type { LocationStatus, Identifiable, LocationType } from "./common";
import type { Entity } from "./entity";

export interface LocationArgs {
  entity?: string;
  name?: string;
  description?: string;
  type?: LocationType;
  status?: LocationStatus;
  metadata?: Record<string, unknown>;
}

export interface Location extends Identifiable {
  entity?: Entity;
  name?: string;
  description?: string;
  avatar?: string;
  type?: LocationType;
  status?: LocationStatus;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

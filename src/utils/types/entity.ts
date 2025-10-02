import type { EntityStatus, Identifiable } from "./common";

export interface EntityArgs {
  name?: string;
  description?: string;
  status?: EntityStatus;
  metadata?: Record<string, unknown>;
}

export interface Entity extends Identifiable {
  name?: string;
  description?: string;
  avatar?: string;
  status?: EntityStatus;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

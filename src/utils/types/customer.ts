import type { CustomerStatus, Identifiable } from "./common";

export interface CustomerArgs {
  name?: string;
  email?: string;
  description?: string;
  status?: CustomerStatus;
  metadata?: Record<string, unknown>;
}

export interface Customer extends Identifiable {
  name?: string;
  email?: string;
  description?: string;
  avatar?: string;
  status?: CustomerStatus;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

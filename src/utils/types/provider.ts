import type { ProviderStatus, Identifiable } from "./common";

export interface ProviderArgs {
  name?: string;
  email?: string;
  description?: string;
  status?: ProviderStatus;
  metadata?: Record<string, unknown>;
}

export interface Provider extends Identifiable {
  name?: string;
  email?: string;
  description?: string;
  avatar?: string;
  status?: ProviderStatus;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

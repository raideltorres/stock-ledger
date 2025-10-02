import type { Identifiable } from "./common";

export interface ProductArgs {
  barcode?: string;
  name?: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface Product extends Identifiable {
  avatar?: string;
  barcode?: string;
  name?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

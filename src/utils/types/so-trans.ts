import type { Identifiable, SoTransStatus } from "./common";
import type { Customer } from "./customer";
import type { Location } from "./location";
import type { Product } from "./product";
import type { User } from "./user";

export interface NewSoTransLineData {
  product?: string;
  barcode?: string;
  name?: string;
  unitPrice?: number;
  qty?: number;
}

export interface SoTransLineArgs {
  product?: string;
  invTrans?: string;
  unitPrice?: number;
  qty?: number;
  amount?: number;
}

export interface SoTransArgs {
  location?: string;
  user?: string;
  customer?: string;
  status?: SoTransStatus;
  lines?: SoTransLineArgs[];
  amount?: number;
}

export interface SoTransLine {
  product?: Product;
  invTrans?: string;
  unitPrice?: number;
  qty?: number;
  amount?: number;
}

export interface SoTrans extends Identifiable {
  location?: Location;
  user?: User;
  customer?: Customer;
  status?: SoTransStatus;
  amount?: number;
  lines?: SoTransLine[];
}

import type { Identifiable, PoTransStatus } from "./common";
import type { Location } from "./location";
import type { Product } from "./product";
import type { Provider } from "./provider";
import type { User } from "./user";

export interface NewPoTransLineData {
  product?: string;
  barcode?: string;
  name?: string;
  unitPrice?: number;
  qty?: number;
}

export interface PoTransLineArgs {
  product?: string;
  invTrans?: string;
  unitPrice?: number;
  qty?: number;
  amount?: number;
}

export interface PoTransArgs {
  location?: string;
  user?: string;
  provider?: string;
  status?: PoTransStatus;
  lines?: PoTransLineArgs[];
  amount?: number;
}

export interface PoTransLine {
  product?: Product;
  invTrans?: string;
  unitPrice?: number;
  qty?: number;
  amount?: number;
}

export interface PoTrans extends Identifiable {
  location?: Location;
  user?: User;
  provider?: Provider;
  status?: PoTransStatus;
  amount?: number;
  lines?: PoTransLine[];
}

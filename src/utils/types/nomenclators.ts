import type { Identifiable } from "./common";

export interface Entity extends Identifiable {
  name: string;
  description: string;
}

export interface Location extends Identifiable {
  entity: Entity;
  name: string;
  description: string;
}

import { Accident } from "./Accident";

export type ModelPointWithDensity = Accident & {
  density: number;
};
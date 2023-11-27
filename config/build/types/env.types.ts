import { BuildPort } from "./types";

export type GlobalEnvKeys = Record<any, any>;

export interface GlobalEnvVariables {
  PORT: BuildPort;
}

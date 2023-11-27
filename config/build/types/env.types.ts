import { BuildMode, BuildPort } from "./types";

export type GlobalEnvKeys = Record<any, any>;

export interface GlobalEnvVariables {
  PORT: BuildPort;
}

export interface ScriptEnvVariables {
  mode: BuildMode;
  analyzer?: boolean;
}

import { GlobalEnvVariables, ScriptEnvVariables } from "./env.types";

export type BuildPort = number;

export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  env: string;
}

export type BuildMode = "production" | "development";

export interface BuildOptions extends ScriptEnvVariables {
  globalEnv: GlobalEnvVariables;
  port: BuildPort;
  paths: BuildPaths;
  isDev: boolean;
  isProd: boolean;
}

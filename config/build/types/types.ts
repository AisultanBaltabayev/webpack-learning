import { GlobalEnvVariables } from "./env.types";

export type BuildPort = number;

export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  env: string;
}

export type BuildMode = "production" | "development";

export interface BuildOptions {
  globalEnv: GlobalEnvVariables;
  port: BuildPort;
  paths: BuildPaths;
  mode: BuildMode;
  isDev: boolean;
  isProd: boolean;
}

import { GlobalEnvVariables, ScriptEnvVariables } from './env.types';

export type BuildPort = number;

export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  env: string;
  public: string;
  src: string;
}

export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions extends ScriptEnvVariables {
  globalEnv: GlobalEnvVariables;
  port: GlobalEnvVariables['PORT'];
  paths: BuildPaths;
  isDev: boolean;
  isProd: boolean;
}

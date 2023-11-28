import { BuildMode, BuildPort, BuildPlatform } from './types';

export type GlobalEnvKeys = Record<any, any>;

export interface GlobalEnvVariables {
  PORT: BuildPort;
  PLATFORM?: BuildPlatform;
}

export interface ScriptEnvVariables {
  mode: BuildMode;
  platform?: GlobalEnvVariables['PLATFORM'];
  analyzer?: boolean;
}

export interface ExternalEnvVariables {
  PLATFORM?: GlobalEnvVariables['PLATFORM'];
  IS_DEV?: boolean;
}

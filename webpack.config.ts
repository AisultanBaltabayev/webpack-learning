import path from 'path';
import { Configuration } from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
  ScriptEnvVariables,
} from './config/build/types';
import { buildGlobalEnv } from './config/build/BuildEnv';

export const BuildModeEnums: Record<BuildMode, BuildMode> = {
  development: 'development',
  production: 'production',
};

export const BuildPlatformEnums: Record<BuildPlatform, BuildPlatform> = {
  desktop: 'desktop',
  mobile: 'mobile',
};

export default (scriptEnv: ScriptEnvVariables) => {
  const mode = scriptEnv.mode ?? BuildModeEnums.development;
  const platform = scriptEnv.platform;
  const isDev = mode === BuildModeEnums.development;
  const isProd = mode === BuildModeEnums.production;

  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    env: path.join(__dirname, `.env.${mode}`),
    src: path.resolve(__dirname, 'src'),
  };

  const globalEnv = buildGlobalEnv(paths.env, {
    PLATFORM: platform,
    IS_DEV: isDev,
  });

  const config: Configuration = buildWebpack({
    globalEnv,
    port: globalEnv.PORT ?? 3000,
    mode,
    isDev,
    isProd,
    paths,
    analyzer: scriptEnv.analyzer,
  });

  return config;
};

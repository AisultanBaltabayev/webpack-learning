import path from "path";
import { Configuration } from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import {
  BuildMode,
  BuildPaths,
  ScriptEnvVariables,
} from "./config/build/types";
import { buildGlobalEnv } from "./config/build/BuildEnv";

export const BuildEnums: Record<BuildMode, BuildMode> = {
  development: "development",
  production: "production",
};

export default (scriptEnv: ScriptEnvVariables) => {
  const mode = scriptEnv.mode ?? BuildEnums.development;

  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    env: path.join(__dirname, `.env.${mode}`),
    src: path.resolve(__dirname, "src"),
  };

  const globalEnv = buildGlobalEnv(paths.env);
  const isDev = mode === BuildEnums.development;
  const isProd = mode === BuildEnums.production;

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

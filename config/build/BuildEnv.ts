import { BuildPaths, GlobalEnvKeys, GlobalEnvVariables } from "./types";

// для получения внешних .env
export function buildGlobalEnv(envPath: BuildPaths["env"]): GlobalEnvVariables {
  const dotenv = require("dotenv").config({
    path: envPath,
  });

  const globalEnv = dotenv.parsed;

  return globalEnv;
}

// нужны чтобы зарегать env ключи и значения в process.env
export function buildGlobalEnvKeys(
  globalEnv: GlobalEnvVariables,
): GlobalEnvKeys {
  const globalEnvKeys = Object.keys(globalEnv).reduce(
    (prev: GlobalEnvKeys, next: keyof GlobalEnvVariables) => {
      prev[`process.env.${next}`] = JSON.stringify(globalEnv[next]);
      return prev;
    },
    {},
  );

  return globalEnvKeys;
}

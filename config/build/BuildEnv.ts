import {
  BuildPaths,
  ExternalEnvVariables,
  GlobalEnvKeys,
  GlobalEnvVariables,
} from './types';

// для получения переменных .env
export function buildGlobalEnv(
  envPath: BuildPaths['env'],
  addExternalEnvVariables: ExternalEnvVariables = {},
): GlobalEnvVariables {
  const dotenv = require('dotenv').config({
    path: envPath,
  });

  const filteredScriptEnvs = removeEmptyParams(addExternalEnvVariables);

  const globalEnv = { ...dotenv.parsed, ...filteredScriptEnvs };

  return globalEnv;
}

// нужны чтобы зарегать env ключи и значения как глобальные переменные
export function buildGlobalEnvKeys(
  globalEnv: GlobalEnvVariables,
): GlobalEnvKeys {
  const globalEnvKeys = Object.keys(globalEnv).reduce(
    (prev: GlobalEnvKeys, next: keyof GlobalEnvVariables) => {
      prev[`__${next}__`] = JSON.stringify(globalEnv[next]);
      return prev;
    },
    {},
  );

  return globalEnvKeys;
}

function removeEmptyParams(params: Record<string, any>): Record<string, any> {
  if (typeof params !== 'object' || params === null) {
    // return params;
    return {};
  }

  return Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => {
        if (value === null || value === undefined) {
          return false;
        }
        if (typeof value === 'string' || Array.isArray(value)) {
          return value.length > 0;
        }
        if (typeof value === 'object') {
          return Object.keys(value).length > 0;
        }
        return true;
      })
      .map(([key, value]) => [
        key,
        // typeof value === 'object' ? removeEmptyParams(value) : value,
        value,
      ]),
  );
}

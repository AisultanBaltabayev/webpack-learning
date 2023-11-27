import webpack from "webpack";
import path from "path";
import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths, isDev } = options;

  return {
    // мод для сборки 'production' || 'development'
    mode: mode,
    // путь где лежит файлик входа
    entry: paths.entry,
    output: {
      // путь где будет лежать сборка
      path: paths.output,
      // наименования файлика сборки.
      // name default = 'main'.
      // contenthash = хэш сгенерированный от содержимого файлика.
      // Меняет хэш если меняется содержимое
      filename: "[name].[contenthash].js",
      // очистка кешированных файликов
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(),
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}

import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";

type Mode = "production" | "development";

interface GlobalEnvVariables {
  MODE: Mode;
  PORT: number;
}

export default (scriptEnv: { mode: Mode }) => {
  console.log("scriptEnv.mode: ", scriptEnv.mode);
  const mode = scriptEnv.mode;
  const { globalEnv, globalEnvKeys } = getGlobalEnv(mode);
  const isDev = mode === "development";

  const devServer: DevServerConfiguration = {
    port: globalEnv.PORT ?? 3000,
    open: true,
  };

  const config: Configuration = {
    // мод для сборки 'production' || 'development'
    mode: mode,
    // путь где лежит файлик входа
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
      // путь где будет лежать сборка
      path: path.resolve(__dirname, "build"),
      // наименования файлика сборки.
      // name default = 'main'.
      // contenthash = хэш сгенерированный от содержимого файлика.
      // Меняет хэш если меняется содержимое
      filename: "[name].[contenthash].js",
      // очистка кешированных файликов
      clean: true,
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   "process.env": globalEnv,
      // }),
      new webpack.DefinePlugin(globalEnvKeys),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      // медленный плагин для проды
      isDev && new webpack.ProgressPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev ? devServer : undefined,
  };

  return config;
};

type GlobalEnvKeys = Record<string, any>;
function getGlobalEnv(mode: Mode): {
  globalEnv: GlobalEnvVariables;
  globalEnvKeys: GlobalEnvKeys;
} {
  const dotenv = require("dotenv").config({
    path: path.join(__dirname, `.env.${mode}`),
  });

  const globalEnv = dotenv.parsed;

  const globalEnvKeys = Object.keys(globalEnv).reduce(
    (prev: GlobalEnvKeys, next: string) => {
      prev[`process.env.${next}`] = JSON.stringify(globalEnv[next]);
      return prev;
    },
    {},
  );

  return { globalEnv, globalEnvKeys };
}

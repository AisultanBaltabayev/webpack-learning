import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types";
import { buildGlobalEnvKeys } from "./BuildEnv";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const globalEnvKeys = buildGlobalEnvKeys(options.globalEnv);

  const plugins: Configuration["plugins"] = [
    // new webpack.DefinePlugin({
    //   "process.env": globalEnv,
    // }),
    new webpack.DefinePlugin(globalEnvKeys),
    new HtmlWebpackPlugin({
      template: options.paths.html,
    }),
  ];

  if (options.isDev) {
    plugins.push(new webpack.ProgressPlugin());
  }

  if (options.isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }),
    );
  }

  return plugins;
}

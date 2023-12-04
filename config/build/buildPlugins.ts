import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types';
import { buildGlobalEnvKeys } from './BuildEnv';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const globalEnvKeys = buildGlobalEnvKeys(options.globalEnv);

  const plugins: Configuration['plugins'] = [
    // new webpack.DefinePlugin({
    //   "process.env": globalEnv,
    // }),

    new webpack.DefinePlugin(globalEnvKeys),

    new HtmlWebpackPlugin({
      template: options.paths.html,
      // Добавляет favicon на страницу
      favicon: path.resolve(options.paths.public, 'favicon.ico'),
    }),
  ];

  if (options.isDev) {
    plugins.push(new webpack.ProgressPlugin());

    plugins.push(
      // выносит проверку типов в отдельный процесс, не нагружая сборку
      new ForkTsCheckerWebpackPlugin(),
    );

    plugins.push(
      // Плагин для работы hot-module-replacement-а с фреймворками
      new ReactRefreshWebpackPlugin(),
    );
  }

  if (options.isProd) {
    plugins.push(
      // Плагин для извлечения CSS в отдельные файлы для быстрой обработки их браузером
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );

    plugins.push(
      // Плагин для копирования статики в папку бандла
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(options.paths.public, 'locales'),
            to: path.resolve(options.paths.output, 'locales'),
          },
        ],
      }),
    );
  }

  if (options.analyzer) {
    // Плагин для того, чтобы увидеть размер бандла
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}

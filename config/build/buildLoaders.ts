import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types';
import ReactRefreshTypeScript from 'react-refresh-typescript';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const { isDev } = options;

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  // преобразует SVG в React компоненты
  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  const tsLoader = {
    // ts-loader по дефолту умеет работать с JSX
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          // Нужно, чтобы отключить/включить проверку типов, самим ts-loader-ом.
          // Значительно ускоряет компиляцию typescript-а.
          // Вместо него будем использовать на деве(обсудить) fork-ts-checker-webpack-plugin,
          // чтобы распараллелить и чекать типы отдельным процессом
          // transpileOnly: isDev,
          transpileOnly: true,
          // Опция для работы hot-module-replacement-а с фреймворками
          // (ts-loader не работает с hmr, если transpileOnly: true. Для этого и используем fork-ts-checker-webpack-plugin)
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
    exclude: /node_modules/,
  };

  return [assetLoader, svgrLoader, scssLoader, tsLoader];
}

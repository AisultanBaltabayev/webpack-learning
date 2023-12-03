import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
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
        localIdentName: options.isDev
          ? '[path][name]__[local]'
          : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
          // transpileOnly: options.isDev,
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  };

  return [assetLoader, svgrLoader, scssLoader, tsLoader];
}

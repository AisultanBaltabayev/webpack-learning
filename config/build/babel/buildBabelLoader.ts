import { BuildOptions } from '../types';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';

export function buildBabelLoader(options: BuildOptions) {
  const plugins = [];

  if (options.isProd) {
    plugins.push([
      // самописный плагин для удаление data-test-id с продакшн сборки
      removeDataTestIdBabelPlugin,
      { props: ['data-test-id', 'data-testid'] },
    ]);
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      // если нужен отдельный общий конфиг например для jest итд,
      // то нужно создавать в корне babel.config.json файлик
      options: {
        presets: [
          '@babel/preset-env',
          [
            '@babel/preset-react',
            {
              runtime: options.isDev ? 'automatic' : 'classic',
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: plugins.length > 0 ? plugins : undefined,
      },
    },
  };
}

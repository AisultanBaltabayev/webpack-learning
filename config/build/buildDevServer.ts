import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types';

/*
   hot-module-replacement(hmr) - нужен чтобы страница не перезагружалась при изменении кода.
   Это быстрее и также сохраняет состояния в формах, модалках итд.
*/

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    // Работает только для дев сервера. Если раздавать статику через nginx,
    // то надо делать проксирование на index.html
    historyApiFallback: true,
    // Нужен для hmr, однако не работает полноценно с фреймворками и реактом.
    // Для этого подключаем плагины и настройку в ts-loader
    hot: true,
  };
}

import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    // Работает только для дев сервера. Если раздавать статику через nginx,
    // то надо делать проксирование на index.html
    historyApiFallback: true,
  };
}

import type { Configuration } from "webpack";
export function buildResolvers(): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
  };
}

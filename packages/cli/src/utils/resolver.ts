import { logger } from "./logger";
import path from "path";

export async function resolveImport(
  alias: string,
  tsConfig: any,
): Promise<string> {
  const baseUrl = tsConfig.absoluteBaseUrl;
  const paths = tsConfig.paths;

  if (baseUrl && paths) {
    for (const key of Object.keys(paths)) {
      if (key === alias) {
        return path.resolve(baseUrl, paths[key][0].replace("/*", ""));
      }
    }
  }

  logger.warn(`Alias "${alias}" not found in tsconfig paths.`);
  return alias;
}

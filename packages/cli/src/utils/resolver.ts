import { log } from "@clack/prompts";
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

  log.warn(`Alias "${alias}" not found in tsconfig paths.`);
  return alias;
}

import { resolveImport } from "./resolver";
import { cosmiconfig } from "cosmiconfig";
import { handleError } from "./error";
import { logger } from "./logger";
import path from "path";
import { z } from "zod";
import fs from "fs";

const explorer = cosmiconfig("rehooks", {
  searchPlaces: ["rehooks.json"],
});

export const rehooksSchema = z.object({
  directory: z.string(),
  ts: z.boolean(),
});

export type RehooksConfig = z.infer<typeof rehooksSchema>;

export async function getConfig(cwd: string): Promise<RehooksConfig | null> {
  const config = await getRawConfig(cwd);

  if (!config) {
    logger.warn("Configuration not found.");
    return null;
  }

  return validateConfig(config);
}

export async function getRawConfig(cwd: string): Promise<unknown | null> {
  try {
    const configResult = await explorer.search(cwd);

    if (!configResult) {
      return null;
    }

    return configResult.config;
  } catch (error) {
    const errMsg = `Error loading configuration from ${cwd}/rehooks.json: ${error}`;
    logger.error(errMsg);
    throw handleError(errMsg);
  }
}

export function validateConfig(config: unknown): RehooksConfig {
  return rehooksSchema.parse(config);
}

export async function resolveConfigPaths(cwd: string, config: RehooksConfig) {
  const tsConfig = await getTsConfig(cwd);

  if (!tsConfig) {
    logger.warn("TypeScript configuration not found.");
    return config;
  }

  return {
    ...config,
    resolvedPaths: {
      utils: await resolveImport(config.directory, tsConfig),
    },
  };
}

async function getTsConfig(cwd: string): Promise<any | null> {
  const tsConfigPath = path.resolve(cwd, "tsconfig.json");

  try {
    const tsConfigContent = await fs.promises.readFile(tsConfigPath, "utf-8");
    return JSON.parse(tsConfigContent);
  } catch (error) {
    logger.error(`Error reading tsconfig.json: ${error}`);
    return null;
  }
}

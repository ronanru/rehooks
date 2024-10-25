import { getConfig } from "~/utils/config";
import { logger } from "~/utils/logger";
import { Command } from "commander";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";

export const init = new Command()
  .name("init")
  .description("Generate the rehooks configuration file")
  .action(async () => {
    const configPath = path.resolve(process.cwd(), "rehooks.json");

    if (fs.existsSync(configPath)) {
      logger.warn("rehooks.json already exists.");
      return;
    }

    const { srcFolderChoice } = await inquirer.prompt([
      {
        type: "list",
        name: "srcFolderChoice",
        message: "Does your project have a 'src' folder?",
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      },
    ]);

    const { languageChoice } = await inquirer.prompt([
      {
        type: "list",
        name: "languageChoice",
        message: "Is your project created using TypeScript or JavaScript?",
        choices: [
          { name: "TypeScript", value: "ts" },
          { name: "JavaScript", value: "js" },
        ],
      },
    ]);

    const directory = srcFolderChoice ? "./src/hooks" : "./hooks";
    const isTypeScript = languageChoice === "ts";

    const defaultConfig = {
      directory,
      ts: isTypeScript,
    };

    try {
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
      logger.info(`Rehooks configuration file created at ${configPath}.`);
    } catch (error) {
      logger.error(`Error creating rehooks.json: ${error}`);
    }

    const config = await getConfig(process.cwd());
    if (config) {
      logger.info("Configuration loaded successfully.");
    } else {
      logger.warn("Configuration loaded, but may be incomplete.");
    }
  });

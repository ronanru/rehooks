import { getConfig } from "~/utils/config";
import { logger } from "~/utils/logger";
import { Command } from "commander";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";

export const init = new Command()
  .name("init")
  .description("Initialize the Rehooks configuration")
  .action(async () => {
    const configPath = path.resolve(process.cwd(), "rehooks.json");

    let hooksDirExists = false;
    let currentDirectory: string | undefined;

    if (fs.existsSync(configPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: "rehooks.json already exists. Do you want to overwrite it?",
          default: false,
        },
      ]);

      if (!overwrite) {
        logger.warn("Initialization aborted.");
        return;
      }

      const currentConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      currentDirectory = currentConfig.directory;

      if (currentDirectory && fs.existsSync(currentDirectory)) {
        hooksDirExists = true;
        fs.rmSync(currentDirectory, { recursive: true, force: true });
        logger.info(
          `Previous hooks directory at ${currentDirectory} has been removed.`,
        );
      }
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

    const directory = srcFolderChoice ? "./src/hooks" : "./hooks";

    const defaultConfig = {
      directory,
    };

    try {
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
      logger.info(`Rehooks configuration file created at ${configPath}.`);

      if (
        !hooksDirExists ||
        (hooksDirExists &&
          srcFolderChoice !==
            (currentDirectory && currentDirectory.includes("src")))
      ) {
        fs.mkdirSync(directory, { recursive: true });
        logger.info(`Hooks directory created at ${directory}.`);
      }
    } catch (error) {
      logger.error(`Error creating rehooks.json or hooks directory: ${error}`);
    }

    const config = await getConfig(process.cwd());
    if (config) {
      logger.info("Configuration loaded successfully.");
    } else {
      logger.warn("Configuration loaded, but may be incomplete.");
    }
  });

import { getConfig } from "~/utils/config";
import { logger } from "~/utils/logger";
import { Command } from "commander";
import inquirer from "inquirer";
import path from "path";
import ora from "ora";
import fs from "fs";

export const init = new Command()
  .name("init")
  .description("Initialize the Rehooks configuration")
  .action(async () => {
    const configPath = path.resolve(process.cwd(), "rehooks.json");

    const spinner = ora("Initializing Rehooks configuration...").start();
    let hooksDirExists = false;
    let currentDirectory: string | undefined;

    if (fs.existsSync(configPath)) {
      spinner.info("rehooks.json already exists.");
      spinner.stop();

      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: "rehooks.json already exists. Do you want to overwrite it?",
          default: false,
        },
      ]);

      spinner.start();

      if (!overwrite) {
        spinner.fail("Initialization aborted.");
        logger.warn("Initialization aborted.");
        return;
      }

      const currentConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      currentDirectory = currentConfig.directory;

      if (currentDirectory && fs.existsSync(currentDirectory)) {
        hooksDirExists = true;
        fs.rmSync(currentDirectory, { recursive: true, force: true });
        spinner.succeed(
          `Previous hooks directory at ${currentDirectory} has been removed.`,
        );
      }
    }

    spinner.stop();
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

    spinner.start("Creating rehooks.json configuration file...");
    const directory = srcFolderChoice ? "./src/hooks" : "./hooks";
    const defaultConfig = { directory };

    try {
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
      spinner.succeed(`Rehooks configuration file created at ${configPath}.`);

      if (
        !hooksDirExists ||
        (hooksDirExists &&
          srcFolderChoice !==
            (currentDirectory && currentDirectory.includes("src")))
      ) {
        spinner.start("Creating hooks directory...");
        fs.mkdirSync(directory, { recursive: true });
        spinner.succeed(`Hooks directory created at ${directory}.`);
      }
    } catch (error) {
      spinner.fail("Error creating rehooks.json or hooks directory.");
      logger.error(`Error creating rehooks.json or hooks directory: ${error}`);
      return;
    }

    try {
      spinner.start("Loading configuration...");
      const config = await getConfig(process.cwd());
      spinner.succeed("Configuration loaded successfully.");

      if (config) {
        return;
      } else {
        logger.warn("Configuration loaded, but may be incomplete.");
      }
    } catch (error) {
      spinner.fail("Failed to load configuration.");
      logger.error("Failed to load configuration.");
    }
  });

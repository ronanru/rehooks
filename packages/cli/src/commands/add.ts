import { green, red, cyan, bold } from "colorette";
import { getConfig } from "~/utils/config";
import { logger } from "~/utils/logger";
import { Command } from "commander";
import inquirer from "inquirer";
import axios from "axios";
import path from "path";
import ora from "ora";
import fs from "fs";

export const add = new Command()
  .name("add")
  .description("Add hooks to your project")
  .argument("[hook]", "Specify a hook name to add")
  .option("-f, --force", "Force overwrite existing hook files without prompt")
  .action(async (hook, options) => {
    const config = await getConfig(process.cwd());

    if (!config) {
      logger.error(red("rehooks.json not found or invalid configuration."));
      return;
    }

    const { directory, forceOverwrite } = config;
    const shouldForceOverwrite = options.force || forceOverwrite;

    try {
      if (hook) {
        const hookFilePath = path.join(directory, `${hook}.ts`);
        if (fs.existsSync(hookFilePath) && !shouldForceOverwrite) {
          const { overwrite } = await inquirer.prompt([
            {
              type: "confirm",
              name: "overwrite",
              message: bold(
                red(`${hook}.ts already exists. Do you want to overwrite it?`),
              ),
              default: false,
            },
          ]);

          if (!overwrite) {
            logger.info(cyan(`Skipping ${hook}.ts.`));
            return;
          }
        }

        const spinner = ora();

        const selectedHookResponse = await axios.get(
          `https://rehooks.pyr33x.ir/api/hooks/${hook}`,
        );
        let { content } = selectedHookResponse.data;
        fs.writeFileSync(hookFilePath, content);
        spinner.succeed(
          green(`Created ${bold(hook)} hook at ${bold(hookFilePath)}.`),
        );
        return;
      }

      const fetchSpinner = ora(cyan("Fetching hooks...")).start();
      const response = await axios.get("https://rehooks.pyr33x.ir/api/hooks");
      const hooks = response.data;
      fetchSpinner.succeed(green("Done."));

      const { selectedHooks } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "selectedHooks",
          message: bold("Pick hooks to add:"),
          choices: hooks.map((h: { title: string }) => h.title),
          required: true,
          theme: {
            icon: {
              checked: green("✔"),
              cursor: "",
            },
          },
        },
      ]);

      const spinner = ora(cyan("Checking configuration...")).start();
      spinner.succeed(green("Checked configuration."));

      spinner.succeed(
        green(
          `Created ${bold(selectedHooks.length.toString())} ${selectedHooks.length > 1 ? "files" : "file"}.`,
        ),
      );

      for (const hook of selectedHooks) {
        const hookFilePath = path.join(directory, `${hook}.ts`);

        if (fs.existsSync(hookFilePath) && !shouldForceOverwrite) {
          const { overwrite } = await inquirer.prompt([
            {
              type: "confirm",
              name: "overwrite",
              message: bold(
                red(`${hook}.ts already exists. Do you want to overwrite it?`),
              ),
              default: false,
            },
          ]);

          if (!overwrite) {
            logger.info(cyan(`Skipping ${hook}.ts.`));
            continue;
          }
        }

        const selectedHookResponse = await axios.get(
          `https://rehooks.pyr33x.ir/api/hooks/${hook}`,
        );
        let { content } = selectedHookResponse.data;
        fs.writeFileSync(hookFilePath, content);
        logger.info(green(` - ${hookFilePath}.`));
      }
    } catch (error) {
      logger.error(red(`Error adding hooks: ${error}`));
    }
  });

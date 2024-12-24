import {
  confirm,
  intro,
  log,
  multiselect,
  spinner,
  outro,
} from "@clack/prompts";
import { API_ENDPOINT } from "~/utils/constants";
import { cyan, green, red } from "colorette";
import { getConfig } from "~/utils/config";
import type { Hook } from "~/types/hook";
import { Command } from "commander";
import axios from "axios";
import path from "path";
import fs from "fs";

export const add = new Command()
  .name("add")
  .description("Add hooks to your project")
  .argument("[hooks...]", "Specify one or more hook names to add")
  .option("-f, --force", "Force overwrite existing hook files without prompt")
  .action(async (hooks, options) => {
    intro("Adding hooks...");

    const config = await getConfig(process.cwd());

    if (!config) {
      outro(red("Rehooks configuration not found or invalid."));
      return;
    }

    const { directory, forceOverwrite } = config;
    const shouldForceOverwrite = options.force || forceOverwrite;

    const addedHooks: string[] = [];
    try {
      if (hooks.length > 0) {
        for (const hook of hooks) {
          const hookFilePath = path.join(directory, `${hook}.ts`);

          if (fs.existsSync(hookFilePath) && !shouldForceOverwrite) {
            const overwrite = await confirm({
              message: `${hook}.ts already exists. Do you want to overwrite it?`,
              initialValue: false,
            });

            if (!overwrite) {
              log.info(`Skipping ${cyan(hook)}.`);
              continue;
            }
          }

          const selectedHookResponse = await axios.get<Hook>(
            `${API_ENDPOINT}/${hook}`,
          );

          let { content } = selectedHookResponse.data;
          fs.writeFileSync(hookFilePath, content);
          addedHooks.push(hook);
          // log.info(cyan(`Successfully added ${green(hook)}.`));
        }

        outro(
          green(
            `Successfully added ${cyan(addedHooks.map((h) => h.toString()).join(", "))}.`,
          ),
        );

        return;
      }

      const fetchSpinner = spinner();
      fetchSpinner.start("Fetching hooks...");
      const res = await axios.get<Hook[]>(API_ENDPOINT);
      const hooksData = res.data;
      fetchSpinner.stop("Done.");

      const selectedHooks = await multiselect({
        message: "Pick hooks to add:",
        options: hooksData.map((h: { title: string }) => ({
          value: h.title,
          label: h.title,
        })),
        required: true,
      });

      const selectedHookArray = selectedHooks as string[];

      log.success(
        `Selected ${selectedHookArray.length.toString()} ${selectedHookArray.length > 1 ? "files" : "file"}.`,
      );

      log.info(`Hooks Directory: ${directory}`);

      for (const hook of selectedHookArray) {
        const hookFilePath = path.join(directory, `${hook}.ts`);

        if (fs.existsSync(hookFilePath) && !shouldForceOverwrite) {
          const overwrite = await confirm({
            message: `${hook}.ts already exists. Do you want to overwrite it?`,
            initialValue: false,
          });

          if (!overwrite) {
            log.info(`Skipping ${cyan(hook)}.`);
            continue;
          }
        }

        const selectedHookResponse = await axios.get(`${API_ENDPOINT}/${hook}`);
        let { content } = selectedHookResponse.data;
        fs.writeFileSync(hookFilePath, content);

        addedHooks.push(hook);
      }

      if (addedHooks.length > 0) {
        outro(
          green(
            `Successfully added ${cyan(addedHooks.map((h) => h.toString()).join(", "))}.`,
          ),
        );
      } else {
        outro(red("No hooks were added."));
      }
    } catch (error) {
      log.error(`Error adding hooks: ${error}`);
    }
  });

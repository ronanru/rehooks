import { handleError } from "~/utils/error";
import { Command } from "commander";
import type { Hook } from "~/types";
import inquirer from "inquirer";
import ora from "ora";
import fs from "fs";

const fetchHooks = async (): Promise<any> => {
  const BASE_URL = `https://rehooks.pyr33x.ir/api/hooks`;

  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hooks");
  }

  return response.json();
};

export const hooks = new Command()
  .name("hooks")
  .description("Import hooks to your component file.")
  .argument("<file>", "Path to the component file to insert imports")
  .action(async (filePath) => {
    const spinner = ora("Fetching hooks...").start();

    try {
      const hooksData = await fetchHooks();
      spinner.stop();

      if (hooksData.length > 0) {
        const choices = hooksData.map((hook: Hook) => ({
          name: `${hook.title}`,
          value: hook.import,
        }));

        const { selectedImports } = await inquirer.prompt([
          {
            type: "checkbox",
            name: "selectedImports",
            message: "Select hooks to import:",
            choices,
          },
        ]);

        if (selectedImports.length > 0) {
          const importNames = selectedImports.map((importStatement: string) => {
            return importStatement.match(/{\s*(.+?)\s*}/)?.[1]?.trim();
          });

          const uniqueImportNames = Array.from(new Set(importNames)).join(", ");
          const finalImportStatement = `import { ${uniqueImportNames} } from 'rehooks-ts';\n`;

          const fileContent = fs.readFileSync(filePath, "utf-8");
          const updatedContent = `${finalImportStatement}${fileContent}`;
          fs.writeFileSync(filePath, updatedContent);

          console.log(`Imported hooks added to the file: ${filePath}`);
        } else {
          console.log("No hooks selected.");
        }
      } else {
        console.log("No hooks found.");
      }
    } catch (error) {
      spinner.fail("Error fetching hooks: " + handleError(error));
    }
  });

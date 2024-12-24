#!/usr/bin/env node

import { getPackageInfo } from "~/utils/package";
import { init } from "~/commands/init";
import { add } from "~/commands/add";
import { Command } from "commander";

async function main() {
  const packageInfo = await getPackageInfo();
  const program = new Command()
    .name("rehooks")
    .description("A CLI to insert hooks directly to your project.")
    .version(
      packageInfo.version || "4.2.0",
      "-v, --version",
      "Displays the version number",
    );
  program.addCommand(init);
  program.addCommand(add);
  program.parse();
}

main();

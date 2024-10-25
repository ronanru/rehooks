#!/usr/bin/env node

import { getPackageInfo } from "~/utils/package";
import { init } from "~/commands/init";
import { add } from "~/commands/add";
import { Command } from "commander";

async function main() {
  const packageInfo = await getPackageInfo();
  const program = new Command()
    .name("rehooks")
    .description("The CLI to import hooks directly to your codebase.")
    .version(
      packageInfo.version || "3.2.1",
      "-v, --version",
      "display the version number",
    );
  program.addCommand(init);
  program.addCommand(add);
  program.parse();
}

main();

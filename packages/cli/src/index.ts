#!/usr/bin/env node

import { getPackageInfo } from "~/utils/package";
import { init } from "~/commands/init";
import { Command } from "commander";

async function main() {
  const packageInfo = await getPackageInfo();
  const program = new Command()
    .name("rehooks")
    .description("A CLI to copy the import state of hooks.")
    .version(
      packageInfo.version || "1.0.1",
      "-v, --version",
      "display the version number",
    );
  program.addCommand(init);
  program.parse();
}

main();

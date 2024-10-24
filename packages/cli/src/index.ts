#!/usr/bin/env node

import { hooks } from "~/commands/hooks";
import { Command } from "commander";

function main() {
  const program = new Command()
    .name("rehooks")
    .description("A CLI for Rehooks.")
    .version("0.0.2", "-v, --version", "display the current version");
  program.addCommand(hooks);
  program.parse();
}

main();

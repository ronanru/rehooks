import { createPreset } from "fumadocs-ui/tailwind-plugin";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.{ts,tsx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [createPreset()],
  plugins: [require("tailwindcss-animate")],
};

export default config;

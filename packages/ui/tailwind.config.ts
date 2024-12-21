import { createPreset } from "fumadocs-ui/tailwind-plugin";
import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const confg: Pick<Config, "presets" | "plugins" | "content" | "theme"> = {
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.{ts,tsx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      animation: {
        beam: "beam calc(var(--duration)*1s) infinite linear",
        "background-shine": "background-shine 1.5s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        shine: "shine var(--duration) infinite linear",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 5s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "background-shine": {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        gradient: {
          to: { "background-position": "200% center" },
        },
        shine: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
        beam: {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },
  presets: [createPreset()],
  plugins: [tailwindcssAnimate],
};

export default confg;

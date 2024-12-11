import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { docs, meta } from "@/.source";
import { createElement } from "react";
import { icons } from "lucide-react";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
  icon(icon) {
    if (!icon) {
      return;
    }
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

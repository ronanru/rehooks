import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/app/layout.config";
import type { ReactNode } from "react";
import { source } from "@/app/source";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}

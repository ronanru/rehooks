import { DotPattern } from "@/components/internal/dot";
import { HomeLayout } from "fumadocs-ui/home-layout";
import { baseOptions } from "../layout.config";
import type { ReactNode } from "react";
import { cn } from "utils";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
    </HomeLayout>
  );
}

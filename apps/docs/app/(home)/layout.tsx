import { HomeLayout } from "fumadocs-ui/home-layout";
import { DotPattern } from "@/components/internal";
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
        width={15}
        height={15}
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

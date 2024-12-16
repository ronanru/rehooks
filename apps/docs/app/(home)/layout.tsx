import { HomeLayout } from "fumadocs-ui/home-layout";
import { DotPattern } from "@rehooks/ui/components";
import { baseOptions } from "@/app/layout.config";
import type { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.ReactElement {
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <DotPattern
        width={15}
        height={15}
        cx={1}
        cy={1}
        cr={1}
        className="p-2 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />
    </HomeLayout>
  );
}

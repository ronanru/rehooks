import { HomeLayout } from "fumadocs-ui/home-layout";
import { baseOptions } from "@/app/layout.config";
import { Grid } from "@rehooks/ui/components";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.ReactElement {
  return (
    <HomeLayout {...baseOptions}>
      <ThemeProvider
        disableTransitionOnChange
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
      <Grid
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className="-z-50 [mask-image:radial-gradient(350px_circle_at_center,white,#ffffff50)]"
      />
    </HomeLayout>
  );
}

import Footer from "@/app/(home)/_components/footer";
import { HomeLayout } from "fumadocs-ui/home-layout";
import { baseOptions } from "@/app/layout.config";
import { Grid } from "@rehooks/ui/components";
import type { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.ReactElement {
  return (
    <HomeLayout
      nav={{
        component: <p>salam</p>,
      }}
      {...baseOptions}
    >
      {children}
      <Grid
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className="-z-50 [mask-image:radial-gradient(350px_circle_at_center,white,#ffffff50)] dark:[mask-image:radial-gradient(350px_circle_at_center,white,#ffffff01)]"
      />
      <Footer />
    </HomeLayout>
  );
}

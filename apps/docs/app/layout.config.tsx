import { type HomeLayoutProps } from "fumadocs-ui/home-layout";

export const baseOptions: HomeLayoutProps = {
  githubUrl: "https://github.com/Pyr33x/rehooks",
  nav: {
    title: "Rehooks",
  },

  links: [
    {
      text: "Docs",
      url: "/docs",
      active: "nested-url",
    },
  ],
};

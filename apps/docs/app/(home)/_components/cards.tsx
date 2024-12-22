import { Globe, Braces, Layers, Zap } from "@rehooks/ui/icons";
import { Retro, Marquee } from "@rehooks/ui/components";
import { cn, hooks } from "@rehooks/utils";

export const features = [
  {
    Icon: Globe,
    name: "Open-Source Codebase",
    description:
      "Rehooks is an open-source repository, to expand OSS communities.",
    className: "lg:row-start-2 lg:row-end-2 lg:col-start-3 lg:col-end-3",
    background: <div className="absolute -right-20 -top-20 opacity-60" />,
  },
  {
    Icon: Braces,
    name: "TypeScript Support",
    description:
      "Rehooks is written in TypeScript, ensuring type safety and maintainability throughout the codebase.",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
    background: <div className="absolute -right-20 -top-20 opacity-60" />,
  },
  {
    Icon: Layers,
    name: "Variety of Hooks",
    description:
      "Rehooks offers a diverse variety of powerful hooks for different use cases, to efficiently implement functionality in components.",
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    background: (
      <>
        <Marquee
          pauseOnHover
          className="absolute top-10 h-64 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
        >
          {hooks.map((hook, idx) => (
            <figure
              key={idx}
              className={cn(
                "relative w-44 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-neutral-950/[.1] bg-neutral-950/[.01] hover:bg-neutral-950/[.05]",
                "dark:border-neutral-50/[.1] dark:bg-neutral-50/[.10] dark:hover:bg-neutral-50/[.15]",
                "transform-gpu transition-all duration-300 ease-in-out",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white">
                    {hook.title}
                  </figcaption>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">
                {hook.description}
              </blockquote>
            </figure>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white dark:from-neutral-950"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white dark:from-neutral-950"></div>
      </>
    ),
  },
  {
    Icon: Zap,
    name: "Performant & Reusability",
    description:
      "Crafted with SOLID principles, ensuring type-safety and maintainability throughout the codebase.",
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-1",
    background: (
      <Retro
        angle={20}
        cellSize={75}
        darkLineColor="#666666"
        lightLineColor="#000000"
      />
    ),
  },
];

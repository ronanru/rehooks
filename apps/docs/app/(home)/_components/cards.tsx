import { Globe, Braces, Layers, Zap } from "@rehooks/ui/icons";
import { Retro, Marquee } from "@rehooks/ui/components";
import { cn } from "@rehooks/utils";

const hooks = [
  {
    title: "useSessionStorage",
    description:
      "Interact with the browser's session storage. This hook provides a simple and convenient way to store and retrieve data in session storage, with automatic serialization and deserialization of JSON data.",
  },
  {
    title: "useDebounceValue",
    description:
      "Debounces the value of a stateful value. This hook is useful for debouncing user input, such as typing in a search bar or a text field, to prevent rapid updates to the value.",
  },
  {
    title: "useFetch",
    description:
      "Fetches data from an API. This hook provides a simple and convenient way to fetch data from an API, with automatic serialization and deserialization of JSON data.",
  },
  {
    title: "useKeyPress",
    description:
      "Detects key presses in the browser. This hook is useful for detecting key presses, such as pressing the 'Enter' key or the 'Escape' key, and executing a callback function when the key is pressed.",
  },
  {
    title: "useDevice",
    description:
      "Detects device changes in the browser. This hook is useful for detecting device changes, such as switching between mobile and desktop devices, and executing a callback function when the device changes.",
  },
];
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
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                "transform-gpu transition-all duration-300 ease-out",
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
        <div className="from-fd-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r"></div>
        <div className="from-fd-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l"></div>
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
        cellSize={100}
        darkLineColor="#666666"
        lightLineColor="#000000"
      />
    ),
  },
];

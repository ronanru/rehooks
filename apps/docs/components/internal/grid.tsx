import {
  Marquee,
  Notifications,
  BentoCard,
  BentoGrid,
  Beam,
} from "@/components/internal";
import { cn } from "utils";

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

const features = [
  {
    name: "Variety of Hooks",
    description:
      "Rehooks provides a wide range of hooks for various use cases.",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 h-full [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {hooks.map((hook, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-44 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {hook.title}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{hook.description}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    name: "TypeScript",
    description:
      "Written in TypeScript, Rehooks offers comprehensive type safety and autocompletion.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Notifications className="absolute top-4 h-[300px] w-full border-none px-12 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    name: "Performance-Driven",
    description:
      "All hooks are meticulously crafted with SOLID principles, ensuring efficient, optimized, and robust performance.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Beam className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    name: "Open-Source",
    description:
      "Rehooks is open-source under the MIT license, fostering community collaboration and welcoming contributions.",
    className: "col-span-3 lg:col-span-1",
  },
];

export function Grid() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

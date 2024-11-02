import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { File, Folder, Files } from "fumadocs-ui/components/files";
import { Text } from "@/components/internal";
import { cn } from "utils";

interface Card {
  id: number;
  name: string;
  description: React.ReactNode | string;
  link?: string;
  content?: React.ReactNode | string;
  footer?: string;
  class?: string;
}

type Hook<ID extends number, T> = {
  id: ID;
  title: T;
  class?: T;
};

const hooks: Hook<number, string>[] = [
  {
    id: 1,
    title: "useSessionStorage",
  },
  {
    id: 2,
    title: "useDebounceValue",
  },
  {
    id: 3,
    title: "useLocalStorage",
  },
  {
    id: 4,
    title: "useClipboard",
  },
  {
    id: 5,
    title: "useKeyPress",
  },
  {
    id: 6,
    title: "useScroll",
  },
];

const hooksB: Hook<number, string>[] = [
  {
    id: 1,
    title: "useDebounceCallback",
  },
  {
    id: 2,
    title: "useEventListener",
  },
  {
    id: 3,
    title: "useEventCallback",
  },
  {
    id: 4,
    title: "useOnlineStatus",
  },
  {
    id: 5,
    title: "useClipboard",
  },
  {
    id: 6,
    title: "useCountdown",
  },
];

const cards: Card[] = [
  {
    id: 1,
    name: "Performance-Driven",
    description:
      "All hooks are meticulously crafted with SOLID principles, ensuring efficient, optimized, and robust performance.",
    content: (
      <Files className="select-none">
        <Folder name="hooks" defaultOpen>
          <File name="useSessionStorage.ts" />
          <File name="useLocalStorage.ts" />
          <File name="useClipboard.ts" />
          <File name="useKeyPress.ts" />
        </Folder>
        <File name="rehooks.json" />
      </Files>
    ),
    class: "max-w-md",
  },
  {
    id: 2,
    name: "Why Rehooks?",
    description:
      "It provides a set of hooks that can be used to craft performant and type-safe React components.",
    content: (
      <>
        <div className="flex h-full items-center justify-center">
          <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
            {hooks.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "group flex h-10 items-center justify-center rounded-md border border-neutral-400 bg-neutral-200/50 px-20 dark:border-neutral-800 dark:bg-neutral-900/50",
                  item.class,
                )}
              >
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 w-full rounded-full border-t-4 border-t-neutral-300 dark:border-t-neutral-900" />
        <div className="hidden items-center justify-center xl:flex">
          <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
            {hooksB.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "group flex h-10 items-center justify-center rounded-md border border-neutral-400 bg-neutral-200/50 px-20 dark:border-neutral-800 dark:bg-neutral-900/50",
                  item.class,
                )}
              >
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
    class: "max-w-md row-span-2",
  },
  {
    id: 3,
    name: "TypeScript",
    description:
      "Written in TypeScript, Rehooks offers comprehensive type safety and autocompletion, making development seamless and error-resistant.",
    content: (
      <div className="flex h-52 items-center justify-center">
        <Text text="FAST" />
      </div>
    ),
    class: "max-w-md",
  },
  {
    id: 4,
    name: "Package",
    description:
      "Rehooks includes an internal package for easy access to production-ready hooks, streamlining development.",
    class: "max-w-md",
  },
  {
    id: 5,
    name: "Open-Source",
    description:
      "Rehooks is open-source under the MIT license, fostering community collaboration and welcoming contributions.",
    class: "max-w-md",
  },
];

export function Cards() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-3 text-center md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.id} className={card.class}>
          <CardHeader>
            <CardTitle className="text-neutral-800 dark:text-neutral-50">
              {card.name}
            </CardTitle>
            <CardDescription className="text-neutral-800 dark:text-neutral-50/70">
              {card.description}
            </CardDescription>
          </CardHeader>
          {card.content && <CardContent>{card.content}</CardContent>}
        </Card>
      ))}
    </div>
  );
}

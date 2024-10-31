import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { File, Folder, Files } from "fumadocs-ui/components/files";

interface Card {
  id: number;
  name: string;
  description: React.ReactNode | string;
  link?: string;
  content?: React.ReactNode | string;
  footer?: string;
  class?: string;
}

const cards: Card[] = [
  {
    id: 1,
    name: "Why Rehooks?",
    description:
      "It provides a set of hooks that can be used to build performant and type-safe React applications.",
    class: "max-w-md",
  },
  {
    id: 2,
    name: "Reusability & Performance",
    description:
      "All hooks are written in SOLID principles and are optimized for performance.",
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
    class: "max-w-md row-span-3",
  },
  {
    id: 3,
    name: "Open-Source",
    description:
      "The decision of open-sourcing the library was helping community to grow, repo is licensed under MIT license and PRs are welcomed.",
    class: "max-w-md",
  },
  {
    id: 4,
    name: "Package",
    description:
      "Rehooks also comes with a an internal package that can be used to import production-ready hooks.",
    class: "max-w-md",
  },
];

export function Cards() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-3 text-center md:grid-cols-2">
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

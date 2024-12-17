import {
  Card,
  CardHeader,
  CardLabel,
  CardTitle,
  CardContent,
  CodeBlock,
} from "@rehooks/ui/components";

export function Features() {
  return (
    <>
      <h2 className="text-muted-foreground/50 select-none text-xl font-medium">
        FEATURES
      </h2>
      <h3 className="text-foreground mt-1.5 max-w-lg text-wrap text-center text-xl">
        Rehooks is created to streamline the process of creating custom hooks,
        and to make it faster to ship.
      </h3>
      <Cards />
    </>
  );
}

const cards = [
  {
    label: "Rehooks",
    title: "TypeScript",
    description:
      "Written in TypeScript, Rehooks offers comprehensive type safety and autocompletion.",
  },
  {
    label: "Rehooks",
    title: "Performant",
    description:
      "All hooks are meticulously crafted with SOLID principles, ensuring efficient, optimized, and robust performance.",
  },
  {
    label: "Rehooks",
    title: "Performant",
    description:
      "Rehooks is designed to be performant, with optimized code and minimal overhead.",
  },
  {
    label: "Rehooks",
    title: "Open Source",
    code: `const rehooks = {
  openSource: true,
  license: "MIT"
  // Expanding OSS Community
}`,
  },
];

function Cards() {
  return (
    <div className="mt-8 grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-4">
      {cards.map(
        ({
          label,
          title,
          description,
          code,
        }: {
          label: string;
          title: string;
          description?: string;
          code?: string;
        }) => (
          <Card key={title} className="max-w-md">
            <CardHeader>
              <CardLabel>{label}</CardLabel>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              {code && <CodeBlock>{code}</CodeBlock>}
              {description && <p>{description}</p>}
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
}

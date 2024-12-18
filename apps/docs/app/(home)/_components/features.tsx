"use client";

import {
  Card,
  CardHeader,
  CardLabel,
  CardTitle,
  CardContent,
  CodeBlock,
} from "@rehooks/ui/components";
import { cards, cn, type Card as CardType } from "@rehooks/utils";

export function Features() {
  return (
    <>
      <h2 className="text-muted-foreground/50 select-none text-xl font-medium uppercase">
        Features
      </h2>
      <h3 className="text-foreground my-1 text-wrap text-center text-3xl font-semibold">
        Crafted for Efficiency
      </h3>
      <h4 className="text-muted-foreground mt-1.5 max-w-lg text-wrap text-center text-xl italic">
        I've created Rehooks to streamline the process of creating custom hooks,
        and get rid of heavy packages.
      </h4>
      <Cards />
    </>
  );
}

function Cards() {
  return (
    <div className="mt-8 grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-4">
      {cards.map(({ title, label, content, code, className }: CardType) => (
        <Card key={title} className={cn("max-w-md", className)}>
          <CardHeader>
            <CardLabel>{label}</CardLabel>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            {code && <CodeBlock>{code}</CodeBlock>}
            {content && <p>{content}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

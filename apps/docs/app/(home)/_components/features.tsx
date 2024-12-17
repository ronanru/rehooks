import {
  Card,
  CardHeader,
  CardLabel,
  CardTitle,
  CardContent,
  CodeBlock,
} from "@rehooks/ui/components";
import { cards, type Card as CardType } from "@rehooks/utils";

export function Features() {
  return (
    <>
      <h2 className="text-muted-foreground/50 select-none text-xl font-medium">
        FEATURES
      </h2>
      <h3 className="text-foreground my-1 text-wrap text-center text-3xl font-semibold">
        Crafted for Efficiency and Performance
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
    <div className="mt-8 grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-4">
      {cards.map((card: CardType) => (
        <Card key={card.title} className="max-w-md">
          <CardHeader>
            <CardLabel>{card.label}</CardLabel>
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {card.code && <CodeBlock>{card.code}</CodeBlock>}
            {card.content && <p>{card.content}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

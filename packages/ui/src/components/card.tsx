import React, { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";
import { cn } from "@rehooks/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-card text-card-foreground border-border rounded-lg border-2",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-b-border flex flex-col border-b-2 p-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-muted-foreground select-none text-sm font-normal",
      className,
    )}
    {...props}
  />
));
CardLabel.displayName = "CardLabel";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-foreground select-none text-lg font-bold leading-none",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative text-wrap rounded-md p-4 font-mono text-sm",
      className,
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CodeBlock = ({
  children,
  cls = "#4686FF",
  sign = "#666666",
  string = "#FF4666",
  keyword = "#FF4666",
  identifier = "#000",
  ...props
}: {
  children: string;
  cls?: string;
  sign?: string;
  string?: string;
  keyword?: string;
  identifier?: string;
} & ComponentPropsWithoutRef<"code">) => {
  const codeHTML = highlight(children as string);
  return (
    <pre>
      <code
        style={
          {
            "--sh-class": cls,
            "--sh-sign": sign,
            "--sh-string": string,
            "--sh-keyword": keyword,
            "--sh-identifier": identifier,
          } as React.CSSProperties
        }
        className="font-mono text-sm"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    </pre>
  );
};

export { Card, CardHeader, CardTitle, CardLabel, CardContent, CodeBlock };

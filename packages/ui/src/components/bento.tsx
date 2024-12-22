import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@rehooks/utils";
import { Button } from "./button";

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

type BentoCardProps = {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
};

function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
}: BentoCardProps) {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-neutral-950 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#0a0a0a_inset]",
        className,
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-4">
        <Icon className="size-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-[.8] group-hover:text-violet-600" />
        <h3 className="text-fd-foreground mt-2 text-xl font-semibold">
          {name}
        </h3>
        <p className="text-fd-muted-foreground max-w-lg">{description}</p>
      </div>
    </div>
  );
}

export { BentoCard, BentoGrid };

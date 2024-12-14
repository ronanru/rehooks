import { ReactNode } from "react";
import { cn } from "utils";

function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3", className)}>
      {children}
    </div>
  );
}

function BentoCard({
  name,
  className,
  background,
  description,
}: {
  name: string;
  className: string;
  background?: ReactNode;
  description: string;
}) {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden backdrop-blur-3xl",
        "border-neutral-200 bg-white/10",
        "transform-gpu dark:border-neutral-800 dark:bg-neutral-900/20",
        className,
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col px-4 py-4">
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
        <p className="text-neutral-400">{description}</p>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:opacity-100",
        )}
      ></div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
}

export { BentoCard, BentoGrid };

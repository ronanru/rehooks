"use client";

import { Badge } from "@/components/internal/badge";
import { Button } from "@/components/ui";
import { useClipboard } from "@/hooks";
import Link from "next/link";

export function Hero() {
  const { copy, isCopied } = useClipboard();
  return (
    <>
      <div className="mb-8">
        <Badge
          href="https://npmjs.org/package/rehooks-cli"
          target="_blank"
          rel="noopener noreferrer"
          variant="green"
          shine
          shineColor="#4ade80"
          borderRadius={9999}
        >
          Rehooks v4 is out
        </Badge>
      </div>
      <h1 className="text-balance text-center text-4xl font-black lg:text-5xl">
        Streamline{" "}
        <span className="animate-background-shine inline-flex transform bg-[linear-gradient(110deg,#22c55e,45%,#86efac,55%,#22c55e)] bg-[length:250%_100%] bg-clip-text text-transparent">
          React
        </span>{" "}
        Hooks
      </h1>
      <p className="dark:text-fd-muted-foreground/50 text-fd-muted-foreground mt-2 text-balance text-center text-base font-medium lg:text-xl">
        A CLI to insert hooks directly to your project.
      </p>
      <div className="mt-5 flex flex-row flex-wrap justify-center gap-2">
        <Button
          size="circular"
          onClick={() => copy("npx rehooks-cli@latest init")}
          className="cursor-copy font-mono"
        >
          {isCopied ? "Copied to Clipboard!" : "$ npx rehooks-cli@latest"}
        </Button>
        <Link href="/docs" className="outline-none ring-0">
          <Button size="circular" variant="secondary" className="font-mono">
            Docs
          </Button>
        </Link>
      </div>
    </>
  );
}

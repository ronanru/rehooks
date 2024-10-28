"use client";

import { useClipboard } from "rehooks-ts";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

export function Hero() {
  const { copy, isCopied } = useClipboard();
  return (
    <>
      <div className="mb-8">
        <a
          href="https://npmjs.org/package/rehooks-cli"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="group inline-flex h-9 transform items-center justify-center space-x-0.5 rounded-full border border-neutral-400 bg-neutral-200 px-4 text-center shadow-md transition duration-75 hover:border-neutral-600/70 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700/70 dark:hover:bg-neutral-800/50">
            <span className="text-fd-muted-foreground">Rehooks v3 is out</span>
            <ArrowUpRight className="text-fd-muted-foreground size-5 transform transition group-hover:-translate-y-[2px] group-hover:translate-x-0.5" />
          </div>
        </a>
      </div>
      <h1 className="text-balance text-center text-4xl font-black lg:text-5xl">
        Streamline{" "}
        <span className="animate-background-shine inline-flex transform bg-[linear-gradient(110deg,#0062D1,45%,#9d9ffc,55%,#0062D1)] bg-[length:250%_100%] bg-clip-text text-transparent">
          React
        </span>{" "}
        Hooks
      </h1>
      <p className="dark:text-fd-muted-foreground/50 text-fd-muted-foreground mt-2 text-balance text-center text-base lg:text-xl">
        A CLI to import hooks directly to your codebase.
      </p>
      <div className="mt-5 flex flex-row flex-wrap justify-center gap-2">
        <Button
          variant="hero"
          size="circular"
          onClick={() => copy("npx rehooks-cli@latest")}
          className="font-mono"
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

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
          className="group relative flex h-10 items-center gap-2 rounded-full bg-gradient-to-b from-orange-900/50 to-orange-700 px-6 text-lg font-medium text-orange-300 transition-colors hover:text-orange-200 dark:from-orange-700/50 dark:to-gray-900 dark:text-orange-300 dark:hover:text-orange-200"
        >
          <span className="relative z-10 flex items-center gap-2">
            Rehooks v3 is out{" "}
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 blur transition-opacity group-hover:opacity-20 dark:from-orange-400 dark:to-orange-500" />
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 opacity-30 dark:from-orange-400 dark:to-orange-500 dark:opacity-40" />
        </a>
      </div>
      <h1 className="text-balance text-center text-4xl font-black lg:text-5xl">
        Streamline{" "}
        <span className="animate-background-shine inline-flex transform bg-[linear-gradient(110deg,#ea580c,45%,#fb923c,55%,#ea580c)] bg-[length:250%_100%] bg-clip-text text-transparent">
          React
        </span>{" "}
        Hooks
      </h1>
      <p className="dark:text-fd-muted-foreground/50 text-fd-muted-foreground mt-2 text-balance text-center text-base lg:text-xl">
        A CLI to import hooks directly to your codebase.
      </p>
      <div className="mt-5 flex flex-row flex-wrap justify-center gap-2">
        <Button
          variant="halloween"
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

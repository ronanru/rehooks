"use client";

import { Button } from "@/components/ui";
import { useClipboard } from "@/hooks";
import Link from "next/link";

export function Hero() {
  const { copy, isCopied } = useClipboard();
  return (
    <>
      <div className="mb-8">
        {/* <a
          href="https://npmjs.org/package/rehooks-cli"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-10 items-center gap-2 rounded-full bg-gradient-to-b from-green-900/50 to-green-700 px-6 text-lg font-medium text-green-300 transition-colors hover:text-green-200 dark:from-green-700/50 dark:to-gray-900 dark:text-green-300 dark:hover:text-green-200"
        >
          <span className="relative z-10 flex items-center gap-2">
            Rehooks v3 is out{" "}
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-green-600 opacity-0 blur transition-opacity group-hover:opacity-20 dark:from-green-400 dark:to-green-500" />
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 opacity-30 dark:from-green-400 dark:to-green-500 dark:opacity-40" />
        </a> */}
        <a
          href="https://www.producthunt.com/posts/rehooks?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-rehooks"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=571513&theme=dark"
            alt="Rehooks - Streamline&#0032;Your&#0032;React&#0032;Hooks&#0044;&#0032;One&#0032;Command&#0032;at&#0032;a&#0032;Time | Product Hunt"
            style={{
              width: "250px",
              height: "54px",
            }}
            width="250"
            height="54"
          />
        </a>
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

import { NpmIcon, GithubIcon, RehooksIcon } from "@rehooks/ui/icons";
import { GITHUB_LINK, REHOOKS_NPM } from "@rehooks/utils";
import Link from "next/link";

const TEXT_STYLE =
  "text-fd-muted-foreground hover:text-fd-foreground/90 transition ease-in-out";

export default function Footer() {
  return (
    <footer className="border-t-fd-border border-t py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-16">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <RehooksIcon className="size-6" />
              <span className="text-xl font-semibold">Rehooks</span>
            </div>
            <p className="text-fd-muted-foreground">
              Avoid repetitive hook patterns, a source for making your own
              hooks.
            </p>
          </div>

          {/* <div className="flex justify-start gap-24">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Legal</h3>
              <div className="flex flex-col space-y-2">
                <Link
                  href="#"
                  className={TEXT_STYLE}
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className={TEXT_STYLE}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className={TEXT_STYLE}
                >
                  Code Policy
                </Link>
              </div>
            </div>
          </div> */}

          <div className="border-fd-border flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
            <div className="text-fd-muted-foreground flex flex-row gap-4">
              <Link href={GITHUB_LINK} className={TEXT_STYLE}>
                <GithubIcon className="size-5" />
                <span className="sr-only">Github</span>
              </Link>
              <Link href={REHOOKS_NPM} className={TEXT_STYLE}>
                <NpmIcon className="size-5" />
                <span className="sr-only">NPM</span>
              </Link>
            </div>

            <p className="text-fd-muted-foreground mt-4 text-sm">
              Copyright © {new Date().getFullYear()} Rehooks. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

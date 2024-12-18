import { Features } from "@/app/(home)/_components/features";
import { Scroll } from "@/app/(home)/_components/scroll";
import { Hero } from "@/app/(home)/_components/hero";

export default function HomePage() {
  return (
    <div className="relative h-full w-full">
      <main className="mx-8 my-16 flex min-h-screen flex-col items-center justify-center lg:my-0">
        <Hero />
        <div className="mt-10 flex flex-col items-center justify-center">
          <Features />
        </div>
      </main>
      <Scroll />
    </div>
  );
}

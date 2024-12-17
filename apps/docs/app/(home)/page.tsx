import { Features } from "@/app/(home)/_components/features";
import { Hero } from "@/app/(home)/_components/hero";

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <main className="mx-8 flex min-h-screen flex-col items-center justify-center">
        <Hero />
        <div className="mt-12 flex flex-col items-center justify-center">
          <Features />
        </div>
      </main>
    </div>
  );
}

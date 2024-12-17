import { Hero } from "@/app/(home)/_components/hero";

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <main className="flex min-h-screen flex-col items-center justify-center px-8">
        <Hero />
      </main>
    </div>
  );
}

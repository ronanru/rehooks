import { Hero, Grid } from "@/components/internal";

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <main className="flex min-h-screen flex-col items-center justify-center px-8 py-14">
        <Hero />
        <div className="mt-8 max-w-5xl">
          <Grid />
        </div>
      </main>
    </div>
  );
}

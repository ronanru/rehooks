import { Features } from "@/app/(home)/_components/features";
import { VideoPlayer } from "@/app/(home)/_components/video";
import { Hero } from "@/app/(home)/_components/hero";
import { Star } from "@rehooks/ui/components";

export default function HomePage() {
  return (
    <div className="h-full w-full">
      <div className="mx-8 my-28 flex min-h-screen flex-col items-center justify-center lg:my-36">
        <Hero />
        <div className="my-12 hidden xl:block">
          <VideoPlayer />
        </div>
        <div className="mt-10 flex flex-col items-center justify-center">
          <Features />
        </div>
      </div>
      <Star
        className="absolute inset-0 -z-50"
        quantity={50}
        ease={200}
        refresh
      />
      );
    </div>
  );
}

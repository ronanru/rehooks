import { BorderBeam } from "@rehooks/ui/components";

export function VideoPlayer() {
  return (
    <div className="relative max-w-6xl">
      <video
        className="border-fd-border pointer-events-none rounded-xl border-2 outline-none ring-0"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      >
        <source src="/RehooksDemo.mov" />
      </video>
      <BorderBeam duration={7} className="absolute inset-0 z-10 rounded-xl" />
    </div>
  );
}

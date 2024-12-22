import { BentoCard, BentoGrid } from "@rehooks/ui/components";
import { features } from "@/app/(home)/_components/cards";

export function Grid() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

import RevealStagger from "@/components/fx/RevealStagger";
import SnakeGame from "@/components/game/SnakeGame";

export default function Arcade({ index }: { index: number }) {
  return (
    <section className="cx-section px-[clamp(20px,6vw,80px)] py-[clamp(76px,10vh,100px)]">
      <RevealStagger index={index} className="flex w-full">
        <SnakeGame index={index} />
      </RevealStagger>
    </section>
  );
}

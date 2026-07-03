import RevealStagger from "@/components/fx/RevealStagger";
import SnakeGame from "@/components/game/SnakeGame";
import type { Dict } from "@/lib/i18n";

export default function Arcade({ index, dict }: { index: number; dict: Dict }) {
  return (
    <section className="cx-section px-[clamp(20px,6vw,80px)] py-[clamp(76px,10vh,100px)]">
      <RevealStagger index={index} className="flex w-full">
        <SnakeGame index={index} dict={dict} />
      </RevealStagger>
    </section>
  );
}

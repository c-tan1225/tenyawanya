import { Hero } from "@/components/home/Hero";
import { ConceptStrip } from "@/components/home/ConceptStrip";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { StepsToOrder } from "@/components/home/StepsToOrder";
import { CTASection } from "@/components/home/CTASection";

/**
 * TOP ページ
 *   Hero → コンセプト → 制作実績 → オーダーの流れ → CTA の順で、
 *   初めての方が世界観を感じ、見積もりへ進めるよう構成しています。
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ConceptStrip />
      <FeaturedWorks />
      <StepsToOrder />
      <CTASection />
    </>
  );
}

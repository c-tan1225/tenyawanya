import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BrandStory } from "@/components/about/BrandStory";
import { CraftCommitment } from "@/components/about/CraftCommitment";
import { VsMarket } from "@/components/about/VsMarket";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "わたしたちのこと",
  description:
    "ハンドメイドLEDネオンサイン「てんヤわんヤ」のブランドストーリー、手づくりへのこだわり、市販の量産品との違いをご紹介します。",
  alternates: { canonical: "/about" },
};

/** ABOUT ページ：ストーリー → こだわり → 市販品との違い → CTA */
export default function AboutPage() {
  return (
    <>
      <PageHero
        sub="About"
        title="わたしたちのこと"
        lead="にぎやかで、ちょっとドタバタ。つくる時間が楽しいアトリエ「てんヤわんヤ」のこと、手づくりへの想いをお話しします。"
      />
      <BrandStory />
      <CraftCommitment />
      <VsMarket />
      <CTASection />
    </>
  );
}

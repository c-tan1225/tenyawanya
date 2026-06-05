import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WorksGallery } from "@/components/works/WorksGallery";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "制作事例",
  description:
    "結婚式・店舗看板・インテリア・イベントなど、てんヤわんヤがこれまで手づくりしたLEDネオンサインの制作事例ギャラリーです。",
  alternates: { canonical: "/works" },
};

/** WORKS ページ：カテゴリーで絞り込めるギャラリー */
export default function WorksPage() {
  return (
    <>
      <PageHero
        sub="Works"
        title="これまでの灯り"
        lead="お名前ネオンからお店の看板まで。カテゴリーごとに、これまでお作りした事例をご覧いただけます。"
      />
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <WorksGallery />
      </section>
      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Estimator } from "@/components/order/Estimator";
import { Faq } from "@/components/common/Faq";

export const metadata: Metadata = {
  title: "見積もり・オーダー",
  description:
    "オーダーメイドLEDネオンサインの見積もりシミュレーター。サイズ・デザイン・カラーなどを選ぶだけで、その場で概算料金がわかります。内容はそのままお問い合わせへ。",
  alternates: { canonical: "/order" },
};

/**
 * ORDER ページ：見積もりシミュレーター
 *   通常の購入ページではなく、希望内容を入力すると概算がリアルタイムで
 *   変わるオーダーメイド専用ページです。
 */
export default function OrderPage() {
  return (
    <>
      <PageHero
        sub="Order"
        title="あなただけのネオンを、つくる"
        lead="サイズと画数を選ぶだけ。その場で概算がわかります。色やデザインのご希望は、お問い合わせで気軽にご相談ください。"
      />
      <div className="py-8 md:py-10">
        <Estimator />
      </div>
      <Faq />
    </>
  );
}

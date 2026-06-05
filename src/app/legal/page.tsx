import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/config/site";

/**
 * 特定商取引法に基づく表記（雛形）
 *   src/config/site.ts の legal を編集すると反映されます。
 *   未記入の項目は「（準備中）」と表示。すべて埋めたら、下の metadata の
 *   robots を { index: true } に変更して検索エンジンへ公開してください。
 */
export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  // 内容を記入し終えるまでは検索結果に出さない（雛形の状態を公開しないため）
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal" },
};

const tbd = (v: string) => (v && v.trim() ? v : "（準備中）");

export default function LegalPage() {
  const { legal, email, name } = siteConfig;

  const rows: { label: string; value: string }[] = [
    { label: "販売事業者", value: tbd(legal.sellerName || name) },
    { label: "運営責任者", value: tbd(legal.manager) },
    { label: "所在地", value: tbd(legal.address) },
    { label: "電話番号", value: tbd(legal.phone) },
    { label: "メールアドレス", value: email },
    {
      label: "販売価格",
      value:
        "各商品（オーダー内容）ごとに、見積もりシミュレーターおよびお見積りにて税込価格を表示します。",
    },
    { label: "商品代金以外の必要料金", value: tbd(legal.shipping) },
    { label: "お支払い方法", value: tbd(legal.paymentMethods) },
    { label: "お支払い時期", value: tbd(legal.paymentTiming) },
    { label: "商品の引渡し時期", value: tbd(legal.deliveryTiming) },
    { label: "返品・交換について", value: tbd(legal.returns) },
  ];

  return (
    <>
      <PageHero
        sub="Legal"
        title="特定商取引法に基づく表記"
        lead="安心してご注文いただけるよう、事業者情報と取引条件を記載しています。"
      />
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-10">
        <dl className="overflow-hidden rounded-3xl bg-cream-soft shadow-lift ring-1 ring-ink/[0.06]">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-[200px_1fr] sm:gap-4 ${
                i !== 0 ? "border-t border-ink/[0.06]" : ""
              }`}
            >
              <dt className="font-round text-sm font-bold text-ink/65">{row.label}</dt>
              <dd className="text-sm leading-[1.8] text-ink/75">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs leading-[1.8] text-ink/45">
          ※ 本ページは雛形です。事業者情報（販売事業者・運営責任者・所在地・電話番号など）を
          <code className="mx-1 font-mono">src/config/site.ts</code>
          に記入のうえ公開してください。電話番号は「請求があれば遅滞なく開示します」とする運用も認められています。
        </p>
      </section>
    </>
  );
}

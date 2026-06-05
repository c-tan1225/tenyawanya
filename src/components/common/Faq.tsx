import { faqItems } from "@/data/faq";

/**
 * よくある質問（FAQ）セクション。
 *   アコーディオン表示（details/summary）＋ 構造化データ（FAQPage）を出力します。
 */
export function Faq({ className = "" }: { className?: string }) {
  // 構造化データ（検索結果での FAQ リッチリザルト用）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className={`mx-auto max-w-3xl px-6 py-24 md:py-32 ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12 text-center">
        <p className="font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/45">
          FAQ
        </p>
        <h2 className="mt-4 font-round text-3xl font-bold text-ink md:text-[2.5rem]">
          よくある質問
        </h2>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, i) => (
          <details
            key={i}
            className="group rounded-2xl bg-cream-soft px-6 py-1 shadow-soft ring-1 ring-ink/[0.06] transition-shadow open:shadow-lift [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-5 font-round text-[15px] font-bold text-ink">
              <span className="flex items-start gap-2.5">
                <span className="text-ink/30">Q.</span>
                {item.q}
              </span>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-ink/40 ring-1 ring-ink/15 transition-transform duration-300 group-open:rotate-45">
                ＋
              </span>
            </summary>
            <p className="pb-6 pl-6 pr-2 text-[14px] leading-[1.9] text-ink/60">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEstimate } from "@/context/EstimateContext";
import { formatYen } from "@/lib/format";
import { sizeLabel, colorLabel, effectiveStrokes, boardSizeMm } from "@/lib/estimate";
import { neonHex } from "@/lib/colors";
import { pricingConfig } from "@/config/pricing";
import { NeonPreview } from "@/components/ui/NeonPreview";

/**
 * 見積もりサマリ（常時表示）。
 *   現在の選択内容と、リアルタイムの料金内訳・概算合計を、
 *   高単価商品にふさわしい静かな価格パネルとして表示します。
 *   税込をメインに、税抜・消費税を併記します。
 */
export function EstimateSummary({ compact = false }: { compact?: boolean }) {
  const { input, result, hydrated } = useEstimate();
  const tax = result.totalIncTax - result.subtotalExTax;

  return (
    <div className="flex flex-col">
      {!compact && (
        <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/40">
          Your estimate
        </p>
      )}

      {/* 文字があれば小さなプレビュー */}
      {input.text.trim() && (
        <NeonPreview
          text={input.text}
          color={input.color}
          font={input.font}
          tubeStyle={input.tubeStyle}
          widthMm={boardSizeMm(input).widthMm}
          heightMm={boardSizeMm(input).heightMm}
          tubeWidthMm={pricingConfig.tubeWidthMm}
          compact
          className="mb-4"
        />
      )}

      {/* 選択内容のチップ */}
      <div className="mb-5 flex flex-wrap gap-2">
        <Chip>{sizeLabel(input)}</Chip>
        <Chip>
          <span
            className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full align-middle ring-1 ring-ink/10"
            style={{ backgroundColor: neonHex[input.color] }}
            aria-hidden
          />
          {colorLabel(input.color)}
        </Chip>
        <Chip>{effectiveStrokes(input)}画</Chip>
      </div>

      {/* 料金内訳 */}
      <dl className="space-y-2.5 text-sm">
        {result.lines.map((line, i) => (
          <div key={i} className="flex items-baseline justify-between gap-3">
            <dt className="text-ink/60">
              {line.label}
              {line.note && (
                <span className="ml-1.5 text-[11px] text-ink/35">{line.note}</span>
              )}
            </dt>
            <dd className="shrink-0 font-display font-bold text-ink/80">
              {i === 0 ? formatYen(line.amount) : `+${formatYen(line.amount)}`}
            </dd>
          </div>
        ))}
      </dl>

      {/* 小計・税 */}
      <div className="mt-5 space-y-1.5 border-t border-ink/10 pt-4 text-xs text-ink/45">
        <div className="flex items-baseline justify-between">
          <span>小計（税抜）</span>
          <span className="font-display font-bold">{formatYen(result.subtotalExTax)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span>消費税（10%）</span>
          <span className="font-display font-bold">{formatYen(tax)}</span>
        </div>
      </div>

      {/* 合計（税込をメイン） */}
      <div className="mt-4 flex items-end justify-between border-t border-ink/10 pt-4">
        <span className="font-round text-sm font-bold text-ink/65">概算価格</span>
        <span className="text-right">
          <span className="font-round text-[2rem] font-extrabold leading-none tracking-tight text-ink">
            {formatYen(result.totalIncTax)}
          </span>
          <span className="ml-1.5 text-xs text-ink/45">税込</span>
        </span>
      </div>

      {/* 注意書き */}
      <p className="mt-5 rounded-2xl bg-cream-deep/60 px-4 py-3 text-[11px] leading-[1.8] text-ink/55">
        表示価格は概算です。アクリル形状・デザイン内容によって最終金額が変わる場合があります。送料は別途（お届け先・サイズにより異なります）。
      </p>

      {!hydrated && (
        <p className="mt-2 text-center text-[11px] text-ink/35">読み込み中…</p>
      )}
    </div>
  );
}

/** 選択内容を表す小さなチップ */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-pill bg-cream-deep/70 px-3 py-1.5 text-[12px] font-bold text-ink/70 ring-1 ring-ink/[0.06]">
      {children}
    </span>
  );
}

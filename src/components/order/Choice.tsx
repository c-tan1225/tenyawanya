"use client";

import type { ReactNode } from "react";
import { formatPlusYen } from "@/lib/format";

/**
 * 見積もりステップ共通の選択UI。
 *   ・StepHeading … 各ステップの見出し（番号＋タイトル＋補足）
 *   ・ChoiceGrid  … 選択肢のグリッド
 *   ・ChoiceCard  … 個々の選択肢（ヘアライン＋静かな選択状態）
 */

export function StepHeading({
  step,
  title,
  hint,
}: {
  /** ステップ番号（例: "01"） */
  step?: string;
  title: string;
  hint?: string;
}) {
  return (
    <div className="mb-7">
      {step && (
        <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/40">
          Step {step}
        </p>
      )}
      <h2 className="font-round text-xl font-bold tracking-tight text-ink md:text-2xl">
        {title}
      </h2>
      {hint && (
        <p className="mt-2 text-[14px] leading-[1.8] text-ink/55">{hint}</p>
      )}
    </div>
  );
}

export function ChoiceGrid({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
}) {
  const colCls = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[cols];
  return <div className={`grid gap-3 ${colCls}`}>{children}</div>;
}

export function ChoiceCard({
  label,
  description,
  priceDelta,
  selected,
  onSelect,
  accent = "#FF5FA2",
  swatch,
}: {
  label: string;
  description?: string;
  /** 追加料金（0 や undefined なら非表示） */
  priceDelta?: number;
  selected: boolean;
  onSelect: () => void;
  /** 選択時のアクセント色 */
  accent?: string;
  /** カラー選択用のスウォッチ色（指定時は丸い色見本を表示） */
  swatch?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex flex-col items-start gap-1 rounded-2xl bg-cream-soft p-4 text-left transition-all duration-300 ease-smooth md:p-5 ${
        selected
          ? "shadow-lift ring-[1.5px] ring-ink"
          : "shadow-soft ring-1 ring-ink/[0.08] hover:-translate-y-[2px] hover:ring-ink/25"
      }`}
    >
      {/* 選択チェック */}
      {selected && (
        <span
          className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold text-white"
          style={{ backgroundColor: accent }}
        >
          ✓
        </span>
      )}

      {swatch && (
        <span
          className="mb-2 h-7 w-7 rounded-full ring-1 ring-ink/10"
          style={{
            backgroundColor: swatch,
            boxShadow: selected ? `0 0 12px ${swatch}` : undefined,
          }}
          aria-hidden
        />
      )}

      <span className="font-round text-[15px] font-bold text-ink">{label}</span>
      {description && (
        <span className="text-xs leading-snug text-ink/50">{description}</span>
      )}
      {priceDelta !== undefined && priceDelta > 0 && (
        <span className="mt-1 font-display text-xs font-bold text-ink/70">
          {formatPlusYen(priceDelta)}
        </span>
      )}
      {priceDelta === 0 && (
        <span className="mt-1 font-display text-[11px] font-bold uppercase tracking-wide text-ink/35">
          込み
        </span>
      )}
    </button>
  );
}

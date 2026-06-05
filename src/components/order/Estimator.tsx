"use client";

import { useState } from "react";
import Link from "next/link";
import { useEstimate } from "@/context/EstimateContext";
import { formatYen } from "@/lib/format";
import { ProgressBar } from "./ProgressBar";
import { EstimateSummary } from "./EstimateSummary";
import { StepSize } from "./StepSize";
import { StepStrokes } from "./StepStrokes";

/**
 * 見積もりシミュレーター本体（ステッパー）。
 *   ・上部に進捗バー
 *   ・中央に現在のステップ
 *   ・PC は右に常時サマリ、スマホは下部バー＋ボトムシート
 *   入力内容は EstimateContext + localStorage に保持され、
 *   そのまま CONTACT へ引き継げます。
 */
const steps = [
  { title: "サイズ", Comp: StepSize },
  { title: "文字・デザイン", Comp: StepStrokes },
];

export function Estimator() {
  const { result, reset } = useEstimate();
  const [current, setCurrent] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  const isLast = current === steps.length - 1;
  const StepComp = steps[current].Comp;

  const goNext = () => setCurrent((c) => Math.min(steps.length - 1, c + 1));
  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));

  return (
    <div className="mx-auto max-w-6xl px-6 pb-36 md:pb-20">
      <ProgressBar steps={steps} current={current} onJump={setCurrent} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
        {/* ── ステップ本体 ── */}
        <div className="rounded-3xl bg-cream-soft p-6 shadow-soft ring-1 ring-ink/[0.06] md:p-10">
          <div key={current} className="animate-fade-up">
            <StepComp />
          </div>

          {/* ナビゲーション */}
          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={current === 0}
              className="rounded-pill px-5 py-3 font-round text-sm font-bold text-ink/50 transition-colors hover:bg-ink/[0.05] disabled:opacity-0"
            >
              ← 戻る
            </button>

            {isLast ? (
              <Link
                href="/contact"
                className="rounded-pill bg-ink px-7 py-3.5 font-round text-sm font-bold text-cream shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-lift"
              >
                この内容で問い合わせる →
              </Link>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="rounded-pill bg-ink px-9 py-3.5 font-round text-sm font-bold text-cream shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-lift"
              >
                次へ →
              </button>
            )}
          </div>

          {isLast && (
            <button
              type="button"
              onClick={() => {
                reset();
                setCurrent(0);
              }}
              className="mt-5 block w-full text-center text-xs text-ink/35 underline underline-offset-4 transition-colors hover:text-ink/60"
            >
              最初からやり直す
            </button>
          )}
        </div>

        {/* ── PC：常時表示サマリ ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-3xl bg-cream-soft p-7 shadow-lift ring-1 ring-ink/[0.06]">
            <EstimateSummary />
            <Link
              href="/contact"
              className="mt-6 block rounded-pill bg-ink px-5 py-3.5 text-center font-round text-sm font-bold text-cream shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-lift"
            >
              この内容で問い合わせる →
            </Link>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-ink/40">
              入力内容はそのまま引き継がれます
            </p>
          </div>
        </aside>
      </div>

      {/* ── スマホ：下部の合計バー ── */}
      <div className="glass fixed inset-x-0 bottom-0 z-30 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex flex-1 items-center justify-between"
          >
            <span className="text-left">
              <span className="block text-[11px] tracking-wide text-ink/45">
                概算（税込）・内訳を見る
              </span>
              <span className="font-round text-xl font-extrabold tracking-tight text-ink">
                {formatYen(result.totalIncTax)}
              </span>
            </span>
            <span className="ml-2 text-ink/35">⌃</span>
          </button>
          {isLast ? (
            <Link
              href="/contact"
              className="rounded-pill bg-ink px-5 py-3 font-round text-sm font-bold text-cream"
            >
              問い合わせ →
            </Link>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="rounded-pill bg-ink px-8 py-3 font-round text-sm font-bold text-cream"
            >
              次へ →
            </button>
          )}
        </div>
      </div>

      {/* ── スマホ：内訳ボトムシート ── */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-40 flex items-end bg-ink-deep/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSheetOpen(false)}
        >
          <div
            className="max-h-[80vh] w-full animate-pop-in overflow-auto rounded-t-4xl bg-cream-soft p-7 pb-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-ink/15" />
            <EstimateSummary />
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="mt-6 w-full rounded-pill py-3.5 font-round text-sm font-bold text-ink/70 ring-1 ring-ink/15"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

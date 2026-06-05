"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Work } from "@/data/works";
import { categoryLabels } from "@/data/works";
import { neonHex } from "@/lib/colors";
import { NeonText } from "@/components/ui/NeonText";

/**
 * 作品の拡大表示（ライトボックス）。
 *   前後送り・Esc 閉じ対応。
 */
export function Lightbox({
  work,
  onClose,
  onPrev,
  onNext,
}: {
  work: Work | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // キーボード操作
  useEffect(() => {
    if (!work) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [work, onClose, onPrev, onNext]);

  if (!work) return null;
  const glow = neonHex[work.color];

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink-deep/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} の拡大表示`}
    >
      {/* 閉じる */}
      <button
        onClick={onClose}
        aria-label="閉じる"
        className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-pill border-2 border-cream/30 text-2xl text-cream"
      >
        ×
      </button>

      {/* 前へ／次へ */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="前の作品"
        className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-pill text-cream ring-1 ring-cream/25 transition-colors hover:ring-cream/50 md:left-8"
      >
        ‹
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="次の作品"
        className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-pill text-cream ring-1 ring-cream/25 transition-colors hover:ring-cream/50 md:right-8"
      >
        ›
      </button>

      <figure
        className="relative w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1 ring-cream/15 md:aspect-[3/2]">
          {work.image ? (
            <Image
              src={work.image}
              alt={`${work.title}（${categoryLabels[work.category]}）`}
              fill
              sizes="(max-width: 768px) 90vw, 640px"
              className="object-contain"
            />
          ) : (
            <div
              className="absolute inset-0 grid place-items-center bg-ink"
              style={{
                backgroundImage: `radial-gradient(120% 80% at 50% 40%, ${glow}26, transparent 60%)`,
              }}
            >
              <NeonText
                color={work.color}
                flicker
                className="px-6 text-center font-round text-3xl font-bold md:text-5xl"
              >
                {work.title}
              </NeonText>
            </div>
          )}
        </div>
        <figcaption className="mt-4 text-center text-cream">
          <span className="font-display text-xs uppercase tracking-widest text-neon-pink">
            {categoryLabels[work.category]}
          </span>
          <h3 className="mt-1 font-round text-xl font-bold">{work.title}</h3>
          <p className="mt-1 text-sm text-cream/70">{work.description}</p>
        </figcaption>
      </figure>
    </div>
  );
}

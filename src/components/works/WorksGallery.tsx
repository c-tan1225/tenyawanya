"use client";

import { useMemo, useState } from "react";
import { works as allWorks, categoryLabels } from "@/data/works";
import type { WorkCategory } from "@/data/works";
import { WorkCard } from "./WorkCard";
import { Lightbox } from "./Lightbox";

/**
 * WORKS ページ本体。
 *   カテゴリーフィルター ＋ ギャラリー ＋ ライトボックスをまとめた client コンポーネント。
 */
type Filter = "all" | WorkCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "wedding", label: categoryLabels.wedding },
  { key: "shop", label: categoryLabels.shop },
  { key: "interior", label: categoryLabels.interior },
  { key: "event", label: categoryLabels.event },
];

export function WorksGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState<number | null>(null);

  // フィルター適用後のリスト
  const list = useMemo(
    () => (filter === "all" ? allWorks : allWorks.filter((w) => w.category === filter)),
    [filter],
  );

  const current = index !== null ? list[index] : null;
  const prev = () =>
    setIndex((i) => (i === null ? null : (i - 1 + list.length) % list.length));
  const next = () =>
    setIndex((i) => (i === null ? null : (i + 1) % list.length));

  return (
    <div>
      {/* カテゴリーフィルター */}
      <div className="no-scrollbar -mx-6 mb-10 flex gap-2 overflow-x-auto px-6 md:justify-center">
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key);
                setIndex(null);
              }}
              className={`shrink-0 rounded-pill px-5 py-2.5 font-round text-sm font-bold transition-all duration-300 ease-smooth ${
                active
                  ? "bg-ink text-cream shadow-soft"
                  : "bg-cream-soft text-ink/60 ring-1 ring-ink/10 hover:text-ink hover:ring-ink/30"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* ギャラリー（レスポンシブグリッド） */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6">
        {list.map((work, i) => (
          <WorkCard
            key={work.id}
            work={work}
            priority={i < 3}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-16 text-center text-ink/50">
          このカテゴリーの作品は準備中です。
        </p>
      )}

      <Lightbox work={current} onClose={() => setIndex(null)} onPrev={prev} onNext={next} />
    </div>
  );
}

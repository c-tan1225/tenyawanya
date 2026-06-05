import Link from "next/link";
import { works } from "@/data/works";
import { WorkCard } from "@/components/works/WorkCard";
import { Button } from "@/components/ui/Button";

/**
 * TOP の制作事例（抜粋）。
 *   data/works.ts から先頭をピックアップし、横スクロールで気持ちよく見せます。
 */
export function FeaturedWorks() {
  const picks = works.slice(0, 6);

  return (
    <section className="bg-cream-deep/50 py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/45">
              Works
            </p>
            <h2 className="mt-4 font-round text-3xl font-bold text-ink md:text-[2.5rem]">
              これまでの灯り
            </h2>
          </div>
          <Link
            href="/works"
            className="group hidden shrink-0 items-center gap-1.5 font-round text-sm font-bold text-ink/60 transition-colors hover:text-ink md:inline-flex"
          >
            すべて見る
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 横スクロールギャラリー */}
        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-3">
          {picks.map((work, i) => (
            <div
              key={work.id}
              className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-[31%]"
            >
              <WorkCard work={work} priority={i < 2} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Button href="/works" variant="outline">
            制作事例をすべて見る
          </Button>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { works } from "@/data/works";
import { neonHex } from "@/lib/colors";

/**
 * ヒーロー下部を流れる「ネオン作品の写真マーキー」。
 *   実際の制作写真を2列で逆方向にループ再生し、ひと目で“ネオン作品の良さ”を伝えます。
 *   ホバーで一時停止、各カードは /works へのリンク。
 *   prefers-reduced-motion のユーザーには（globals.css のルールで）流れません。
 */

// 写真がある作品のみを対象に
const photos = works.filter((w) => w.image);

/** 1列ぶんの写真カード列（シームレスループのため中身を2回並べる） */
function Row({
  items,
  direction,
  durationSec,
}: {
  items: typeof photos;
  direction: "left" | "right";
  durationSec: number;
}) {
  // 同じ並びを2回繰り返し、-50% 移動で継ぎ目なくループ
  const loop = [...items, ...items];
  return (
    <div className="marquee-row group/row relative overflow-hidden">
      <div
        className={`marquee-track gap-4 md:gap-5 ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
        style={{ "--dur": `${durationSec}s` } as CSSProperties}
      >
        {loop.map((w, i) => {
          const glow = neonHex[w.color];
          return (
            <Link
              key={`${w.id}-${i}`}
              href="/works"
              aria-label={`${w.title}（制作事例を見る）`}
              className="group/card relative block h-28 w-40 shrink-0 overflow-hidden rounded-2xl ring-1 ring-cream/10 transition-transform duration-500 ease-smooth hover:scale-[1.04] sm:h-32 sm:w-48 md:h-36 md:w-52"
              style={{ boxShadow: `0 0 0 1px ${glow}22, 0 10px 30px -12px ${glow}66` }}
            >
              <Image
                src={w.image}
                alt={`${w.title}のネオンサイン制作事例`}
                fill
                sizes="(max-width: 768px) 40vw, 13rem"
                className="object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
              {/* ほのかなネオングロウのにじみ */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                style={{ boxShadow: `inset 0 0 28px ${glow}55` }}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function NeonMarquee({ className = "" }: { className?: string }) {
  // 2列で別々の並び・別々の速度にして単調さを避ける
  const rowA = photos;
  const rowB = [...photos].reverse();

  return (
    <div className={`relative ${className}`} aria-hidden={false}>
      <div className="flex flex-col gap-4 md:gap-5">
        <Row items={rowA} direction="left" durationSec={46} />
        <Row items={rowB} direction="right" durationSec={60} />
      </div>

      {/* 左右の端を夜色にフェードして“流れ込む”印象に */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28"
        style={{ background: "linear-gradient(to right, #141218, transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28"
        style={{ background: "linear-gradient(to left, #141218, transparent)" }}
        aria-hidden
      />
    </div>
  );
}

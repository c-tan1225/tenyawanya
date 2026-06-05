import Image from "next/image";
import type { Work } from "@/data/works";
import { categoryLabels } from "@/data/works";
import { neonHex } from "@/lib/colors";
import { NeonText } from "@/components/ui/NeonText";

/**
 * 作品カード。
 *   image があれば写真を、無ければネオン風プレースホルダーを表示します。
 *   （写真が用意でき次第、data/works.ts に image を設定するだけで差し替わります）
 */
export function WorkCard({
  work,
  onClick,
  priority = false,
}: {
  work: Work;
  /** クリック時（ライトボックスを開く等） */
  onClick?: () => void;
  priority?: boolean;
}) {
  const glow = neonHex[work.color];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full overflow-hidden rounded-3xl bg-ink text-left shadow-soft ring-1 ring-ink/[0.06] transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink/50"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {work.image ? (
          <Image
            src={work.image}
            alt={`${work.title}（${categoryLabels[work.category]}）のネオンサイン制作事例`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // ── 写真未設定時：暗いアクリル板に光るネオン風モックアップ ──
          <div
            className="absolute inset-0 grid place-items-center overflow-hidden px-4"
            style={{
              background: `radial-gradient(120% 95% at 50% 38%, ${glow}2e 0%, #16141a 58%, #100e15 100%)`,
            }}
          >
            {/* アクリルの艶 */}
            <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/12" />
            {/* 点描テクスチャ */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="relative flex flex-col items-center">
              <NeonText
                color={work.color}
                flicker
                className="text-center font-round text-2xl font-bold leading-tight md:text-3xl"
              >
                {work.title}
              </NeonText>
              {/* アクリル面への反射 */}
              <span
                aria-hidden
                className="mt-1 block"
                style={{
                  transform: "scaleY(-1)",
                  opacity: 0.2,
                  filter: "blur(1px)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent 65%)",
                  maskImage: "linear-gradient(to bottom, black, transparent 65%)",
                }}
              >
                <NeonText
                  color={work.color}
                  className="text-center font-round text-2xl font-bold leading-tight md:text-3xl"
                >
                  {work.title}
                </NeonText>
              </span>
            </div>
          </div>
        )}

        {/* カテゴリーラベル */}
        <span className="glass absolute left-3 top-3 rounded-pill px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-ink">
          {categoryLabels[work.category]}
        </span>
      </div>

      {/* キャプション */}
      <div className="bg-cream-soft p-5">
        <h3 className="font-round text-[15px] font-bold text-ink">{work.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.7] text-ink/55">
          {work.description}
        </p>
      </div>
    </button>
  );
}

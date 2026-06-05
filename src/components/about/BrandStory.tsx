import { NeonText } from "@/components/ui/NeonText";
import { neonHex } from "@/lib/colors";

/**
 * ABOUT：ブランドストーリー。
 *   個人のアトリエで生まれる、手づくりの温度感を伝えます。
 */
export function BrandStory() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-36">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* テキスト */}
        <div>
          <p className="font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/45">
            Our story
          </p>
          <h2 className="mt-4 text-balance font-round text-3xl font-bold leading-[1.3] text-ink md:text-[2.5rem]">
            ちいさなアトリエから、
            <br />
            あなたの毎日に灯りを。
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-[1.95] text-ink/65 md:text-base">
            <p>
              「てんヤわんヤ」は、ハンドメイドのLEDネオンサインをつくる小さなアトリエです。
              にぎやかで、ちょっとドタバタで、つくっている時間がいつも楽しい。
              そんな名前のとおり、わくわくする灯りを一つずつ手づくりしています。
            </p>
            <p>
              きっかけは、「好きな言葉をいつも見える場所に飾れたら」という、ささやかな願いでした。
              既製品では出会えない、自分だけの形。だからこそ、デザインから仕上げまで、
              すべて手の届く範囲で、丁寧に向き合っています。
            </p>
            <p>
              結婚式のひと言、お店の看板、お部屋のアクセント、イベントの主役。
              あなたの&ldquo;好き&rdquo;が、やわらかく光る瞬間を一緒につくれたら嬉しいです。
            </p>
          </div>
        </div>

        {/* ビジュアル（ネオン風の見出しパネル） */}
        <div
          className="relative grid aspect-square place-items-center overflow-hidden rounded-4xl bg-ink-deep p-8 shadow-lift ring-1 ring-ink/10"
          style={{
            backgroundImage: `radial-gradient(120% 90% at 50% 30%, ${neonHex.purple}26, transparent 60%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          <p className="relative text-center font-round text-cream/70">
            <NeonText color="pink" flicker className="block text-4xl font-bold md:text-5xl">
              すき
            </NeonText>
            <span className="mt-3 block text-sm">を、かたちに。</span>
          </p>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/Button";
import { NeonText } from "@/components/ui/NeonText";
import { Balance } from "@/components/ui/Balance";
import { StarField } from "./StarField";
import { NeonMarquee } from "./NeonMarquee";
import { neonHex } from "@/lib/colors";

/**
 * TOP のヒーロー。
 *   夜の壁のようなディープグラデーションに、手づくりネオンがほのかに灯る。
 *   余白をたっぷり取り、静かで上質な第一印象をつくります。
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] flex-col overflow-hidden bg-night pt-32 md:min-h-screen md:pt-36">
      {/* やわらかなオーロラ（ぼかしたネオングロウ）— 少し強めに */}
      <div
        className="aurora absolute -left-32 top-1/4 h-[30rem] w-[30rem] opacity-60"
        style={{ background: neonHex.pink }}
        aria-hidden
      />
      <div
        className="aurora absolute -right-24 top-6 h-[26rem] w-[26rem] opacity-50"
        style={{ background: neonHex.blue }}
        aria-hidden
      />
      <div
        className="aurora absolute bottom-0 left-1/3 h-[28rem] w-[28rem] opacity-50"
        style={{ background: neonHex.purple }}
        aria-hidden
      />
      {/* ごく微細な点描テクスチャ */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        aria-hidden
      />

      {/* 背景を流れる中抜きの星 */}
      <StarField />

      <div className="reveal relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="mb-7 inline-flex items-center gap-2.5 rounded-pill px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-eyebrow text-cream/70 ring-1 ring-cream/15">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: neonHex.warm, boxShadow: `0 0 8px ${neonHex.warm}` }}
            aria-hidden
          />
          Handmade LED Neon
        </p>

        <h1 className="font-round text-[2.05rem] font-bold leading-[1.22] tracking-tightest text-cream sm:text-6xl md:text-[4.75rem] md:leading-[1.12]">
          あなたの&ldquo;すき&rdquo;を、
          <br />
          ずっと
          <NeonText color="pink" flicker>
            光らせて
          </NeonText>
          。
        </h1>

        <Balance
          text="名前、好きな言葉、お店のロゴ、思い出の形。ひとつひとつ手で曲げて灯す、世界にひとつのネオンサインを、完全オーダーメイドで。"
          className="mx-auto mt-8 block max-w-xl text-[15px] leading-[2] text-cream/65 md:text-[17px]"
        />

        <div className="mt-11 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <Button href="/order" variant="cream" size="lg" className="w-full sm:w-auto">
            無料で見積もりをつくる
          </Button>
          <Button
            href="/works"
            size="lg"
            variant="ghost"
            className="w-full text-cream ring-1 ring-cream/25 hover:bg-cream/[0.06] hover:text-cream sm:w-auto"
          >
            制作事例を見る
          </Button>
        </div>

        <Balance
          text="最短2ステップで概算がわかります・ご相談はもちろん無料"
          className="mt-7 block text-[13px] tracking-wide text-cream/40"
        />
      </div>

      {/* 実際のネオン作品を流す写真マーキー（作品の良さをひと目で） */}
      <NeonMarquee className="reveal mt-12 w-full pb-10 md:mt-16 md:pb-14" />
    </section>
  );
}

import { Button } from "@/components/ui/Button";
import { NeonText } from "@/components/ui/NeonText";
import { Balance } from "@/components/ui/Balance";
import { StarField } from "./StarField";
import { neonHex } from "@/lib/colors";

/**
 * 各ページ末尾でも使える、大きなオーダー導線。
 *   夜の面でネオンをほのかに灯し、見積もりへ静かに背中を押します。
 */
export function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-night py-28 md:py-40">
      <div
        className="aurora absolute left-1/4 top-0 h-80 w-80 opacity-50"
        style={{ background: neonHex.pink }}
        aria-hidden
      />
      <div
        className="aurora absolute bottom-0 right-1/4 h-80 w-80 opacity-50"
        style={{ background: neonHex.blue }}
        aria-hidden
      />
      {/* 背景を流れる中抜きの星 */}
      <StarField count={12} sparkleCount={8} />

      <div className="reveal relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-balance font-round text-[2rem] font-bold leading-[1.3] text-cream md:text-[3rem]">
          さあ、
          <NeonText color="pink" flicker>
            あなただけのネオン
          </NeonText>
          を
          <br />
          つくりましょう。
        </h2>
        <Balance
          text="サイズと画数を選ぶだけで、その場で概算がわかります。入力した内容はそのままご相談へ。気軽に試してみてください。"
          className="mx-auto mt-6 block max-w-md text-[15px] leading-[1.9] text-cream/65"
        />
        <div className="mt-11 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <Button href="/order" variant="cream" size="lg" className="w-full sm:w-auto">
            無料で見積もりをつくる
          </Button>
          <Button
            href="/contact"
            size="lg"
            variant="ghost"
            className="w-full text-cream ring-1 ring-cream/25 hover:bg-cream/[0.06] hover:text-cream sm:w-auto"
          >
            まずは相談する
          </Button>
        </div>
      </div>
    </section>
  );
}

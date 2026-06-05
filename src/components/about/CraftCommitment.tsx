import { Card } from "@/components/ui/Card";
import { neonHex } from "@/lib/colors";

/**
 * ABOUT：手づくりへのこだわり。
 *   制作の各工程に込めた想いを、カードで分かりやすく。
 */
const points = [
  {
    color: neonHex.pink,
    title: "線の一本まで、手で。",
    body: "LEDネオンチューブを、デザインに合わせて一本ずつ手で曲げていきます。角の丸み、文字のつながり、線の太さ。手づくりだからこそ、やさしい表情が生まれます。",
  },
  {
    color: neonHex.blue,
    title: "光り方まで、確かめる。",
    body: "色味や明るさは、実際に灯して目で確認。写真映えはもちろん、毎日見ても心地いい光になるよう調整しています。",
  },
  {
    color: neonHex.yellow,
    title: "飾る場所を、想像して。",
    body: "壁掛け・吊り下げ・自立スタンドなど、飾り方に合わせて設計。配線やアクリルの形まで、置かれる場所を想像しながら仕上げます。",
  },
  {
    color: neonHex.green,
    title: "ずっと使える、安心を。",
    body: "LEDは発熱が少なく、消費電力も控えめ。割れにくいチューブを使い、長く付き合える灯りとしてお届けします。",
  },
];

export function CraftCommitment() {
  return (
    <section className="bg-cream-deep/50 py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center md:mb-20">
          <p className="font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/45">
            Craft
          </p>
          <h2 className="mt-4 font-round text-3xl font-bold text-ink md:text-[2.5rem]">
            手づくりへの、こだわり
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {points.map((p) => (
            <Card key={p.title} className="flex gap-5">
              <span
                className="mt-1 h-11 w-11 shrink-0 rounded-2xl"
                style={{
                  backgroundColor: `${p.color}1f`,
                  boxShadow: `inset 0 0 0 1px ${p.color}40`,
                }}
                aria-hidden
              />
              <div>
                <h3 className="font-round text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.9] text-ink/60">{p.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { neonHex } from "@/lib/colors";
import { Balance } from "@/components/ui/Balance";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * TOP「オーダーの流れ」4ステップ。
 *   初めての方が安心できるよう、注文から納品までを静かに図解します。
 */
const steps = [
  {
    color: neonHex.pink,
    title: "見積もり・ご相談",
    body: "まずはシミュレーターで概算をチェック。イメージが固まっていなくても大丈夫、ご相談だけでも歓迎です。",
  },
  {
    color: neonHex.yellow,
    title: "デザインのご提案",
    body: "ご希望をもとに、ネオンならではの線でデザイン。完成イメージを確認しながら一緒につくります。",
  },
  {
    color: neonHex.blue,
    title: "手づくりで制作",
    body: "一本ずつチューブを曲げ、アクリルに丁寧に組み付け。光り方や色味まで確認して仕上げます。",
  },
  {
    color: neonHex.green,
    title: "お届け・設置",
    body: "しっかり梱包してお届け。壁掛け・吊り下げ・自立スタンドなど、設置方法もご相談いただけます。",
  },
];

export function StepsToOrder() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-36">
      {/* ネオンの色ぼかし */}
      <div
        className="aurora absolute -right-24 top-12 h-72 w-72 opacity-20"
        style={{ background: neonHex.blue }}
        aria-hidden
      />
      <div
        className="aurora absolute -left-20 bottom-8 h-72 w-72 opacity-[0.16]"
        style={{ background: neonHex.green }}
        aria-hidden
      />
      <div className="relative mx-auto mb-14 max-w-6xl px-6 text-center md:mb-20">
        <Eyebrow color={neonHex.blue}>How to order</Eyebrow>
        <h2 className="mt-4 font-round text-3xl font-bold text-ink md:text-[2.5rem]">
          オーダーの流れ
        </h2>
      </div>

      <ol className="relative mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="group relative rounded-3xl bg-cream-soft p-8 shadow-soft ring-1 ring-ink/[0.06] transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="font-display text-5xl font-extrabold leading-none text-ink/[0.08] transition-colors duration-500 group-hover:text-ink/15">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="mt-5 block h-[3px] w-9 rounded-full"
              style={{ backgroundColor: s.color }}
              aria-hidden
            />
            <h3 className="mt-5 font-round text-lg font-bold text-ink">{s.title}</h3>
            <Balance text={s.body} className="mt-2.5 block text-[14px] leading-[1.9] text-ink/60" />
          </li>
        ))}
      </ol>
    </section>
  );
}

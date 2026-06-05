import { Logo } from "@/components/layout/Logo";
import { Balance } from "@/components/ui/Balance";

/**
 * ABOUT：市販の量産LEDネオンとの違い。
 *   比較表で「手づくりで頼む価値」を分かりやすく示します。
 *   スマホでは縦並びでも読みやすいレイアウト。
 */
const rows: { label: string; ours: string; mass: string }[] = [
  {
    label: "デザイン",
    ours: "一からオーダー。言葉もロゴもイラストも自由",
    mass: "既製の文字・定番デザインが中心",
  },
  {
    label: "つくり方",
    ours: "一点一点、手で曲げて制作",
    mass: "機械で大量生産",
  },
  {
    label: "色・明るさ",
    ours: "灯して確認し、好みに合わせて調整",
    mass: "決まった色味から選択",
  },
  {
    label: "形・サイズ",
    ours: "アクリルの形状カットやサイズも相談可",
    mass: "規格サイズが基本",
  },
  {
    label: "相談・サポート",
    ours: "制作者と直接やりとり。納品まで伴走",
    mass: "問い合わせ窓口のみのことも",
  },
  {
    label: "看板用途",
    ours: "設置方法・耐久性まで考えて制作",
    mass: "用途が限定される場合がある",
  },
];

export function VsMarket() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-36">
      <div className="mb-14 text-center md:mb-16">
        <p className="font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/45">
          Difference
        </p>
        <h2 className="mt-4 font-round text-3xl font-bold text-ink md:text-[2.5rem]">
          市販品との、ちがい
        </h2>
        <Balance
          text="安価な量産ネオンにはない、手づくりだからこその自由さと安心を大切にしています。"
          className="mx-auto mt-4 block max-w-lg text-[15px] leading-[1.9] text-ink/55"
        />
      </div>

      <div className="overflow-hidden rounded-3xl bg-cream-soft shadow-lift ring-1 ring-ink/[0.06]">
        {/* 見出し行 */}
        <div className="grid grid-cols-[0.9fr_1.3fr_1.1fr] bg-ink text-cream">
          <div className="px-4 py-5 text-xs font-bold md:text-sm" />
          <div className="px-4 py-5 text-center">
            <Logo tone="cream" withSub={false} className="text-[13px] md:text-[15px]" />
          </div>
          <div className="grid place-items-center px-4 py-5 text-center font-round text-xs font-bold text-cream/55 md:text-sm">
            一般的な
            <br className="md:hidden" />
            量産品
          </div>
        </div>

        {/* 各行 */}
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[0.9fr_1.3fr_1.1fr] ${
              i !== 0 ? "border-t border-ink/[0.06]" : ""
            }`}
          >
            <div className="flex items-center px-4 py-5 font-round text-xs font-bold text-ink/75 md:text-sm">
              {row.label}
            </div>
            <div className="flex items-center gap-2 bg-neon-pink/[0.06] px-4 py-5 text-xs leading-[1.7] text-ink md:text-sm">
              <span className="mt-0.5 shrink-0 text-neon-pink">◎</span>
              {row.ours}
            </div>
            <div className="flex items-center px-4 py-5 text-xs leading-[1.7] text-ink/50 md:text-sm">
              {row.mass}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

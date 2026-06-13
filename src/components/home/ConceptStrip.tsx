import { neonHex } from "@/lib/colors";
import { Balance } from "@/components/ui/Balance";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * TOP のコンセプト3点。
 *   「手づくり」「自由設計」「看板にも選ばれる確かさ」を、
 *   余白を効かせたカードで静かに伝えます。
 */
const concepts = [
  {
    color: neonHex.pink,
    label: "Handcrafted",
    title: "ぜんぶ、手づくり。",
    body: "しなやかなLEDチューブを、一本ずつ手で曲げて形にします。量産では出せない、手のあたたかみが残ります。",
    icon: <path d="M4 14c2-6 6-9 8-9s2 3 0 5-3 4 0 5 6-1 8-4" />,
  },
  {
    color: neonHex.blue,
    label: "Made to order",
    title: "形も、言葉も、自由に。",
    body: "お名前、好きな言葉、ロゴ、イラストまで。決まった商品ではなく、あなたのイメージから一からデザインします。",
    icon: (
      <>
        <path d="M5 19l2-6 9-9 4 4-9 9-6 2z" />
        <path d="M14 6l4 4" />
      </>
    ),
  },
  {
    color: neonHex.green,
    label: "Built to last",
    title: "看板にも、選ばれる。",
    body: "屋内外での使いやすさや耐久性まで考えて制作するから、お店の顔としても安心して飾れます。",
    icon: (
      <>
        <path d="M4 11l8-6 8 6" />
        <path d="M6 10v8h12v-8" />
        <path d="M10 18v-4h4v4" />
      </>
    ),
  },
];

export function ConceptStrip() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-36">
      {/* ネオンの色ぼかし */}
      <div
        className="aurora absolute -left-24 top-16 h-72 w-72 opacity-20"
        style={{ background: neonHex.pink }}
        aria-hidden
      />
      <div
        className="aurora absolute -right-20 bottom-10 h-72 w-72 opacity-[0.18]"
        style={{ background: neonHex.purple }}
        aria-hidden
      />
      <div className="relative mx-auto mb-14 max-w-2xl px-6 text-center md:mb-20">
        <Eyebrow color={neonHex.pink}>Why tenya wanya</Eyebrow>
        <h2 className="mt-4 text-balance font-round text-3xl font-bold leading-[1.3] text-ink md:text-[2.5rem]">
          ひとつだけの灯りを、
          <br className="hidden sm:block" />
          ていねいに。
        </h2>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {concepts.map((c) => (
          <div
            key={c.title}
            className="group rounded-3xl bg-cream-soft p-8 shadow-soft ring-1 ring-ink/[0.06] transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-lift md:p-10"
          >
            <span
              className="mb-7 grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 ease-smooth group-hover:scale-105"
              style={{
                backgroundColor: `${c.color}14`,
                boxShadow: `inset 0 0 0 1px ${c.color}33`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke={c.color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {c.icon}
              </svg>
            </span>
            <p className="font-display text-[11px] uppercase tracking-eyebrow text-ink/40">
              {c.label}
            </p>
            <h3 className="mt-2 font-round text-xl font-bold text-ink">{c.title}</h3>
            <Balance text={c.body} className="mt-3 block text-[15px] leading-[1.9] text-ink/60" />
          </div>
        ))}
      </div>
    </section>
  );
}

import type { NeonColor, NeonFont, TubeStyle } from "@/lib/types";
import { neonHex } from "@/lib/colors";

/**
 * ネオン発光プレビュー（暗い「壁」の上に、選択サイズのアクリル板＋光る文字）。
 * ───────────────────────────────────────────────────────────────
 *  ・板（黒背景）＝選択サイズの「縦横比」と「大きさ」を壁に対して反映
 *    （A3 は小さく、A0 は大きく。A 判は比率が同じなので大きさで差が出る）
 *  ・文字サイズ・字間・改行位置・配置・縮尺は、すべて「板基準の container query 単位(cqw)」で決定。
 *    → どこに置いても（左の制作プレビュー／右の見積もりサマリー）同じ入力なら完全に同じ見え方になる。
 *  ・改行（\n）はそのまま反映。
 *  ・作り方： line＝1本ラインで塗り / outline＝縁取り（中抜き・drop-shadow で輪郭のみ発光）
 *
 *  ※フォントは選択式（丸ゴシック / 手書き風）。neonFontStack を差し替えれば追加・変更できます。
 */
export const neonFontStack: Record<NeonFont, string> = {
  round: "var(--font-zen-maru), sans-serif",
  hand: "var(--font-script), var(--font-hand), cursive",
};

export const neonFontLabel: Record<NeonFont, string> = {
  round: "丸ゴシック",
  hand: "手書き風",
};

/** 壁（シーン）の縦横比。板はこの上に実寸比率で配置される */
const SCENE_AR = 3 / 2;
/** 大きさマップの基準（A3=420mm 〜 A0=1189mm を 0.6〜0.95 に） */
const REF_MIN = 420;
const REF_MAX = 1189;

export function NeonPreview({
  text,
  color = "pink",
  font = "round",
  tubeStyle = "line",
  widthMm = 420,
  heightMm = 297,
  tubeWidthMm = 6,
  sizeLabel,
  compact = false,
  className = "",
}: {
  text: string;
  color?: NeonColor;
  font?: NeonFont;
  tubeStyle?: TubeStyle;
  /** アクリル板の寸法（mm）。縦横比・大きさ・チューブ太さの算出に使用 */
  widthMm?: number;
  heightMm?: number;
  /** チューブ実寸（mm） */
  tubeWidthMm?: number;
  /** 板に表示するサイズラベル（例: "A3・約42×30cm"） */
  sizeLabel?: string;
  /** サマリー等の小型表示（テキストの縮尺は変えず、ラベル等の装飾のみ簡素化） */
  compact?: boolean;
  className?: string;
}) {
  const hex = neonHex[color];
  const tube = color === "white" ? "#ffffff" : lighten(hex, 0.5);

  // ── 文字（改行はそのまま反映） ──
  const lines = text.length ? text.split("\n") : [];
  const hasText = lines.some((l) => l.trim().length > 0);
  const numLines = Math.max(1, lines.length);
  // 行の「幅の単位数」（全角=1.0 / 半角=0.62）で最長行を求める。
  // ※日本語を狭く見積もると板からはみ出して勝手に折り返すので、ここを正確に。
  const longestUnits = Math.max(0.6, ...lines.map(lineUnits));

  // ── 板の縦横比・大きさ（壁に対する割合）。すべて板幅 cqw 基準で共通計算 ──
  const ratio = widthMm > 0 && heightMm > 0 ? widthMm / heightMm : 420 / 297;
  const boardHcqw = 100 / ratio; // 板の高さを「板幅の%」で表したもの

  // 物理サイズ → 壁に対する板の大きさ（読みやすさのため緩めにマップ）
  const longestMm = Math.max(widthMm, heightMm);
  const fScale = clamp(
    0.6 + ((longestMm - REF_MIN) / (REF_MAX - REF_MIN)) * (0.95 - 0.6),
    0.45,
    0.98,
  );
  // f×f の枠内に、板をアスペクト比維持で最大配置（明示 W%/H% で曖昧さなし）
  let boardWpct: number;
  let boardHpct: number;
  if (ratio >= SCENE_AR) {
    boardWpct = fScale * 100;
    boardHpct = ((fScale * SCENE_AR) / ratio) * 100;
  } else {
    boardHpct = fScale * 100;
    boardWpct = ((fScale * ratio) / SCENE_AR) * 100;
  }

  // ── 文字サイズ（板いっぱい・余白少なめ）。compact でも完全に同じ値 ──
  // 最長行が板幅の約94%に収まるサイズにする（nowrap と併用で折り返さない）
  const widthFit = 94 / longestUnits;
  const heightFit = (boardHcqw * 0.84) / (numLines * 1.16);
  const fontCqw = clamp(Math.min(widthFit, heightFit), 4, 32);

  // チューブ太さ（実寸mm → 板幅に対する割合）
  const tubeCqw = clamp((tubeWidthMm / widthMm) * 100, 0.35, 3.2);

  // ── 発光 ──
  const g = Math.max(0.5, tubeCqw);
  const lineShadow = [
    `0 0 ${g * 0.45}cqw rgba(255,255,255,0.95)`,
    `0 0 ${g * 1.4}cqw ${hex}`,
    `0 0 ${g * 3}cqw ${withAlpha(hex, 0.85)}`,
    `0 0 ${g * 5.5}cqw ${withAlpha(hex, 0.55)}`,
    `0 0 ${g * 9}cqw ${withAlpha(hex, 0.35)}`,
  ].join(", ");
  // 縁取り（中抜き）：drop-shadow は描画ピクセル（＝輪郭）基準なので中は黒のまま
  const outlineGlow = [
    `drop-shadow(0 0 ${g * 0.3}cqw rgba(255,255,255,0.95))`,
    `drop-shadow(0 0 ${g * 0.8}cqw ${hex})`,
    `drop-shadow(0 0 ${g * 1.6}cqw ${withAlpha(hex, 0.75)})`,
    `drop-shadow(0 0 ${g * 2.6}cqw ${withAlpha(hex, 0.45)})`,
  ].join(" ");

  const textStyle: React.CSSProperties =
    tubeStyle === "outline"
      ? {
          color: "transparent",
          WebkitTextStrokeColor: tube,
          WebkitTextStrokeWidth: `${tubeCqw}cqw`,
          textShadow: "none",
          filter: outlineGlow,
          fontFamily: neonFontStack[font],
          fontSize: `${fontCqw}cqw`,
          fontWeight: 700,
        }
      : {
          color: tube,
          WebkitTextStrokeWidth: "0",
          textShadow: lineShadow,
          fontFamily: neonFontStack[font],
          fontSize: `${fontCqw}cqw`,
          fontWeight: 500,
        };

  return (
    <div
      className={`relative isolate overflow-hidden rounded-2xl ring-1 ring-white/10 ${className}`}
      style={{
        aspectRatio: `${SCENE_AR}`,
        // 壁（部屋の暗がり）
        background:
          "radial-gradient(120% 130% at 50% -10%, #1b1922 0%, #131119 55%, #0c0a10 100%)",
      }}
    >
      {/* 板を壁の中央に、実寸比率で配置 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative isolate overflow-hidden rounded-[1.4cqw] shadow-[0_4px_20px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
          style={{
            width: `${boardWpct}%`,
            height: `${boardHpct}%`,
            containerType: "inline-size",
            // アクリル板（黒背景）
            background:
              "radial-gradient(120% 100% at 50% 0%, #221f2b 0%, #17151d 55%, #100e15 100%)",
          }}
        >
          {/* アクリルの艶 */}
          <div className="pointer-events-none absolute inset-x-[6%] top-0 h-px bg-white/15" aria-hidden />
          {/* 点描テクスチャ */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "7cqw 7cqw",
            }}
            aria-hidden
          />

          {/* 文字（中央・板いっぱい・改行そのまま） */}
          <div className="absolute inset-0 flex items-center justify-center px-[3%] py-[3%] text-center">
            {hasText ? (
              <p className="leading-[1.06] tracking-tight" style={textStyle}>
                {lines.map((line, i) => (
                  <span key={i} className="block animate-flicker whitespace-nowrap">
                    {line || " "}
                  </span>
                ))}
              </p>
            ) : (
              <p className="font-display text-[8cqw] text-cream/30">ここに文字が光ります</p>
            )}
          </div>
        </div>
      </div>

      {/* サイズラベル（壁の隅・常に読める） */}
      {sizeLabel && (
        <p className="pointer-events-none absolute bottom-2 left-3 text-[10px] font-bold tracking-wide text-cream/40 md:text-[11px]">
          {sizeLabel}
        </p>
      )}
      {!compact && (
        <p className="pointer-events-none absolute bottom-2 right-3 text-[10px] tracking-wide text-cream/30">
          PREVIEW
        </p>
      )}
    </div>
  );
}

/* ───────── 色ユーティリティ ───────── */

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function lighten(hex: string, amt: number): string {
  const [r, g, b] = parseHex(hex);
  const mix = (c: number) => Math.round(c + (255 - c) * amt);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function withAlpha(hex: string, a: number): string {
  const [r, g, b] = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/**
 * 1行の「幅の単位数」を概算（全角=1.0 / 半角英数記号=0.62 / 半角カナ=0.5）。
 * 日本語を狭く見積もると板からはみ出して勝手に折り返すため、これで文字サイズを決める。
 */
function lineUnits(line: string): number {
  let u = 0;
  for (const ch of line) {
    const c = ch.codePointAt(0) ?? 0;
    if (c >= 0xff61 && c <= 0xff9f) u += 0.5; // 半角カナ
    else if (c <= 0x00ff) u += 0.62; // ASCII・ラテン（半角）
    else u += 1.0; // 全角（ひらがな・カタカナ・漢字・全角記号 等）
  }
  return u;
}

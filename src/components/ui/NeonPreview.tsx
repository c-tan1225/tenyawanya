import type { NeonColor, NeonFont, TubeStyle } from "@/lib/types";
import { neonHex } from "@/lib/colors";

/**
 * ネオン発光プレビュー（アクリル板の上に光る文字）。
 * ───────────────────────────────────────────────
 *  ・板の形＝選択サイズの縦横比をそのまま反映
 *  ・文字は板いっぱい・中央に配置（余白少なめ）
 *  ・チューブの太さは実寸（既定6mm）を板サイズに対して反映（小さい板ほど相対的に太く見える）
 *  ・作り方： line＝1本ラインで塗り / outline＝縁取り（中空）
 *  ・サイズは container query 単位(cqw)で板幅に追従
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
  /** アクリル板の寸法（mm）。縦横比＋太さ算出に使用 */
  widthMm?: number;
  heightMm?: number;
  /** チューブ実寸（mm） */
  tubeWidthMm?: number;
  /** 板に表示するサイズラベル（例: "A3・約42×30cm"） */
  sizeLabel?: string;
  compact?: boolean;
  className?: string;
}) {
  const hex = neonHex[color];
  const tube = color === "white" ? "#ffffff" : lighten(hex, 0.5);

  const lines = text.length ? text.split("\n") : [];
  const hasText = lines.some((l) => l.trim().length > 0);
  const numLines = Math.max(1, lines.length);
  // コードポイント単位で最長行
  const longest = Math.max(1, ...lines.map((l) => [...l].length || 1));

  // 板の縦横比（cqw＝板幅の1%）
  const ratio = widthMm > 0 && heightMm > 0 ? widthMm / heightMm : 420 / 297;
  const boardHcqw = 100 / ratio; // 板高さを cqw で表したもの

  // 文字サイズ（板いっぱいに／余白少なめ）
  const widthFit = 92 / (longest * 0.74);
  const heightFit = (boardHcqw * 0.84) / (numLines * 1.16);
  const fontCqw = clamp(Math.min(widthFit, heightFit), 4, compact ? 22 : 30);

  // チューブ太さ（実寸mm → 板幅に対する割合）
  const tubeCqw = clamp((tubeWidthMm / widthMm) * 100, 0.35, 3.2);

  // 発光（cqw でスケール）
  const g = Math.max(0.5, tubeCqw);
  // 1本ライン：塗りの線なので、にじみは広めでOK
  const lineShadow = [
    `0 0 ${g * 0.45}cqw rgba(255,255,255,0.95)`,
    `0 0 ${g * 1.4}cqw ${hex}`,
    `0 0 ${g * 3}cqw ${withAlpha(hex, 0.85)}`,
    `0 0 ${g * 5.5}cqw ${withAlpha(hex, 0.55)}`,
    `0 0 ${g * 9}cqw ${withAlpha(hex, 0.35)}`,
  ].join(", ");
  // 縁取り（中抜き）：filter drop-shadow は「描画ピクセル（＝輪郭ストローク）」を基準に
  // 発光するため、中身（透明）は光らず板の黒のまま＝はっきり中抜きに見える。
  const outlineGlow = [
    `drop-shadow(0 0 ${g * 0.3}cqw rgba(255,255,255,0.95))`,
    `drop-shadow(0 0 ${g * 0.8}cqw ${hex})`,
    `drop-shadow(0 0 ${g * 1.6}cqw ${withAlpha(hex, 0.75)})`,
    `drop-shadow(0 0 ${g * 2.6}cqw ${withAlpha(hex, 0.45)})`,
  ].join(" ");

  const textStyle: React.CSSProperties =
    tubeStyle === "outline"
      ? {
          // 中抜き：塗りなし・外周にチューブ。発光は drop-shadow で輪郭のみ（中は黒）
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
          // 1本ライン：細めの塗り線（追加ストロークなし・ウェイト軽め）
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
        aspectRatio: `${widthMm} / ${heightMm}`,
        containerType: "inline-size",
        background:
          "radial-gradient(120% 100% at 50% 0%, #221f2b 0%, #17151d 55%, #100e15 100%)",
      }}
    >
      {/* アクリルの艶 */}
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/15" aria-hidden />
      {/* 点描テクスチャ */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      {/* 文字（中央・板いっぱい） */}
      <div className="absolute inset-0 flex items-center justify-center px-[3%] py-[3%] text-center">
        {hasText ? (
          <p className="leading-[1.06] tracking-tight" style={textStyle}>
            {lines.map((line, i) => (
              <span key={i} className="block animate-flicker">
                {line || " "}
              </span>
            ))}
          </p>
        ) : (
          <p className="font-display text-[5cqw] text-cream/30">ここに文字が光ります</p>
        )}
      </div>

      {/* サイズラベル */}
      {sizeLabel && (
        <p className="pointer-events-none absolute bottom-2 left-3 text-[2.6cqw] font-bold tracking-wide text-cream/35 md:text-[11px]">
          {sizeLabel}
        </p>
      )}
      {!compact && (
        <p className="pointer-events-none absolute bottom-2 right-3 text-[2.6cqw] tracking-wide text-cream/30 md:text-[10px]">
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

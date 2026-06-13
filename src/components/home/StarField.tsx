import type { CSSProperties } from "react";
import { neonHex } from "@/lib/colors";

/**
 * ヒーロー背景を流れる「中抜き（線だけ）の丸い星」。
 *   下から上へゆっくり昇りながらループ。ネオン発色＋グロウで賑やかに。
 *   prefers-reduced-motion のユーザーには（globals.css のルールで）流れません。
 */
type Star = {
  left: string;
  top: string;
  size: number;
  color: string;
  dur: number; // 秒
  delay: number; // 秒（負＝途中から開始して最初から画面に散らす）
  dx: string;
  dy: string;
  rot: string;
  op: number;
};

const STARS: Star[] = [
  { left: "6%", top: "78%", size: 32, color: neonHex.pink, dur: 17, delay: -2, dx: "26px", dy: "-760px", rot: "120deg", op: 0.7 },
  { left: "18%", top: "96%", size: 20, color: neonHex.blue, dur: 14, delay: -9, dx: "-30px", dy: "-700px", rot: "-90deg", op: 0.6 },
  { left: "30%", top: "70%", size: 42, color: neonHex.purple, dur: 22, delay: -5, dx: "40px", dy: "-820px", rot: "160deg", op: 0.55 },
  { left: "44%", top: "104%", size: 24, color: neonHex.yellow, dur: 15, delay: -12, dx: "-18px", dy: "-720px", rot: "110deg", op: 0.65 },
  { left: "57%", top: "82%", size: 18, color: neonHex.green, dur: 13, delay: -3, dx: "34px", dy: "-680px", rot: "-130deg", op: 0.65 },
  { left: "68%", top: "98%", size: 36, color: neonHex.pink, dur: 20, delay: -15, dx: "-44px", dy: "-840px", rot: "90deg", op: 0.6 },
  { left: "80%", top: "74%", size: 22, color: neonHex.blue, dur: 16, delay: -7, dx: "20px", dy: "-700px", rot: "150deg", op: 0.62 },
  { left: "90%", top: "100%", size: 28, color: neonHex.warm, dur: 18, delay: -1, dx: "-26px", dy: "-780px", rot: "-100deg", op: 0.65 },
  { left: "12%", top: "60%", size: 16, color: neonHex.yellow, dur: 12, delay: -6, dx: "30px", dy: "-620px", rot: "120deg", op: 0.55 },
  { left: "38%", top: "90%", size: 26, color: neonHex.blue, dur: 19, delay: -11, dx: "-36px", dy: "-800px", rot: "-150deg", op: 0.58 },
  { left: "52%", top: "66%", size: 34, color: neonHex.pink, dur: 21, delay: -18, dx: "28px", dy: "-760px", rot: "140deg", op: 0.5 },
  { left: "73%", top: "88%", size: 20, color: neonHex.purple, dur: 14, delay: -4, dx: "-22px", dy: "-680px", rot: "100deg", op: 0.62 },
  { left: "86%", top: "62%", size: 24, color: neonHex.green, dur: 17, delay: -13, dx: "24px", dy: "-720px", rot: "-110deg", op: 0.55 },
  { left: "25%", top: "108%", size: 30, color: neonHex.warm, dur: 16, delay: -8, dx: "-30px", dy: "-820px", rot: "130deg", op: 0.6 },
  { left: "62%", top: "108%", size: 18, color: neonHex.yellow, dur: 13, delay: -16, dx: "36px", dy: "-700px", rot: "-90deg", op: 0.58 },
  { left: "4%", top: "92%", size: 22, color: neonHex.purple, dur: 18, delay: -10, dx: "40px", dy: "-760px", rot: "160deg", op: 0.58 },
  // 追加（より賑やかに）
  { left: "48%", top: "94%", size: 14, color: neonHex.green, dur: 11, delay: -2, dx: "-20px", dy: "-640px", rot: "120deg", op: 0.55 },
  { left: "33%", top: "100%", size: 36, color: neonHex.blue, dur: 23, delay: -20, dx: "44px", dy: "-860px", rot: "-140deg", op: 0.5 },
  { left: "95%", top: "84%", size: 16, color: neonHex.pink, dur: 13, delay: -5, dx: "-28px", dy: "-700px", rot: "110deg", op: 0.6 },
  { left: "16%", top: "72%", size: 24, color: neonHex.warm, dur: 18, delay: -14, dx: "32px", dy: "-740px", rot: "150deg", op: 0.55 },
  { left: "65%", top: "64%", size: 18, color: neonHex.yellow, dur: 15, delay: -9, dx: "-24px", dy: "-680px", rot: "-120deg", op: 0.52 },
  { left: "78%", top: "106%", size: 30, color: neonHex.purple, dur: 20, delay: -17, dx: "30px", dy: "-800px", rot: "130deg", op: 0.55 },
];

/** その場で瞬く小さなキラキラ（4点星＋点）。流れる星に重ねて煌めきを足す */
type Sparkle = {
  left: string;
  top: string;
  size: number;
  color: string;
  dur: number;
  delay: number;
  op: number;
};

const SPARKLES: Sparkle[] = [
  { left: "9%", top: "30%", size: 12, color: "#ffffff", dur: 3.2, delay: -0.4, op: 0.95 },
  { left: "22%", top: "52%", size: 8, color: neonHex.pink, dur: 4.1, delay: -1.6, op: 0.85 },
  { left: "15%", top: "18%", size: 6, color: neonHex.blue, dur: 2.8, delay: -2.2, op: 0.8 },
  { left: "34%", top: "40%", size: 10, color: "#ffffff", dur: 3.7, delay: -0.9, op: 0.9 },
  { left: "41%", top: "22%", size: 7, color: neonHex.yellow, dur: 4.6, delay: -3.1, op: 0.85 },
  { left: "49%", top: "48%", size: 9, color: neonHex.purple, dur: 3.0, delay: -1.2, op: 0.8 },
  { left: "57%", top: "28%", size: 12, color: "#ffffff", dur: 4.3, delay: -2.6, op: 0.95 },
  { left: "64%", top: "46%", size: 6, color: neonHex.green, dur: 2.9, delay: -0.6, op: 0.8 },
  { left: "72%", top: "20%", size: 9, color: neonHex.pink, dur: 3.9, delay: -1.9, op: 0.88 },
  { left: "81%", top: "44%", size: 11, color: "#ffffff", dur: 3.4, delay: -2.9, op: 0.9 },
  { left: "88%", top: "26%", size: 7, color: neonHex.blue, dur: 4.4, delay: -0.3, op: 0.82 },
  { left: "94%", top: "52%", size: 8, color: neonHex.warm, dur: 3.1, delay: -3.4, op: 0.85 },
  { left: "28%", top: "12%", size: 6, color: "#ffffff", dur: 2.7, delay: -1.4, op: 0.85 },
  { left: "68%", top: "12%", size: 7, color: neonHex.yellow, dur: 3.6, delay: -2.0, op: 0.8 },
];

export function StarField({ count, sparkleCount }: { count?: number; sparkleCount?: number } = {}) {
  const stars = count ? STARS.slice(0, count) : STARS;
  const sparkles =
    sparkleCount !== undefined ? SPARKLES.slice(0, sparkleCount) : SPARKLES;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={`d${i}`}
          className="star-drift absolute"
          style={
            {
              left: s.left,
              top: s.top,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
              "--dx": s.dx,
              "--dy": s.dy,
              "--rot": s.rot,
              "--op": s.op,
            } as CSSProperties
          }
        >
          <StarShape size={s.size} color={s.color} />
        </span>
      ))}
      {sparkles.map((s, i) => (
        <span
          key={`s${i}`}
          className="twinkle absolute"
          style={
            {
              left: s.left,
              top: s.top,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
              "--op": s.op,
            } as CSSProperties
          }
        >
          <SparkleShape size={s.size} color={s.color} />
        </span>
      ))}
    </div>
  );
}

/** 4点のキラッと光るスパークル */
function SparkleShape({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{
        filter: `drop-shadow(0 0 ${Math.max(2, size * 0.2)}px rgba(255,255,255,0.9)) drop-shadow(0 0 ${Math.max(4, size * 0.5)}px ${color})`,
      }}
    >
      <path d="M12 0 C12.8 7.2 16.8 11.2 24 12 C16.8 12.8 12.8 16.8 12 24 C11.2 16.8 7.2 12.8 0 12 C7.2 11.2 11.2 7.2 12 0 Z" />
    </svg>
  );
}

/** 中抜き（線だけ）の丸い星＋ネオングロウ */
function StarShape({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinejoin="round"
      strokeLinecap="round"
      style={{
        filter: `drop-shadow(0 0 ${Math.max(2, size * 0.08)}px rgba(255,255,255,0.75)) drop-shadow(0 0 ${Math.max(4, size * 0.26)}px ${color})`,
      }}
    >
      <path d="M12 3 L14.9 9.1 L21.6 9.9 L16.8 14.6 L18 21.3 L12 18.1 L6 21.3 L7.2 14.6 L2.4 9.9 L9.1 9.1 Z" />
    </svg>
  );
}

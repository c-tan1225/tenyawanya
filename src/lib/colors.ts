import type { NeonColor } from "@/lib/types";

/**
 * ネオンカラー名 → 実際の発色（HEX）
 * tailwind.config.ts の neon.* と揃えています。
 * glow（text-shadow / box-shadow）に直接渡して使います。
 */
export const neonHex: Record<NeonColor, string> = {
  white: "#FFFFFF",
  red: "#FF5E6C",
  blue: "#2B6BFF", // 真っ青（純度高め）
  pink: "#FF73B3",
  purple: "#C45CE8", // ピンクみがかった紫（マゼンタ寄り）
  yellow: "#FFD45E",
  green: "#5BE7A9",
  warm: "#FFE8B0",
};

/** UI 上のスウォッチ表示用ラベル */
export const neonColorOrder: NeonColor[] = [
  "white",
  "red",
  "blue",
  "pink",
  "purple",
  "yellow",
  "green",
  "warm",
];

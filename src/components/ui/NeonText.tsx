import type { ReactNode, CSSProperties, ElementType } from "react";
import type { NeonColor } from "@/lib/types";
import { neonHex } from "@/lib/colors";

/**
 * ネオン発光テキスト。
 *   暗い面の上で、指定色に光って見えるテキストを表示します。
 *   globals.css の .neon-text（CSS変数 --glow）と連携。
 */
export function NeonText({
  children,
  color = "pink",
  as: Tag = "span",
  className = "",
  flicker = false,
  style,
}: {
  children: ReactNode;
  color?: NeonColor;
  as?: ElementType;
  className?: string;
  /** わずかな明滅アニメーションを付ける */
  flicker?: boolean;
  style?: CSSProperties;
}) {
  return (
    <Tag
      className={`neon-text ${flicker ? "animate-flicker" : ""} ${className}`}
      style={{ ["--glow" as string]: neonHex[color], ...style }}
    >
      {children}
    </Tag>
  );
}

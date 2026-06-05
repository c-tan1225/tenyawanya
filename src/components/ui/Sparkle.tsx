import type { CSSProperties } from "react";

/**
 * きらめき（4点スター）。
 *   ネオンの輝きや「ワクワク感」を添える小さな装飾です。
 */
export function Sparkle({
  className = "",
  color = "#FFD45E",
  style,
}: {
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={color}
        d="M12 0c.6 5.8 2.2 7.4 8 8-5.8.6-7.4 2.2-8 8-.6-5.8-2.2-7.4-8-8 5.8-.6 7.4-2.2 8-8Z"
      />
    </svg>
  );
}

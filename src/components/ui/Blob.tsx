import type { CSSProperties } from "react";

/**
 * 装飾用のブロブ（有機的な丸い形）。
 *   ロゴの丸い曲線に呼応する、背景のやわらかいシェイプです。
 *   絶対配置して余白に散らす想定（aria-hidden）。
 */
export function Blob({
  className = "",
  color = "#FF73B3",
  style,
}: {
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={color}
        d="M44.1,-67.6C56.7,-59.5,66.2,-46.8,71.7,-32.7C77.2,-18.6,78.7,-3.1,75.4,11.2C72.1,25.5,64,38.6,53.3,49.3C42.6,60,29.3,68.3,14.4,72.9C-0.6,77.5,-17.2,78.4,-31.9,72.8C-46.6,67.2,-59.4,55.1,-67.4,40.6C-75.4,26.1,-78.6,9.2,-76.3,-6.7C-74,-22.6,-66.2,-37.5,-54.8,-46.2C-43.4,-54.9,-28.4,-57.4,-14.2,-62.2C0,-67,13.4,-74.1,27.1,-74.2C40.8,-74.3,54.8,-67.4,44.1,-67.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

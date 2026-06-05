/**
 * セクションの境目をなめらかにつなぐグラデーション。
 *   かつての波形をやめ、上品な縦グラデーションで静かに溶け込ませます。
 *   color には下にくるセクションの背景色を渡してください。
 */
export function SectionDivider({
  color = "#FAF7F1",
  flip = false,
  className = "",
}: {
  /** 下のセクションの地色 */
  color?: string;
  /** 上下反転（上の面へ向けて溶かす） */
  flip?: boolean;
  className?: string;
}) {
  const gradient = flip
    ? `linear-gradient(0deg, ${color} 0%, transparent 100%)`
    : `linear-gradient(180deg, transparent 0%, ${color} 100%)`;
  return (
    <div
      className={`pointer-events-none h-16 w-full md:h-24 ${className}`}
      aria-hidden="true"
      style={{ background: gradient }}
    />
  );
}

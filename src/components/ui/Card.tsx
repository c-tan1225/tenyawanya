import type { ReactNode } from "react";

/**
 * 共通カード（白面＋ヘアライン＋やわらかい拡散影）。
 *   余白を大きく取り、上質で静かなコンテナにします。
 */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl bg-cream-soft p-7 shadow-soft ring-1 ring-ink/[0.06] md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

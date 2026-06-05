import type { ReactNode } from "react";

/**
 * 丸いラベル（pill）。カテゴリーやキーワードの表示に。
 *   ヘアライン＋淡い面で上品に。
 */
export function Tag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill bg-cream-soft px-3.5 py-1.5 font-round text-xs font-bold tracking-wide text-ink/70 ring-1 ring-ink/10 ${className}`}
    >
      {children}
    </span>
  );
}

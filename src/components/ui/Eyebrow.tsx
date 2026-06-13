import type { ReactNode } from "react";

/**
 * セクション見出しの上に置く小さなラベル＋光るネオンの点。
 *   明るい面でもネオンらしさ・賑やかさを少し足します。
 */
export function Eyebrow({
  children,
  color = "#FF5FA2",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/55 ${className}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}, 0 0 2px ${color}` }}
        aria-hidden
      />
      {children}
    </p>
  );
}

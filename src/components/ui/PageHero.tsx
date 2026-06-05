import type { ReactNode } from "react";
import { Balance } from "./Balance";

/**
 * 下層ページ共通のヘッダー。
 *   固定ヘッダーに隠れないよう上部にたっぷり余白を取り、
 *   英語の小さなアイブロウ＋日本語タイトル＋リード文を、静かに中央配置します。
 */
export function PageHero({
  sub,
  title,
  lead,
  children,
}: {
  sub: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-dawn px-6 pb-14 pt-32 text-center md:pb-20 md:pt-44">
      {/* ごく淡いオーロラ（明るい面なので極控えめ） */}
      <div
        className="aurora absolute -left-24 top-10 h-64 w-64 opacity-[0.10]"
        style={{ background: "#FF5FA2" }}
        aria-hidden
      />
      <div
        className="aurora absolute -right-24 top-0 h-64 w-64 opacity-[0.10]"
        style={{ background: "#46C2FF" }}
        aria-hidden
      />

      <div className="reveal relative mx-auto max-w-2xl">
        <p className="font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/45">
          {sub}
        </p>
        <h1 className="mt-4 text-balance font-round text-[2rem] font-bold leading-[1.2] text-ink md:text-[2.75rem]">
          {title}
        </h1>
        {lead && (
          <Balance
            text={lead}
            className="mx-auto mt-5 block max-w-xl text-[15px] leading-[1.9] text-ink/60 md:text-base"
          />
        )}
        {children}
      </div>
    </header>
  );
}

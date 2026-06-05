"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./nav-items";
import { siteConfig } from "@/config/site";
import { InstagramIcon } from "./InstagramIcon";

/**
 * モバイル用のフルスクリーンメニュー。
 *   Header のハンバーガーから開閉します。
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      {/* 背景（夜のグラデーション） */}
      <div className="absolute inset-0 bg-night" onClick={onClose} />

      <div className="relative flex h-full flex-col px-7 pb-12 pt-5">
        {/* 閉じるボタン */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            aria-label="メニューを閉じる"
            className="grid h-11 w-11 place-items-center rounded-pill text-cream ring-1 ring-cream/20 transition-colors hover:bg-cream/5"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        {/* メニュー項目 */}
        <nav className="mt-4 flex flex-1 flex-col justify-center gap-1">
          {navItems.map((item, i) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="group flex items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors hover:bg-cream/[0.04]"
                style={{
                  animation: open
                    ? `fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${0.05 + i * 0.06}s both`
                    : undefined,
                }}
              >
                <span className="w-8 font-display text-[11px] uppercase tracking-eyebrow text-cream/35">
                  {item.sub}
                </span>
                <span
                  className={`font-round text-[28px] font-bold tracking-tight transition-colors ${
                    active ? "text-cream" : "text-cream/70 group-hover:text-cream"
                  }`}
                >
                  {item.label}
                </span>
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-pink shadow-[0_0_8px_#FF5FA2]" aria-hidden />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Instagram 導線 */}
        <a
          href={siteConfig.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 font-round font-bold text-cream ring-1 ring-cream/20 transition-colors hover:ring-cream/40"
        >
          <InstagramIcon className="h-5 w-5" />
          {siteConfig.instagram.handle}
        </a>
      </div>
    </div>
  );
}

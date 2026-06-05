"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { navItems } from "./nav-items";
import { MobileNav } from "./MobileNav";
import { siteConfig } from "@/config/site";
import { InstagramIcon } from "./InstagramIcon";

/**
 * サイト共通ヘッダー。
 *   スクロールで背景を出す／モバイルはハンバーガー。
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ホーム最上部は暗いヒーローの上＝ヘッダーを明色に。スクロール後・下層ページは暗色。
  const onDark = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-smooth ${
          scrolled
            ? "glass shadow-[0_1px_0_rgba(36,34,42,0.06)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8 md:py-4">
          {/* ロゴ */}
          <Link href="/" aria-label="てんヤわんヤ ホーム" className="shrink-0 transition-opacity hover:opacity-70">
            <Logo withSub={false} tone={onDark ? "cream" : "ink"} className="text-[15px] md:text-[17px]" />
          </Link>

          {/* PC ナビ */}
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.slice(0, 4).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-round text-[13.5px] font-bold tracking-tight transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[1.5px] after:rounded-full after:transition-all after:duration-300 ${
                    onDark ? "after:bg-cream" : "after:bg-ink"
                  } ${
                    active
                      ? `${onDark ? "text-cream" : "text-ink"} after:w-full`
                      : `${onDark ? "text-cream/65 hover:text-cream" : "text-ink/55 hover:text-ink"} after:w-0 hover:after:w-full`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`grid h-9 w-9 place-items-center rounded-pill transition-colors hover:text-neon-pink ${
                onDark ? "text-cream/65" : "text-ink/55"
              }`}
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
            <Link
              href="/order"
              className={`rounded-pill px-5 py-2.5 font-round text-[13.5px] font-bold tracking-tight shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-lift ${
                onDark ? "bg-cream text-ink" : "bg-ink text-cream"
              }`}
            >
              無料見積もり
            </Link>
          </nav>

          {/* モバイル：ハンバーガー */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="メニューを開く"
            className={`grid h-11 w-11 place-items-center rounded-pill backdrop-blur-md transition-colors md:hidden ${
              onDark
                ? "bg-cream/10 ring-1 ring-cream/25 hover:bg-cream/20"
                : "bg-cream-soft/70 ring-1 ring-ink/10 hover:bg-cream-soft"
            }`}
          >
            <span className="flex flex-col gap-[5px]">
              <span className={`block h-[2px] w-[18px] rounded-full ${onDark ? "bg-cream" : "bg-ink"}`} />
              <span className={`block h-[2px] w-[18px] rounded-full ${onDark ? "bg-cream" : "bg-ink"}`} />
              <span className={`block h-[2px] w-[18px] rounded-full ${onDark ? "bg-cream" : "bg-ink"}`} />
            </span>
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";
import { navItems } from "./nav-items";
import { siteConfig } from "@/config/site";
import { InstagramIcon } from "./InstagramIcon";

/**
 * サイト共通フッター。
 *   暗いチャコール面で、ネオンがほのかに光る締めくくり。
 */
export function Footer() {
  return (
    <footer className="relative">
      <div className="bg-night px-6 pb-28 pt-20 text-cream md:pb-16 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
            {/* ブランド */}
            <div>
              <Logo tone="cream" className="text-[19px]" />
              <p className="mt-5 max-w-xs text-sm leading-[1.9] text-cream/55">
                ひとつひとつ、手で曲げて、手で灯す。
                あなたの「好き」を、やさしく光るネオンサインに。
              </p>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-bold text-cream/90 ring-1 ring-cream/20 transition-colors hover:text-neon-pink hover:ring-neon-pink/50"
              >
                <InstagramIcon className="h-4 w-4" />
                {siteConfig.instagram.handle}
              </a>
            </div>

            {/* ナビ */}
            <nav className="text-sm">
              <h2 className="mb-4 font-display text-[11px] uppercase tracking-eyebrow text-cream/40">
                Menu
              </h2>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-cream/65 transition-colors hover:text-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 連絡先 */}
            <div className="text-sm">
              <h2 className="mb-4 font-display text-[11px] uppercase tracking-eyebrow text-cream/40">
                Contact
              </h2>
              <p className="leading-[1.9] text-cream/65">
                オーダー・ご相談は
                <br />
                お問い合わせフォーム、または
                <br />
                Instagram のDMから。
              </p>
              <Link
                href="/order"
                className="mt-5 inline-flex rounded-pill bg-cream px-5 py-2.5 font-round font-bold text-ink shadow-soft transition-transform duration-300 ease-smooth hover:-translate-y-[2px]"
              >
                見積もりをつくる
              </Link>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-7 text-xs text-cream/40 md:flex-row">
            <p>
              © {siteConfig.name}{" "}
              <span className="font-display tracking-wider text-cream/55">
                / {siteConfig.nameEn}
              </span>
            </p>
            <div className="flex items-center gap-4">
              <Link href="/legal" className="transition-colors hover:text-cream">
                特定商取引法に基づく表記
              </Link>
              <span aria-hidden>・</span>
              <p>Handmade LED Neon ・ Made to order</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

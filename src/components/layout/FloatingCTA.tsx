"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 画面下に固定表示する問い合わせ／見積もり導線。
 *   モバイルでは下部バー、PCでは右下の丸ボタン。
 *   入力の邪魔になる ORDER / CONTACT ページでは非表示にします。
 */
export function FloatingCTA() {
  const pathname = usePathname();
  const hidden = pathname === "/order" || pathname === "/contact";
  if (hidden) return null;

  return (
    <>
      {/* モバイル：下部固定バー（ガラス面） */}
      <div className="glass fixed inset-x-0 bottom-0 z-30 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
        <div className="flex gap-3">
          <Link
            href="/contact"
            className="flex-1 rounded-pill px-4 py-3 text-center font-round text-sm font-bold text-ink ring-1 ring-ink/20 transition-colors active:bg-ink/[0.04]"
          >
            相談する
          </Link>
          <Link
            href="/order"
            className="flex-[1.5] rounded-pill bg-ink px-4 py-3 text-center font-round text-sm font-bold text-cream shadow-soft"
          >
            無料で見積もり
          </Link>
        </div>
      </div>

      {/* PC：右下のボタン */}
      <Link
        href="/order"
        className="group fixed bottom-8 right-8 z-30 hidden items-center gap-2.5 rounded-pill bg-ink px-6 py-4 font-round text-[15px] font-bold text-cream shadow-lift transition-all duration-300 ease-smooth hover:-translate-y-[2px] md:inline-flex"
      >
        <span className="h-2 w-2 rounded-full bg-neon-pink shadow-[0_0_10px_#FF5FA2] transition-transform duration-300 group-hover:scale-125" aria-hidden />
        無料見積もりをつくる
      </Link>
    </>
  );
}

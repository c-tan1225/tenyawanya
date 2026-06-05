import Image from "next/image";
import { siteConfig } from "@/config/site";

/**
 * ブランドワードマーク「てんヤわんヤ」（公式ロゴ画像）。
 * ──────────────────────────────────────────────
 *  /public/logo.png（透過PNG・ダークチャコールの横ロックアップ）を表示します。
 *  暗い面では tone="cream" を渡すと、フィルターで白く反転して視認性を確保します。
 *  サイズは渡された className の font-size（em）を基準に高さが決まります。
 */
export function Logo({
  tone = "ink",
  // withSub は後方互換のため残置（ロゴ画像にラテン表記が含まれるため未使用）
  withSub: _withSub = true,
  className = "",
}: {
  tone?: "ink" | "cream";
  withSub?: boolean;
  className?: string;
}) {
  // 暗い面では白く反転（ダークなロゴを視認できるように）
  const toneCls =
    tone === "cream" ? "[filter:brightness(0)_invert(1)]" : "";

  return (
    <Image
      src="/logo.png"
      alt={siteConfig.name}
      width={1326}
      height={300}
      priority
      className={`inline-block select-none ${toneCls} ${className}`}
      // ロックアップの縦横比(1326:300 ≒ 4.42)を em で固定し、歪みを防ぐ
      style={{ height: "2.1em", width: "9.28em" }}
    />
  );
}

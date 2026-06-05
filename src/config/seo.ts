import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * SEO のベース設定。
 * 各ページはこの defaultMetadata を起点に title だけ上書きします。
 */
const description =
  "結婚式・店舗看板・インテリア・イベントのための、一点一点手づくりするLEDネオンサイン。完全オーダーメイド。見積もりシミュレーターでその場で概算がわかります。";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}｜手づくりLEDネオンサイン・完全オーダーメイド`,
    template: `%s｜${siteConfig.name}`,
  },
  description,
  keywords: [
    "ネオンサイン",
    "LEDネオン",
    "オーダーメイド",
    "ハンドメイド",
    "結婚式",
    "ウェルカムボード",
    "店舗看板",
    "インテリア",
    "てんヤわんヤ",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: siteConfig.name,
    title: `${siteConfig.name}｜手づくりLEDネオンサイン`,
    description,
    // OGP 画像は src/app/opengraph-image.tsx（動的生成）が自動で使われます
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}｜手づくりLEDネオンサイン`,
    description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

/** 構造化データ（JSON-LD）: ローカルビジネス */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description,
  url: siteConfig.url,
  email: siteConfig.email,
  image: `${siteConfig.url}/og.png`,
  sameAs: [siteConfig.instagram.url],
  priceRange: "¥¥",
};

import type { Metadata, Viewport } from "next";
import {
  Zen_Maru_Gothic,
  Noto_Sans_JP,
  Baloo_2,
  Caveat,
  Yomogi,
} from "next/font/google";
import "./globals.css";
import { defaultMetadata, localBusinessJsonLd } from "@/config/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { EstimateProvider } from "@/context/EstimateContext";

/* ───────── フォント（next/font でセルフホスト） ───────── */

// 見出し＝丸ゴシック（ワードマークに最も近い）
const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-maru",
  display: "swap",
});

// 本文＝Noto Sans JP
const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

// ラテン装飾＝Baloo 2（丸み）
const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-baloo",
  display: "swap",
});

// 手書き風（英字＝丸みのある緩いマーカー手書き）
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

// 手書き風（日本語＝やわらかい丸手書き）
const yomogi = Yomogi({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#FBF6EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${zenMaru.variable} ${noto.variable} ${baloo.variable} ${caveat.variable} ${yomogi.variable}`}
    >
      <body className="font-sans antialiased">
        {/* 構造化データ（ローカルビジネス） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <EstimateProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingCTA />
        </EstimateProvider>
      </body>
    </html>
  );
}

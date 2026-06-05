import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * OGP 画像の動的生成（SNS シェア時に表示）。
 *   Next.js のファイル規約により、og:image / twitter:image に自動適用されます。
 *   ※確実に描画されるよう、ラテン表記＋ブランドカラーで構成しています。
 */
export const runtime = "edge";
export const alt = "てんヤわんヤ｜手づくりLEDネオンサイン";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#211F28",
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(255,115,179,0.35), transparent 45%), radial-gradient(circle at 75% 70%, rgba(79,195,255,0.35), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 130,
            fontWeight: 800,
            color: "#FBF6EC",
            letterSpacing: "0.05em",
            textShadow:
              "0 0 20px rgba(255,115,179,0.9), 0 0 50px rgba(255,115,179,0.6)",
          }}
        >
          {siteConfig.nameEn}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            color: "#FBF6EC",
            opacity: 0.85,
          }}
        >
          Handmade LED Neon Sign ・ Made to order
        </div>
        <div
          style={{
            marginTop: 40,
            padding: "12px 36px",
            borderRadius: 999,
            border: "3px solid rgba(251,246,236,0.4)",
            fontSize: 28,
            color: "#FBF6EC",
          }}
        >
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}

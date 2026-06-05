import type { Config } from "tailwindcss";

/**
 * てんヤわんヤ ブランド・デザイントークン
 * ──────────────────────────────────────────
 * 方向性：高級ハンドメイドブランドのLP。
 *   ・暖かいオフホワイト（紙のような地色）＋ ディープチャコール
 *   ・ヘアラインの境界、やわらかく拡散する影、淡いグラデーション
 *   ・ネオンは「ベタ塗り」ではなく、ほのかな発光アクセントとして使用
 *   ・余白・行間をたっぷり取り、Apple のような静けさと洗練を狙う
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ベース（紙のような暖白／夜のチャコール）
        ink: {
          DEFAULT: "#24222A", // メインの暗色（warm charcoal）
          soft: "#36333E",    // やや明るい暗色
          deep: "#161419",    // 最も深い夜色（暗い面の背景）
          muted: "#76727F",   // 補助テキスト
        },
        cream: {
          DEFAULT: "#FAF7F1", // 基本の明るい背景（暖かいオフホワイト）
          soft: "#FFFFFF",    // 最も明るい面（クリスプな白＝カード）
          deep: "#F1EBDF",    // 影側のクリーム
        },
        // ネオンアクセント（発光色／ほのかに使う）
        neon: {
          pink: "#FF5FA2",
          blue: "#2B6BFF", // 真っ青（純度高め）
          purple: "#C45CE8", // ピンクみがかった紫（マゼンタ寄り）
          yellow: "#FFD15B",
          green: "#39E0A0",
          warm: "#FFE3A8", // 電球色
        },
      },
      fontFamily: {
        // 見出し＝丸ゴシック（ワードマークに最も近い）
        round: ["var(--font-zen-maru)", "sans-serif"],
        // 本文＝Noto Sans JP
        sans: ["var(--font-noto)", "sans-serif"],
        // ラテン装飾＝Baloo 2（丸み）
        display: ["var(--font-baloo)", "var(--font-zen-maru)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        eyebrow: "0.28em",
      },
      borderRadius: {
        blob: "42% 58% 56% 44% / 48% 42% 58% 52%",
        pill: "999px",
        "2xl": "1.25rem",  // 20px
        "3xl": "1.75rem",  // 28px
        "4xl": "2.25rem",  // 36px
        "5xl": "2.75rem",  // 44px
      },
      boxShadow: {
        // 多層のやわらかい影（Apple 的な拡散）
        soft: "0 1px 2px rgba(22,20,25,0.04), 0 10px 30px -16px rgba(22,20,25,0.16)",
        lift: "0 2px 6px rgba(22,20,25,0.05), 0 28px 60px -28px rgba(22,20,25,0.28)",
        hair: "0 0 0 1px rgba(36,34,42,0.07)",
        glow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px -24px rgba(255,95,162,0.30)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      backgroundImage: {
        // 暗い面のグラデーション（夜の壁）
        night:
          "radial-gradient(120% 90% at 50% -10%, #2A2733 0%, #1B1922 45%, #141218 100%)",
        // 明るい面のごく淡い暖色グラデーション
        dawn:
          "linear-gradient(180deg, #FFFFFF 0%, #FAF7F1 55%, #F4EEE3 100%)",
      },
      transitionTimingFunction: {
        // やわらかな減速
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "94%": { opacity: "1" },
          "95%": { opacity: "0.82" },
          "96%": { opacity: "1" },
          "98%": { opacity: "0.92" },
          "99%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        // 上品なフェードアップ（旧 pop-in を置き換え）
        "pop-in": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(14px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "0.35" },
        },
        sheen: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        flicker: "flicker 7s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "pop-in": "pop-in 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        sparkle: "sparkle 3.2s ease-in-out infinite",
        sheen: "sheen 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

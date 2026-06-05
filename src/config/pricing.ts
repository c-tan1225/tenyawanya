import type { PresetSize } from "@/lib/types";

/**
 * ============================================================
 *  料金設定ファイル（管理者編集用）
 * ============================================================
 *  この数値を書き換えるだけで、サイト全体の見積もり計算に反映されます。
 *  アクリル板は市場価格が変動するため、各サイズの material（材料費）と
 *  processing（加工費）を必要に応じて更新してください。
 *
 *  すべて「税抜・円」で記載しています。
 * ------------------------------------------------------------
 */

/** プリセット1サイズあたりの設定 */
interface AcrylicSizeSetting {
  /** 表示ラベル */
  label: string;
  /** おおよその寸法（mm）— オリジナルサイズの最寄り判定に使用 */
  widthMm: number;
  heightMm: number;
  /** アクリル板の材料費（市場価格に合わせて変更） */
  material: number;
  /** サイズ加工費（大判ほど手間が増えるぶんの実費） */
  processing: number;
}

export const pricingConfig = {
  /** ① ネオン制作の基準料金（A3まで・透明アクリル・10画までを含む） */
  basePrice: 24800,

  /** 基準料金に含まれる画数 */
  includedStrokes: 10,

  /** 11画目以降、1画ごとの追加料金 */
  extraStrokeFee: 1500,

  /** 消費税率（税込表示の計算に使用） */
  taxRate: 0.1,

  /**
   * ② アクリル板サイズ設定。
   *    referenceSize（A3）を基準に、差額＋加工費で追加料金を計算します。
   *    追加料金 = max(0, (material[size] − material[A3]) + processing[size])
   */
  referenceSize: "A3" as PresetSize,
  acrylicSizes: {
    // ↓ 最小・基準サイズ（基本料金に含まれるため追加料金は常に 0）
    A3: { label: "A3", widthMm: 420, heightMm: 297, material: 1200, processing: 0 },
    A2: { label: "A2", widthMm: 594, heightMm: 420, material: 2800, processing: 1500 },
    A1: { label: "A1", widthMm: 841, heightMm: 594, material: 5500, processing: 3000 },
    A0: { label: "A0", widthMm: 1189, heightMm: 841, material: 11000, processing: 5000 },
  } as Record<PresetSize, AcrylicSizeSetting>,

  /** ネオンチューブの実寸の太さ（mm）。プレビューの線の太さ表現に使用 */
  tubeWidthMm: 6,

  /**
   * ③ 文字テキストからの画数（ネオンチューブ本数）概算の重み。
   *    作り方（tubeStyle）で本数が変わります（すべて概算・調整可）。
   *    ・line   … 文字を1本のラインで追う作り（交差部だけ分割／本数少なめ）
   *    ・outline … 文字を縁取りする作り（輪郭を象る／本数多め）
   *    校正の目安：line で「ふたりのWedding」≒19画（ひらがな3×4＋英字1×7）。
   *    実際は書体・デザインで前後するため、表示は必ず「概算」とします。
   */
  strokeWeights: {
    line: {
      latin: 1, // 英字（A〜Z, a〜z）
      digit: 1, // 数字
      hiragana: 3, // ひらがな
      katakana: 2, // カタカナ
      kanji: 5, // 漢字
      symbol: 1, // 記号・その他
    },
    outline: {
      latin: 2,
      digit: 2,
      hiragana: 6,
      katakana: 4,
      kanji: 10,
      symbol: 2,
    },
  },
} as const;

export type PricingConfig = typeof pricingConfig;

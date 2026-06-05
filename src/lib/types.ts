/**
 * 見積もりシミュレーターで使う型定義
 * ─────────────────────────────────
 * UI とロジック（estimate.ts）の双方から参照します。
 */

/** アクリルのサイズ指定方法 */
export type SizeMode = "preset" | "custom";

/** プリセットサイズのキー（pricing.ts の acrylicSizes と一致させる。最小は A3） */
export type PresetSize = "A3" | "A2" | "A1" | "A0";

/** 画数の決め方：auto＝テキストから自動概算 / manual＝手動入力 */
export type StrokeMode = "auto" | "manual";

/** プレビューの書体：round＝丸ゴシック / hand＝手書き風 */
export type NeonFont = "round" | "hand";

/** チューブの作り方：line＝1本ライン / outline＝縁取り */
export type TubeStyle = "line" | "outline";

/** ネオンカラー（料金には影響せず、問い合わせフォームのご希望カラー選択肢に使用） */
export type NeonColor =
  | "white"
  | "red"
  | "blue"
  | "pink"
  | "purple"
  | "yellow"
  | "green"
  | "warm";

/** 使用用途（制作側への情報。料金影響なし。問い合わせフォームの選択肢に使用） */
export type Usage = "wedding" | "shop" | "event" | "interior";

/**
 * 見積もりの入力状態。
 * 料金に影響するのは「サイズ」と「画数」のみ（カラーは見た目／問い合わせ用で料金影響なし）。
 */
export interface EstimateInput {
  sizeMode: SizeMode;
  presetSize: PresetSize;
  /** オリジナルサイズ（cm）。sizeMode === "custom" のとき使用 */
  customWidthCm: number | "";
  customHeightCm: number | "";

  /** ネオンにしたい文字（プレビュー＆画数の自動概算に使用） */
  text: string;
  /** 画数の決め方（auto＝テキストから概算 / manual＝下の strokes を使用） */
  strokeMode: StrokeMode;
  /** 手動指定／画像概算からの画数（strokeMode === "manual" のとき使用） */
  strokes: number;
  /** プレビュー＆ご希望カラー（料金影響なし） */
  color: NeonColor;
  /** プレビューの書体（料金影響なし） */
  font: NeonFont;
  /** チューブの作り方（line＝1本ライン / outline＝縁取り）。画数とプレビューに影響 */
  tubeStyle: TubeStyle;
}

/** 見積もり結果の内訳1行 */
export interface EstimateLine {
  /** 表示ラベル（例: "ネオン制作費"） */
  label: string;
  /** 金額（税抜） */
  amount: number;
  /** 補足説明（例: "13画 / 10画まで込み"） */
  note?: string;
}

/** 見積もり計算の結果 */
export interface EstimateResult {
  lines: EstimateLine[];
  /** 税抜合計 */
  subtotalExTax: number;
  /** 税込合計 */
  totalIncTax: number;
  /** custom サイズを概算で最寄りプリセットに丸めたか */
  estimatedFromCustom: boolean;
  /** 概算の根拠になったサイズ（custom 時に最寄りと判定したプリセット） */
  effectiveSize: PresetSize;
}

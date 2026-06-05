import { pricingConfig } from "@/config/pricing";
import type {
  EstimateInput,
  EstimateResult,
  EstimateLine,
  PresetSize,
  NeonColor,
  Usage,
  TubeStyle,
} from "@/lib/types";

/**
 * 見積もり計算ロジック
 * ────────────────────
 *   合計 = ① ネオン制作料金 + ② アクリル板追加料金 + ③ オプション料金
 *   料金の数値はすべて src/config/pricing.ts から取得します（ここには定数を書きません）。
 */

/** プリセット名の一覧（面積の小さい順。最小は A3） */
const PRESET_ORDER: PresetSize[] = ["A3", "A2", "A1", "A0"];

/** プリセット1枚の面積（mm^2） */
function presetArea(size: PresetSize): number {
  const s = pricingConfig.acrylicSizes[size];
  return s.widthMm * s.heightMm;
}

/**
 * オリジナルサイズ（cm）から、料金の根拠にする最寄りプリセットを決定する。
 * 「そのデザインが収まる最小のプリセット」を選ぶ（小さすぎる板では作れないため）。
 * すべてのプリセットより大きい場合は最大サイズ（A0）を使う。
 */
export function nearestPreset(widthCm: number, heightCm: number): PresetSize {
  const area = widthCm * 10 * (heightCm * 10); // cm → mm に換算して面積
  for (const size of PRESET_ORDER) {
    if (presetArea(size) >= area) return size;
  }
  return PRESET_ORDER[PRESET_ORDER.length - 1];
}

/**
 * ② アクリル板の追加料金。
 *   追加 = max(0, (選択サイズの material − 基準サイズの material) + 選択サイズの processing)
 *   基準サイズ（A3）以下は 0 円。
 */
export function acrylicSurcharge(size: PresetSize): number {
  const ref = pricingConfig.acrylicSizes[pricingConfig.referenceSize];
  const target = pricingConfig.acrylicSizes[size];
  const surcharge = target.material - ref.material + target.processing;
  return Math.max(0, surcharge);
}

/**
 * ① ネオン制作料金（画数による加算込み）。
 *   画数 <= 含み画数 → 基準料金のまま
 *   画数 >  含み画数 → 基準料金 + (画数 − 含み画数) × 1画あたり追加料金
 */
export function neonPrice(strokes: number): number {
  const { basePrice, includedStrokes, extraStrokeFee } = pricingConfig;
  const s = Math.max(0, Math.floor(strokes || 0));
  if (s <= includedStrokes) return basePrice;
  return basePrice + (s - includedStrokes) * extraStrokeFee;
}

/**
 * テキストから「ネオン画数」をおおよそ見積もる（概算）。
 *   文字を1つずつ Unicode 範囲で判定し、作り方（tubeStyle）ごとの重み（pricing.strokeWeights）を合計します。
 *   空白・改行は数えません。書体・デザインで実際は前後するため、表示は必ず「概算」とします。
 */
export function estimateStrokesFromText(
  text: string,
  tubeStyle: TubeStyle = "line",
): number {
  const w = pricingConfig.strokeWeights[tubeStyle];
  let total = 0;
  // [...text] でサロゲートペアを含めコードポイント単位に反復
  for (const ch of text) {
    if (/\s/.test(ch)) continue; // 空白・改行
    const c = ch.codePointAt(0) ?? 0;
    if (ch >= "0" && ch <= "9") total += w.digit;
    else if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")) total += w.latin;
    else if (c >= 0x3040 && c <= 0x309f) total += w.hiragana; // ひらがな
    else if ((c >= 0x30a0 && c <= 0x30ff) || (c >= 0xff66 && c <= 0xff9d))
      total += w.katakana; // カタカナ（半角含む）
    else if ((c >= 0x4e00 && c <= 0x9fff) || (c >= 0x3400 && c <= 0x4dbf))
      total += w.kanji; // 漢字
    else total += w.symbol; // 記号・その他
  }
  return Math.round(total);
}

/**
 * 料金計算・表示に使う「実効画数」。
 *   auto … テキストから概算（estimateStrokesFromText）
 *   manual … 手動指定／画像概算の値（input.strokes）
 */
export function effectiveStrokes(input: EstimateInput): number {
  if (input.strokeMode === "auto")
    return estimateStrokesFromText(input.text, input.tubeStyle);
  return Math.max(0, Math.floor(input.strokes || 0));
}

/**
 * プレビュー用：実際のアクリル板の寸法（mm）と表示ラベルを返す。
 *   preset はサイズ表から、custom は入力 cm から算出（未入力時は基準サイズ）。
 */
export function boardSizeMm(input: EstimateInput): {
  widthMm: number;
  heightMm: number;
  label: string;
} {
  if (input.sizeMode === "custom") {
    const w = typeof input.customWidthCm === "number" ? input.customWidthCm : 0;
    const h = typeof input.customHeightCm === "number" ? input.customHeightCm : 0;
    if (w > 0 && h > 0) {
      return { widthMm: w * 10, heightMm: h * 10, label: `オリジナル ${w}×${h}cm` };
    }
    const ref = pricingConfig.acrylicSizes[pricingConfig.referenceSize];
    return { widthMm: ref.widthMm, heightMm: ref.heightMm, label: ref.label };
  }
  const s = pricingConfig.acrylicSizes[input.presetSize];
  return {
    widthMm: s.widthMm,
    heightMm: s.heightMm,
    label: `${s.label}・約${Math.round(s.widthMm / 10)}×${Math.round(s.heightMm / 10)}cm`,
  };
}

/** 円未満を四捨五入して整数の金額にする */
function yen(n: number): number {
  return Math.round(n);
}

/**
 * 入力内容から見積もり結果（内訳・税抜/税込合計）を組み立てる。
 * リアルタイム表示のため、UI から入力が変わるたびに呼び出します。
 */
export function calcEstimate(input: EstimateInput): EstimateResult {
  const cfg = pricingConfig;
  const lines: EstimateLine[] = [];

  // ── 実際に料金へ使うサイズを決定（custom はプリセットへ丸める） ──
  let effectiveSize: PresetSize;
  let estimatedFromCustom = false;
  if (input.sizeMode === "custom") {
    const w = typeof input.customWidthCm === "number" ? input.customWidthCm : 0;
    const h = typeof input.customHeightCm === "number" ? input.customHeightCm : 0;
    if (w > 0 && h > 0) {
      effectiveSize = nearestPreset(w, h);
      estimatedFromCustom = true;
    } else {
      effectiveSize = cfg.referenceSize; // 未入力時は基準サイズ扱い
    }
  } else {
    effectiveSize = input.presetSize;
  }

  // ── ① ネオン制作料金 ──
  const strokes = effectiveStrokes(input);
  const neon = neonPrice(strokes);
  lines.push({
    label: "ネオン制作費",
    amount: cfg.basePrice,
    note: `基本料金（${cfg.includedStrokes}画まで込み）`,
  });
  if (neon > cfg.basePrice) {
    lines.push({
      label: "追加画数",
      amount: neon - cfg.basePrice,
      note: `${strokes}画（+${strokes - cfg.includedStrokes}画 × ¥${cfg.extraStrokeFee.toLocaleString()}）`,
    });
  }

  // ── ② アクリル板追加料金 ──
  const acrylic = acrylicSurcharge(effectiveSize);
  if (acrylic > 0) {
    lines.push({
      label: "アクリルサイズ変更",
      amount: acrylic,
      note: estimatedFromCustom
        ? `オリジナルサイズ → ${cfg.acrylicSizes[effectiveSize].label}相当で概算`
        : `${cfg.acrylicSizes[effectiveSize].label} サイズ`,
    });
  }

  const subtotalExTax = lines.reduce((sum, l) => sum + l.amount, 0);
  const totalIncTax = yen(subtotalExTax * (1 + cfg.taxRate));

  return {
    lines,
    subtotalExTax,
    totalIncTax,
    estimatedFromCustom,
    effectiveSize,
  };
}

/* ───────── 表示用ラベル ───────── */

export function colorLabel(c: NeonColor): string {
  return {
    white: "ホワイト",
    red: "レッド",
    blue: "ブルー",
    pink: "ピンク",
    purple: "パープル",
    yellow: "イエロー",
    green: "グリーン",
    warm: "電球色",
  }[c];
}

export function usageLabel(u: Usage): string {
  return {
    wedding: "結婚式",
    shop: "店舗看板",
    event: "イベント",
    interior: "インテリア",
  }[u];
}

export function sizeLabel(input: EstimateInput): string {
  if (input.sizeMode === "custom") {
    const w = input.customWidthCm || "—";
    const h = input.customHeightCm || "—";
    return `オリジナル（横${w}cm × 高さ${h}cm）`;
  }
  return pricingConfig.acrylicSizes[input.presetSize].label;
}

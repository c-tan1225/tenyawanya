import type { EstimateInput, EstimateResult } from "@/lib/types";
import { sizeLabel, usageLabel, colorLabel, effectiveStrokes } from "@/lib/estimate";
import { formatYen } from "@/lib/format";

/**
 * 見積もり内容を、制作側がそのまま確認できるテキストへ整形する。
 *   問い合わせメール本文や、フォームのプレビューに使用します。
 */
export function buildEstimateSummary(
  input: EstimateInput,
  result: EstimateResult,
): string {
  const lines: string[] = [
    "■ ご希望のネオン内容（見積もりシミュレーターより）",
    `・サイズ：${sizeLabel(input)}`,
  ];
  if (input.text.trim()) {
    // 改行は半角スラッシュに置き換えて1行に
    lines.push(`・文字内容：${input.text.replace(/\n/g, " / ")}`);
  }
  lines.push(`・カラー：${colorLabel(input.color)}`);
  lines.push(`・書体（イメージ）：${input.font === "hand" ? "手書き風" : "丸ゴシック"}`);
  lines.push(
    `・作り方：${input.tubeStyle === "outline" ? "縁取り" : "1本ライン"}（チューブ約6mm）`,
  );
  lines.push(
    `・ネオン画数：約${effectiveStrokes(input)}画（自動概算${
      input.strokeMode === "manual" ? "・手動調整あり" : ""
    }）`,
  );

  lines.push("", "■ 概算お見積り（税抜）");
  for (const line of result.lines) {
    lines.push(`・${line.label}：${formatYen(line.amount)}`);
  }
  lines.push(
    "──────────",
    `概算合計：${formatYen(result.totalIncTax)}（税込） ／ ${formatYen(
      result.subtotalExTax,
    )}（税抜）`,
    "※表示は概算です。アクリル形状・デザイン内容により最終金額が変わる場合があります。送料は別途。",
  );

  return lines.join("\n");
}

/** 用途を日本語で取得（フォームの初期表示用） */
export { usageLabel };

/** 金額・数値の整形ヘルパー */

/** 円表記（例: 24800 → "¥24,800"） */
export function formatYen(n: number): string {
  return `¥${Math.round(n).toLocaleString("ja-JP")}`;
}

/** 符号付きの追加額（例: 3000 → "+¥3,000"） */
export function formatPlusYen(n: number): string {
  return `+${formatYen(n)}`;
}

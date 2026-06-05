/**
 * 見積もりロジックの単体テスト
 * ───────────────────────────
 *   フレームワーク不要。`npm test`（tsx 実行）で動きます。
 *   料金設定（pricing.ts）を変えた場合は期待値も合わせて見直してください。
 */
import { pricingConfig } from "@/config/pricing";
import {
  neonPrice,
  acrylicSurcharge,
  nearestPreset,
  estimateStrokesFromText,
  effectiveStrokes,
  boardSizeMm,
  calcEstimate,
} from "@/lib/estimate";
import type { EstimateInput } from "@/lib/types";

let passed = 0;
let failed = 0;

function eq(name: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.error(`  ✗ ${name}\n      期待: ${expected}\n      実際: ${actual}`);
  }
}

/** 手動画数のテスト用に共通の素体を作る */
function manual(partial: Partial<EstimateInput>): EstimateInput {
  return {
    sizeMode: "preset",
    presetSize: "A3",
    customWidthCm: "",
    customHeightCm: "",
    text: "",
    strokeMode: "manual",
    strokes: 0,
    color: "pink",
    font: "round",
    tubeStyle: "line",
    orientation: "landscape",
    ...partial,
  };
}

console.log("① ネオン制作料金");
eq("10画ちょうど = 基本料金", neonPrice(10), 24800);
eq("8画（10画以内）= 基本料金", neonPrice(8), 24800);
eq("13画 = 基本 + 3画×1,500", neonPrice(13), 24800 + 3 * 1500); // 29300

console.log("② アクリル板追加料金（最小=A3）");
eq("A3（基準）= 0", acrylicSurcharge("A3"), 0);
eq("A2 = 差額1,600 + 加工1,500", acrylicSurcharge("A2"), 3100);
eq("A1 = 差額4,300 + 加工3,000", acrylicSurcharge("A1"), 7300);
eq("A0 = 差額9,800 + 加工5,000", acrylicSurcharge("A0"), 14800);

console.log("オリジナルサイズ → 最寄りプリセット（最小=A3）");
eq("10×10cm でも最小の A3", nearestPreset(10, 10), "A3");
eq("40×30cm は A3 相当", nearestPreset(40, 30), "A3");
eq("55×40cm は A2 相当", nearestPreset(55, 40), "A2");
eq("巨大サイズは A0 で頭打ち", nearestPreset(200, 200), "A0");

console.log("③ テキストからの画数概算（line / outline）");
const wl = pricingConfig.strokeWeights.line;
const wo = pricingConfig.strokeWeights.outline;
eq("line 英字3字 ABC", estimateStrokesFromText("ABC", "line"), 3 * wl.latin);
eq("line ひらがな2字 あい", estimateStrokesFromText("あい", "line"), 2 * wl.hiragana);
eq("空白・改行は数えない", estimateStrokesFromText("A B\nC", "line"), 3 * wl.latin);
eq(
  "校正：line「ふたりのWedding」= 19",
  estimateStrokesFromText("ふたりのWedding", "line"),
  4 * wl.hiragana + 7 * wl.latin,
);
eq("19 であること", estimateStrokesFromText("ふたりのWedding", "line"), 19);
eq("outline は line より多い", estimateStrokesFromText("あ", "outline"), wo.hiragana);
eq("空文字は 0", estimateStrokesFromText("", "line"), 0);

console.log("effectiveStrokes（auto / manual / tubeStyle連動）");
eq(
  "auto・line はテキストから",
  effectiveStrokes(manual({ strokeMode: "auto", text: "ABC", tubeStyle: "line" })),
  3 * wl.latin,
);
eq(
  "auto・outline は重みが変わる",
  effectiveStrokes(manual({ strokeMode: "auto", text: "ABC", tubeStyle: "outline" })),
  3 * wo.latin,
);
eq("manual は strokes をそのまま", effectiveStrokes(manual({ strokes: 14 })), 14);

console.log("④ 合計（手動画数 / A2 + 13画）");
const r = calcEstimate(manual({ presetSize: "A2", strokes: 13 }));
// neon 29,300 + acrylic 3,100 = 税抜 32,400 / 税込 35,640
eq("税抜合計 = 32,400", r.subtotalExTax, 32400);
eq("税込合計 = 35,640", r.totalIncTax, 35640);
eq("内訳は3行（基本・追加画数・サイズ）", r.lines.length, 3);

console.log("板の向き（orientation）");
{
  const land = boardSizeMm(manual({ presetSize: "A3", orientation: "landscape" }));
  const port = boardSizeMm(manual({ presetSize: "A3", orientation: "portrait" }));
  eq("横置き A3 = 420×297", [land.widthMm, land.heightMm], [420, 297]);
  eq("縦置き A3 = 297×420（入れ替え）", [port.widthMm, port.heightMm], [297, 420]);
  // 向きで料金は変わらない
  const pl = calcEstimate(manual({ presetSize: "A2", strokes: 13, orientation: "landscape" }));
  const pp = calcEstimate(manual({ presetSize: "A2", strokes: 13, orientation: "portrait" }));
  eq("向きで税込合計は不変", pl.totalIncTax, pp.totalIncTax);
}

console.log("⑤ 合計（auto・line：英字12字=12画 / A3）");
const auto = calcEstimate(
  manual({ strokeMode: "auto", text: "ABCDEFGHIJKL", tubeStyle: "line" }),
);
// 12画 → 24,800 + (12-10)*1,500 = 27,800
eq("auto 税抜 = 27,800", auto.subtotalExTax, 24800 + 2 * 1500);

console.log("最小構成（A3・10画以内）");
const m = calcEstimate(manual({ strokes: 6 }));
eq("最小構成の税抜 = 基本料金のみ", m.subtotalExTax, pricingConfig.basePrice);
eq("最小構成の税込 = 27,280", m.totalIncTax, Math.round(pricingConfig.basePrice * 1.1));
eq("最小構成は内訳1行のみ", m.lines.length, 1);

console.log("オリジナルサイズ（cm自由入力）");
const c = calcEstimate(
  manual({ sizeMode: "custom", customWidthCm: 55, customHeightCm: 40, strokes: 8 }),
);
eq("custom は最寄りプリセットで概算", c.estimatedFromCustom, true);
eq("custom A2相当 → 税抜 24,800 + 3,100", c.subtotalExTax, 24800 + 3100);

console.log("\n――――――――――――――――――――");
console.log(`結果: ${passed} 件成功 / ${failed} 件失敗`);
if (failed > 0) process.exit(1);

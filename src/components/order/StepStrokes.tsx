"use client";

import { useState } from "react";
import Link from "next/link";
import { useEstimate } from "@/context/EstimateContext";
import { pricingConfig } from "@/config/pricing";
import { neonPrice, effectiveStrokes, colorLabel, boardSizeMm } from "@/lib/estimate";
import { neonHex, neonColorOrder } from "@/lib/colors";
import { loadImageFromFile, estimateStrokesFromImage } from "@/lib/imageStrokes";
import { StepHeading } from "./Choice";
import { NeonPreview, neonFontLabel, neonFontStack } from "@/components/ui/NeonPreview";
import type { NeonFont, TubeStyle, Orientation } from "@/lib/types";
import { formatPlusYen } from "@/lib/format";

/**
 * STEP：文字・デザイン
 *   ・カラーを選ぶ
 *   ・文字を入力 → ネオンプレビュー＆画数を自動概算
 *   ・ロゴ/イラスト画像から画数を概算（任意）
 *   ・必要なら画数を手動で微調整
 */
type ImgState = {
  status: "idle" | "loading" | "done" | "error";
  value?: number;
  name?: string;
};

export function StepStrokes() {
  const { input, update } = useEstimate();
  const { includedStrokes, basePrice, referenceSize, tubeWidthMm } = pricingConfig;
  const [img, setImg] = useState<ImgState>({ status: "idle" });
  const [showImage, setShowImage] = useState(false);

  const board = boardSizeMm(input);
  const eff = effectiveStrokes(input);
  const extra = Math.max(0, neonPrice(eff) - basePrice);
  const isAuto = input.strokeMode === "auto";

  // 動的アドバイス：画数が多め × 最小サイズ(A3) のとき
  const advise =
    eff > includedStrokes &&
    input.sizeMode === "preset" &&
    input.presetSize === referenceSize;

  const setManual = (n: number) =>
    update({ strokeMode: "manual", strokes: Math.max(1, Math.min(300, n)) });

  async function onPickImage(file: File | null) {
    if (!file) return;
    setImg({ status: "loading", name: file.name });
    try {
      const image = await loadImageFromFile(file);
      // ローディング表示を一度描画させてから重い解析
      await new Promise((r) => setTimeout(r, 30));
      const n = estimateStrokesFromImage(image);
      setImg({ status: "done", value: n, name: file.name });
    } catch {
      setImg({ status: "error" });
    }
  }

  return (
    <div>
      <StepHeading
        step="02"
        title="文字を入力してプレビュー"
        hint="ネオンにしたい文字を入力すると、その場でプレビューと概算の画数が出ます。数えるのが難しい「画数」も自動で計算します。"
      />

      {/* カラー選択 */}
      <div className="mb-4">
        <p className="mb-2 font-round text-[13px] font-bold text-ink/70">
          カラー（プレビュー・ご希望色）
        </p>
        <div className="flex flex-wrap gap-2.5">
          {neonColorOrder.map((c) => {
            const selected = input.color === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => update({ color: c })}
                aria-label={colorLabel(c)}
                aria-pressed={selected}
                className={`h-9 w-9 rounded-full ring-1 ring-ink/15 transition-all ${
                  selected ? "scale-110 ring-2 ring-ink ring-offset-2" : "hover:scale-105"
                }`}
                style={{
                  backgroundColor: neonHex[c],
                  boxShadow: selected ? `0 0 12px ${neonHex[c]}` : undefined,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 書体選択 */}
      <div className="mb-4">
        <p className="mb-2 font-round text-[13px] font-bold text-ink/70">書体</p>
        <div className="grid grid-cols-2 gap-2.5">
          {(["round", "hand"] as NeonFont[]).map((f) => {
            const selected = input.font === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => update({ font: f })}
                aria-pressed={selected}
                className={`rounded-2xl px-4 py-3 text-center transition-all ${
                  selected
                    ? "bg-cream-soft shadow-soft ring-[1.5px] ring-ink"
                    : "bg-cream-soft/70 ring-1 ring-ink/[0.08] hover:ring-ink/25"
                }`}
                style={{ fontFamily: neonFontStack[f] }}
              >
                <span className="text-lg font-bold text-ink">{neonFontLabel[f]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* チューブの作り方 */}
      <div className="mb-4">
        <p className="mb-2 font-round text-[13px] font-bold text-ink/70">
          作り方（チューブ太さ実寸{tubeWidthMm}mm）
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {(
            [
              { key: "line", title: "1本ライン", desc: "文字を1本の線で。すっきり" },
              { key: "outline", title: "縁取り", desc: "輪郭を象る。存在感" },
            ] as { key: TubeStyle; title: string; desc: string }[]
          ).map((s) => {
            const selected = input.tubeStyle === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => update({ tubeStyle: s.key })}
                aria-pressed={selected}
                className={`rounded-2xl px-4 py-3 text-left transition-all ${
                  selected
                    ? "bg-cream-soft shadow-soft ring-[1.5px] ring-ink"
                    : "bg-cream-soft/70 ring-1 ring-ink/[0.08] hover:ring-ink/25"
                }`}
              >
                <span className="block font-round text-[15px] font-bold text-ink">
                  {s.title}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-ink/55">
                  {s.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 板の向き（横置き / 縦置き） */}
      <div className="mb-4">
        <p className="mb-2 font-round text-[13px] font-bold text-ink/70">向き</p>
        <div className="grid grid-cols-2 gap-2.5">
          {(
            [
              { key: "landscape", title: "横置き", w: 22, h: 15 },
              { key: "portrait", title: "縦置き", w: 15, h: 22 },
            ] as { key: Orientation; title: string; w: number; h: number }[]
          ).map((o) => {
            const selected = input.orientation === o.key;
            return (
              <button
                key={o.key}
                type="button"
                onClick={() => update({ orientation: o.key })}
                aria-pressed={selected}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                  selected
                    ? "bg-cream-soft shadow-soft ring-[1.5px] ring-ink"
                    : "bg-cream-soft/70 ring-1 ring-ink/[0.08] hover:ring-ink/25"
                }`}
              >
                <span
                  className={`shrink-0 rounded-[3px] ${selected ? "bg-ink" : "bg-ink/30"}`}
                  style={{ width: o.w, height: o.h }}
                  aria-hidden
                />
                <span className="font-round text-[15px] font-bold text-ink">
                  {o.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ライブプレビュー（アクリル板の形・サイズ・太さを反映） */}
      <NeonPreview
        text={input.text}
        color={input.color}
        font={input.font}
        tubeStyle={input.tubeStyle}
        widthMm={board.widthMm}
        heightMm={board.heightMm}
        tubeWidthMm={tubeWidthMm}
        sizeLabel={board.label}
        className="mb-5"
      />

      {/* テキスト入力 */}
      <label className="block">
        <span className="mb-2 block font-round text-[13px] font-bold text-ink/70">
          文字・言葉を入力
        </span>
        <textarea
          value={input.text}
          onChange={(e) => update({ text: e.target.value })}
          rows={3}
          enterKeyHint="enter"
          placeholder="例）Happy Wedding ／ ふたりの名前 ／ 好きな言葉 など（改行＝Enterでプレビューも改行）"
          className="w-full whitespace-pre-wrap rounded-2xl bg-cream-soft px-4 py-3.5 font-sans text-sm text-ink outline-none ring-1 ring-ink/12 transition-shadow focus:ring-2 focus:ring-ink/40"
        />
      </label>

      {/* 画像から概算（任意） */}
      <div className="mt-3">
        <button
          type="button"
          onClick={() => setShowImage((v) => !v)}
          className="text-[13px] font-bold text-ink/55 underline underline-offset-4 transition-colors hover:text-ink"
        >
          ロゴ・イラスト画像から画数を概算する {showImage ? "▲" : "▼"}
        </button>

        {showImage && (
          <div className="mt-3 animate-fade-up rounded-2xl bg-cream-deep/50 p-5 ring-1 ring-ink/[0.06]">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-ink/20 bg-cream-soft px-4 py-6 text-center transition-colors hover:border-ink/45">
              <span className="text-xl">🖼️</span>
              <span className="text-sm font-bold text-ink/70">
                {img.status === "loading"
                  ? "解析中…"
                  : img.name
                    ? img.name
                    : "画像を選んで画数を概算"}
              </span>
              <span className="text-[11px] text-ink/45">
                白地に黒線などクリーンな線画ほど正確です（JPG / PNG）
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onPickImage(e.target.files?.[0] ?? null)}
              />
            </label>

            {img.status === "done" && img.value !== undefined && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-ink/70">
                  概算画数：
                  <span className="font-round text-lg font-bold text-ink">
                    {img.value}画
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setManual(img.value!)}
                  className="rounded-pill bg-ink px-4 py-2 font-round text-xs font-bold text-cream"
                >
                  この画数を使う →
                </button>
              </div>
            )}
            {img.status === "error" && (
              <p className="mt-3 text-sm text-ink/60">
                うまく解析できませんでした。別の画像か、手動入力をお試しください。
              </p>
            )}
            <p className="mt-3 text-[11px] leading-relaxed text-ink/45">
              ※ 交差する線を数えて分割する仕組みで「概算」します。写真や複雑なイラストは精度が落ちます。最終的な画数は制作時に確定します。
            </p>
          </div>
        )}
      </div>

      {/* 画数の説明 */}
      <div className="mt-5 rounded-2xl bg-cream-deep/50 p-5 text-sm leading-[1.9] text-ink/65 ring-1 ring-ink/[0.06]">
        <p className="mb-1.5 font-round font-bold text-ink/80">「画数」とは？</p>
        <p>
          ネオンチューブは線が交わる所で分けて作るため、
          <span className="font-bold text-ink">チューブ1本＝1画</span>{" "}
          として数えます（例：文字の「あ」は通常3画でもネオンでは約8画）。
          {includedStrokes}画までは基本料金（¥{basePrice.toLocaleString()}）に含まれます。
        </p>
      </div>

      {/* 画数の結果＋微調整 */}
      <div className="mt-5 rounded-3xl bg-cream-deep/40 p-6 ring-1 ring-ink/[0.06]">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/40">
              {isAuto ? "Auto estimate" : "Manual"}
            </p>
            <p className="mt-1 font-round text-3xl font-extrabold tracking-tight text-ink">
              {eff}
              <span className="ml-1 text-sm font-bold text-ink/50">画</span>
              <span className="ml-2 align-middle text-xs font-normal text-ink/45">
                （概算）
              </span>
            </p>
          </div>

          {isAuto ? (
            <button
              type="button"
              onClick={() => update({ strokeMode: "manual", strokes: eff })}
              className="rounded-pill px-4 py-2 font-round text-xs font-bold text-ink/65 ring-1 ring-ink/15 transition-colors hover:text-ink hover:ring-ink/35"
            >
              手動で調整
            </button>
          ) : (
            <button
              type="button"
              onClick={() => update({ strokeMode: "auto" })}
              className="rounded-pill px-4 py-2 font-round text-xs font-bold text-ink/65 ring-1 ring-ink/15 transition-colors hover:text-ink hover:ring-ink/35"
            >
              テキストから自動に戻す
            </button>
          )}
        </div>

        {/* 手動ステッパー */}
        {!isAuto && (
          <div className="mt-5 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => setManual(input.strokes - 1)}
              aria-label="画数を減らす"
              className="grid h-11 w-11 place-items-center rounded-pill text-xl font-bold text-ink ring-1 ring-ink/15 transition-all hover:ring-ink/40 active:scale-95"
            >
              −
            </button>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={300}
              value={input.strokes}
              onChange={(e) => setManual(Number(e.target.value) || 1)}
              className="w-20 bg-transparent text-center font-round text-4xl font-extrabold tracking-tight text-ink outline-none"
            />
            <button
              type="button"
              onClick={() => setManual(input.strokes + 1)}
              aria-label="画数を増やす"
              className="grid h-11 w-11 place-items-center rounded-pill text-xl font-bold text-ink ring-1 ring-ink/15 transition-all hover:ring-ink/40 active:scale-95"
            >
              ＋
            </button>
          </div>
        )}

        {/* 追加料金 */}
        <p className="mt-4 text-center text-sm">
          {extra > 0 ? (
            <span className="text-ink/65">
              {includedStrokes}画を超えた{eff - includedStrokes}画ぶん{" "}
              <span className="font-bold text-ink">{formatPlusYen(extra)}</span>
            </span>
          ) : (
            <span className="font-bold text-ink/70">基本料金に含まれます（追加なし）</span>
          )}
        </p>
      </div>

      {/* サイズと複雑さのアドバイス */}
      {advise && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-neon-yellow/10 px-4 py-3 text-[13px] leading-[1.8] text-ink/70 ring-1 ring-neon-yellow/30">
          <span aria-hidden className="mt-px shrink-0">
            💡
          </span>
          画数が多めです。最小のA3サイズでは細かい部分の再現が難しい場合があります。きれいに仕上げるには
          <span className="font-bold">A2以上</span>のサイズもご検討ください。
        </p>
      )}

      {/* 自由なデザインもOK：問い合わせ導線 */}
      <Link
        href="/contact"
        className="group mt-5 flex items-center gap-3 rounded-3xl bg-night p-5 text-cream shadow-soft ring-1 ring-ink/10 transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-lift"
      >
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-lg"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          aria-hidden
        >
          ✦
        </span>
        <span className="flex-1">
          <span className="block font-round text-[15px] font-bold">
            もっと自由なデザインも作れます
          </span>
          <span className="mt-0.5 block text-[12px] leading-[1.7] text-cream/65">
            ロゴ・イラスト・複雑な形・好きなレイアウトもOK。イメージや手描きラフからご相談ください。
          </span>
        </span>
        <span className="font-round text-cream/60 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}

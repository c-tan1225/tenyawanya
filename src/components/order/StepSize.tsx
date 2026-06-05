"use client";

import { useEstimate } from "@/context/EstimateContext";
import { pricingConfig } from "@/config/pricing";
import { acrylicSurcharge, nearestPreset } from "@/lib/estimate";
import type { PresetSize } from "@/lib/types";
import { StepHeading, ChoiceGrid, ChoiceCard } from "./Choice";
import { neonHex } from "@/lib/colors";

/**
 * STEP：サイズ
 *   プリセット（A4〜A0）か、オリジナルサイズ（横cm×高さcm）かを選びます。
 *   プリセットと数値入力は排他。オリジナルは面積から最寄りサイズで概算します。
 */
const presets: PresetSize[] = ["A3", "A2", "A1", "A0"];

export function StepSize() {
  const { input, update } = useEstimate();

  // オリジナル入力時の概算追加料金
  const w = typeof input.customWidthCm === "number" ? input.customWidthCm : 0;
  const h = typeof input.customHeightCm === "number" ? input.customHeightCm : 0;
  const customSurcharge =
    w > 0 && h > 0 ? acrylicSurcharge(nearestPreset(w, h)) : undefined;

  return (
    <div>
      <StepHeading
        step="01"
        title="サイズを選ぶ"
        hint="最小サイズは A3 です。A3 は基本料金に含まれ、大きくなるぶんだけ追加になります。"
      />

      <ChoiceGrid cols={3}>
        {presets.map((size) => {
          const s = pricingConfig.acrylicSizes[size];
          const isMin = size === pricingConfig.referenceSize;
          return (
            <ChoiceCard
              key={size}
              label={s.label}
              description={`約 ${Math.round(s.widthMm / 10)}×${Math.round(
                s.heightMm / 10,
              )}cm${isMin ? "・最小" : ""}`}
              priceDelta={acrylicSurcharge(size)}
              selected={input.sizeMode === "preset" && input.presetSize === size}
              onSelect={() => update({ sizeMode: "preset", presetSize: size })}
              accent={neonHex.blue}
            />
          );
        })}

        {/* オリジナルサイズ */}
        <ChoiceCard
          label="オリジナル"
          description="横・高さを自由に入力"
          selected={input.sizeMode === "custom"}
          onSelect={() => update({ sizeMode: "custom" })}
          accent={neonHex.purple}
        />
      </ChoiceGrid>

      {/* オリジナルサイズの入力欄 */}
      {input.sizeMode === "custom" && (
        <div className="mt-5 animate-fade-up rounded-3xl bg-cream-deep/50 p-6 ring-1 ring-ink/[0.06]">
          <p className="mb-4 font-round text-sm font-bold text-ink/80">
            仕上がりサイズ（cm）
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex-1">
              <span className="mb-1.5 block text-xs text-ink/50">横幅</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={input.customWidthCm}
                  onChange={(e) =>
                    update({
                      customWidthCm: e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  className="w-full rounded-2xl bg-cream-soft px-4 py-3 text-center font-round text-lg font-bold text-ink outline-none ring-1 ring-ink/12 transition-shadow focus:ring-2 focus:ring-ink/40"
                  placeholder="40"
                />
                <span className="text-sm text-ink/45">cm</span>
              </div>
            </label>
            <span className="pb-3 text-lg text-ink/30">×</span>
            <label className="flex-1">
              <span className="mb-1.5 block text-xs text-ink/50">高さ</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={input.customHeightCm}
                  onChange={(e) =>
                    update({
                      customHeightCm: e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  className="w-full rounded-2xl bg-cream-soft px-4 py-3 text-center font-round text-lg font-bold text-ink outline-none ring-1 ring-ink/12 transition-shadow focus:ring-2 focus:ring-ink/40"
                  placeholder="30"
                />
                <span className="text-sm text-ink/45">cm</span>
              </div>
            </label>
          </div>
          {customSurcharge !== undefined && (
            <p className="mt-4 text-sm text-ink/60">
              面積から
              <span className="font-bold text-ink">
                {" "}
                {pricingConfig.acrylicSizes[nearestPreset(w, h)].label}相当{" "}
              </span>
              として概算 →{" "}
              <span className="font-bold text-ink">
                アクリル追加 {customSurcharge > 0 ? `+¥${customSurcharge.toLocaleString()}` : "なし"}
              </span>
            </p>
          )}
        </div>
      )}

      {/* サイズと複雑さの注意 */}
      <p className="mt-5 flex items-start gap-2 rounded-2xl bg-cream-deep/50 px-4 py-3 text-[13px] leading-[1.8] text-ink/60 ring-1 ring-ink/[0.06]">
        <span aria-hidden className="mt-px shrink-0 text-ink/40">
          ⓘ
        </span>
        サイズが小さいほど、細かいデザインや画数の多い文字は再現が難しくなります。複雑なデザイン・画数多めのご希望は、大きめのサイズがおすすめです。
      </p>
    </div>
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { EstimateInput, EstimateResult } from "@/lib/types";
import { calcEstimate } from "@/lib/estimate";
import { pricingConfig } from "@/config/pricing";

/**
 * 見積もり状態のグローバル保持
 * ────────────────────────────
 *  ORDER ページでの入力を localStorage に保存し、
 *  CONTACT ページでも同じ内容を引き継げるようにします。
 *  外部の状態管理ライブラリは使わず、React Context のみで完結。
 */

/** 見積もりの初期値 */
export const defaultEstimateInput: EstimateInput = {
  sizeMode: "preset",
  presetSize: "A3",
  customWidthCm: "",
  customHeightCm: "",
  text: "",
  strokeMode: "auto",
  strokes: 8,
  color: "pink",
  font: "round",
  tubeStyle: "line",
};

const STORAGE_KEY = "tenya-wanya:estimate";

interface EstimateContextValue {
  input: EstimateInput;
  /** 部分更新（変更したいキーだけ渡す） */
  update: (patch: Partial<EstimateInput>) => void;
  /** 初期状態へ戻す */
  reset: () => void;
  /** 入力から算出した見積もり結果（リアルタイム） */
  result: EstimateResult;
  /** localStorage からの復元が完了したか（ハイドレーション対策） */
  hydrated: boolean;
}

const EstimateContext = createContext<EstimateContextValue | null>(null);

export function EstimateProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<EstimateInput>(defaultEstimateInput);
  const [hydrated, setHydrated] = useState(false);

  // 初回マウント時に localStorage から復元
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<EstimateInput>;
        const merged = { ...defaultEstimateInput, ...parsed };
        // 旧データ対策：廃止した A4 など未知のサイズは最小サイズに戻す
        if (!(merged.presetSize in pricingConfig.acrylicSizes)) {
          merged.presetSize = defaultEstimateInput.presetSize;
        }
        setInput(merged);
      }
    } catch {
      // 壊れたデータは無視して初期値のまま
    }
    setHydrated(true);
  }, []);

  // 変更のたびに保存
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
    } catch {
      // 保存不可（プライベートモード等）でも動作は継続
    }
  }, [input, hydrated]);

  const update = (patch: Partial<EstimateInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  const reset = () => setInput(defaultEstimateInput);

  const result = useMemo(() => calcEstimate(input), [input]);

  const value: EstimateContextValue = {
    input,
    update,
    reset,
    result,
    hydrated,
  };

  return (
    <EstimateContext.Provider value={value}>{children}</EstimateContext.Provider>
  );
}

/** 見積もり状態を読み書きするフック */
export function useEstimate(): EstimateContextValue {
  const ctx = useContext(EstimateContext);
  if (!ctx) {
    throw new Error("useEstimate は EstimateProvider の内側で使用してください");
  }
  return ctx;
}

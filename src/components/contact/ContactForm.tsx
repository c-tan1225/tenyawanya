"use client";

import { useState, type FormEvent } from "react";
import { useEstimate } from "@/context/EstimateContext";
import { buildEstimateSummary } from "@/lib/summary";
import { formatYen } from "@/lib/format";
import { formspreeEndpoint, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

/**
 * 問い合わせフォーム。
 *   ORDER で入力した見積もり内容（EstimateContext）を引き継いで初期表示し、
 *   Formspree へ送信します（画像添付対応）。
 *   formspreeId 未設定時は送信せず、内容のプレビューのみ表示します。
 */
type Status = "idle" | "submitting" | "success" | "error" | "preview";

export function ContactForm() {
  const { input, result, hydrated } = useEstimate();
  const [status, setStatus] = useState<Status>("idle");
  const [includeEstimate, setIncludeEstimate] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // 見積もり内容のテキスト（メール本文・プレビュー用）
  const summary = buildEstimateSummary(input, result);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);

    // 見積もり内容をまとめて本文へ
    if (includeEstimate) {
      data.set("見積もり内容", summary);
      data.set("概算合計（税込）", formatYen(result.totalIncTax));
    }
    if (file) data.set("添付画像", file);

    // Formspree 未設定ならプレビュー表示のみ
    if (!formspreeEndpoint) {
      setStatus("preview");
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setFile(null);
      } else {
        const json = await res.json().catch(() => null);
        setErrorMsg(json?.errors?.[0]?.message ?? "送信に失敗しました。");
        setStatus("error");
      }
    } catch {
      setErrorMsg("通信エラーが発生しました。時間をおいて再度お試しください。");
      setStatus("error");
    }
  }

  // 送信完了画面
  if (status === "success") {
    return (
      <div className="rounded-3xl bg-cream-soft p-10 text-center shadow-lift ring-1 ring-ink/[0.06]">
        <p className="text-3xl">🎉</p>
        <h3 className="mt-3 font-round text-xl font-bold text-ink">
          お問い合わせありがとうございます！
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">
          内容を確認のうえ、数日以内にご返信いたします。
          <br />
          お急ぎの場合は Instagram のDMもご利用ください。
        </p>
        <Button href="/" variant="outline" className="mt-6">
          ホームへ戻る
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* 引き継いだ見積もり内容 */}
      {hydrated && (
        <fieldset className="rounded-3xl bg-cream-deep/50 p-6 ring-1 ring-ink/[0.06]">
          <legend className="px-2 font-display text-[11px] font-semibold uppercase tracking-eyebrow text-ink/45">
            From your estimate
          </legend>
          <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap font-sans text-xs leading-[1.8] text-ink/65">
            {summary}
          </pre>
          <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-ink/70">
            <input
              type="checkbox"
              checked={includeEstimate}
              onChange={(e) => setIncludeEstimate(e.target.checked)}
              className="h-4 w-4 accent-ink"
            />
            この見積もり内容を一緒に送る
          </label>
        </fieldset>
      )}

      {/* 基本項目 */}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="お名前" required>
          <input
            name="お名前"
            required
            autoComplete="name"
            className={inputCls}
            placeholder="山田 はなこ"
          />
        </Field>
        <Field label="メールアドレス" required>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            placeholder="hello@example.com"
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="ご用途">
          <select name="ご用途" defaultValue="結婚式" className={inputCls}>
            {["結婚式", "店舗看板", "イベント", "インテリア", "その他"].map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </Field>
        <Field label="ご希望カラー（任意）">
          <select name="ご希望カラー" defaultValue="おまかせ・未定" className={inputCls}>
            {[
              "おまかせ・未定",
              "ホワイト",
              "レッド",
              "ブルー",
              "ピンク",
              "パープル",
              "イエロー",
              "グリーン",
              "電球色",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="ご相談・ご希望内容" required>
        <textarea
          name="メッセージ"
          required
          rows={5}
          className={inputCls}
          placeholder="作りたいネオンのイメージ（言葉・色・飾る場所・ご希望の納期など）を、わかる範囲でお書きください。ご相談だけでも大歓迎です。"
        />
      </Field>

      {/* 画像アップロード */}
      <Field label="デザインデータ・参考画像（任意）">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 bg-cream-soft px-4 py-9 text-center transition-colors hover:border-ink/45">
          <span className="text-2xl">🖼️</span>
          <span className="text-sm font-bold text-ink/70">
            {file ? file.name : "画像・ロゴデータをアップロード"}
          </span>
          <span className="text-xs text-ink/45">
            手書きラフ、ロゴ、参考写真など（JPG / PNG / PDF など）
          </span>
          <input
            type="file"
            accept="image/*,.pdf,.ai,.svg"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </Field>

      {/* 送信 */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "送信中…" : "この内容で問い合わせる"}
        </Button>
        <p className="mt-3 text-center text-xs text-ink/50">
          送信いただいた内容は、お問い合わせ対応の目的のみに使用します。
        </p>
      </div>

      {/* エラー表示 */}
      {status === "error" && (
        <p className="rounded-2xl bg-cream-soft px-4 py-3.5 text-center text-sm text-ink ring-1 ring-neon-pink/30">
          {errorMsg}　お手数ですが {siteConfig.instagram.handle} のDMでもご連絡いただけます。
        </p>
      )}

      {/* Formspree 未設定時のプレビュー */}
      {status === "preview" && (
        <div className="rounded-2xl bg-cream-deep/60 px-5 py-4 text-sm text-ink ring-1 ring-ink/[0.06]">
          <p className="font-bold">送信先が未設定のため、内容のプレビューを表示しています。</p>
          <p className="mt-1 text-ink/55">
            （公開時は <code className="font-mono">src/config/site.ts</code> の{" "}
            <code className="font-mono">formspreeId</code> を設定してください）
          </p>
        </div>
      )}
    </form>
  );
}

/** 入力欄の共通スタイル */
const inputCls =
  "w-full rounded-2xl bg-cream-soft px-4 py-3.5 font-sans text-sm text-ink outline-none ring-1 ring-ink/12 transition-shadow focus:ring-2 focus:ring-ink/40";

/** ラベル付きフィールド */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-round text-[13px] font-bold text-ink/70">
        {label}
        {required && <span className="ml-1 text-neon-pink">*</span>}
      </span>
      {children}
    </label>
  );
}

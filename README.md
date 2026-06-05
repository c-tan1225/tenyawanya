# てんヤわんヤ 公式サイト

ハンドメイドLEDネオンサイン制作ブランド **「てんヤわんヤ」** の公式サイトです。
Next.js（App Router）＋ TypeScript ＋ Tailwind CSS で構築しています。

中核は **ORDER ページの「見積もりシミュレーター」**。お客様が希望内容を
ステップ形式で入力するとリアルタイムで概算料金が変わり、その内容を保持したまま
問い合わせフォームへ送信できます。

---

## 必要環境

- **Node.js 18 以上**（推奨 20 以上）
- npm（Node 同梱）

> Node がまだ入っていない場合は <https://nodejs.org/ja> から LTS 版をインストールしてください。
> （Mac で Homebrew をお使いなら `brew install node` でも可）

## 起動方法

```bash
# プロジェクト直下で
npm install      # 依存パッケージをインストール
npm run dev      # 開発サーバー起動 → http://localhost:3000
```

本番ビルド・確認:

```bash
npm run build    # 本番ビルド（型チェック込み）
npm start        # ビルド結果を起動
```

見積もりロジックの単体テスト:

```bash
npm test         # src/lib/estimate.test.ts を実行
```

---

## よく編集する場所（運用ガイド）

| やりたいこと | 編集するファイル |
| --- | --- |
| **料金を変更**（基本料金・画数単価・アクリル各サイズの材料費/加工費・オプション料金） | `src/config/pricing.ts` |
| **屋号・連絡先・Instagram・Formspree のフォームID** | `src/config/site.ts` |
| **作品（WORKS）を追加・編集** | `src/data/works.ts` ＋ 画像を `public/works/` に置く |
| **よくある質問（FAQ）を編集** | `src/data/faq.ts`（構造化データにも自動反映） |
| **特定商取引法に基づく表記／運営者情報** | `src/config/site.ts` の `legal`（→ `/legal` ページに表示） |
| **SEO（サイト名・説明文・OGP）** | `src/config/seo.ts` |
| ブランドの色・フォント・装飾 | `tailwind.config.ts` / `src/app/globals.css` |

### 特定商取引法ページ（/legal）について

`src/config/site.ts` の `legal` に事業者情報（販売事業者・運営責任者・所在地・電話番号など）を記入してください。
未記入の項目は「（準備中）」と表示されます。雛形の状態を検索結果に出さないよう、`/legal` は初期状態で
`noindex` にしています。**記入が完了したら** `src/app/legal/page.tsx` の `robots: { index: false }` を
`index: true` に変更して公開してください。

### 価格表示について

消費者向けの総額表示に合わせ、見積もりは **税込価格をメイン**（税抜・消費税を補足）で表示しています。
税率は `src/config/pricing.ts` の `taxRate` で変更できます。送料は見積もりに含めず「別途」と注記しています。

### 料金設定（pricing.ts）について

`src/config/pricing.ts` の数値を書き換えるだけで、サイト全体の見積もり計算へ
即座に反映されます。アクリル板は市場価格が変動するため、各サイズの
`material`（材料費）と `processing`（加工費）を必要に応じて更新してください。

```
アクリル追加料金 = max(0, (選択サイズの material − A3 の material) + 選択サイズの processing)
```

### 作品（WORKS）の追加手順

1. 写真を `public/works/` に保存（例: `public/works/wedding-01.jpg`）
2. `src/data/works.ts` の配列に1件追加するだけ:

```ts
{
  id: "wedding-01",
  title: "おふたりの名前ネオン",
  category: "wedding",
  image: "/works/wedding-01.jpg",
  color: "pink",
  description: "受付に灯した、やわらかいピンクのお名前ネオン。",
}
```

### 問い合わせ送信（Formspree）の有効化

1. <https://formspree.io> でフォームを作成し、フォームID（`xxxxxxx`）を取得
2. `src/config/site.ts` の `formspreeId` に設定

未設定のあいだは送信されず、入力内容のプレビューのみ表示されます。

---

## ディレクトリ構成

```
src/
  app/          各ページ（TOP / about / works / order / contact）と共通レイアウト
  components/   layout・ui・home・about・works・order・contact に分割
  config/       pricing(料金) / site(屋号・SNS) / seo
  data/         works(作品データ)
  lib/          estimate(見積もり計算) / types / format
  context/      EstimateContext(見積もり状態の保持・localStorage 永続化)
public/
  works/        作品写真を置く場所
```

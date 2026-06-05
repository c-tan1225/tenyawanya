/**
 * サイト基本情報（屋号・連絡先・SNS・フォーム）
 * ──────────────────────────────────────────
 * ここを編集するだけで、ヘッダー・フッター・問い合わせ先などへ反映されます。
 */
export const siteConfig = {
  /** 屋号 */
  name: "てんヤわんヤ",
  nameEn: "tenya wanya",
  /** ひと言コンセプト */
  tagline: "手づくりのLEDネオンサイン",

  /** 公開URL（OGP・sitemap で使用。公開ドメインに合わせて変更） */
  url: "https://tenya-wanya.example.com",

  /** 連絡先メール（mailto 等で使用） */
  email: "hello@tenya-wanya.example.com",

  /** SNS */
  instagram: {
    handle: "@tenyawanya.ws",
    url: "https://www.instagram.com/tenyawanya.ws/",
  },

  /**
   * Formspree のフォームID。
   *   https://formspree.io でフォームを作成して取得した ID（例: "xrgvabcd"）を設定。
   *   未設定（空文字）の場合は送信されず、入力内容のプレビューのみ表示します。
   */
  formspreeId: "",

  /**
   * 特定商取引法に基づく表記（/legal ページに表示）。
   *   ── すべて記入できたら、src/app/legal/page.tsx の `robots: { index: false }` を
   *      `index: true` に変更して検索エンジンに公開してください。
   *   未記入の項目は「（準備中）」と表示されます。
   */
  legal: {
    sellerName: "", // 販売事業者名（屋号または氏名）
    manager: "", // 運営責任者
    address: "", // 所在地
    phone: "", // 電話番号（請求があれば遅滞なく開示する旨の運用も可）
    paymentMethods: "銀行振込 ／ 各種オンライン決済", // 支払方法
    paymentTiming: "ご注文確定後、制作開始前にお支払い（前金制）", // 支払時期
    deliveryTiming: "デザイン確定後に制作を開始し、完成次第発送します（納期は内容により異なります）", // 引渡し時期
    shipping: "送料は別途。お届け先・サイズにより異なります", // 送料
    returns:
      "オーダーメイド品のため、お客様都合による返品・交換はお受けできません。万一の初期不良・破損は到着後すぐにご連絡ください。", // 返品・交換
  },
} as const;

/** Formspree の送信先エンドポイント（ID 未設定なら null） */
export const formspreeEndpoint = siteConfig.formspreeId
  ? `https://formspree.io/f/${siteConfig.formspreeId}`
  : null;

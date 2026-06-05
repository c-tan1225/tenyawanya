import type { NeonColor, Usage } from "@/lib/types";

/**
 * 作品（WORKS）データ
 * ────────────────────
 *  写真を `public/works/` に置き、ここへ1件追加するだけでギャラリーに反映されます。
 *  `image` を空にしておくと、ネオン風のプレースホルダーで表示されます
 *  （写真が用意でき次第、パスを設定してください）。
 */

/** 作品カテゴリー */
export type WorkCategory = Extract<Usage, "wedding" | "shop" | "event" | "interior">;

export interface Work {
  /** 一意のID（ファイル名と揃えると管理しやすい） */
  id: string;
  /** 作品タイトル */
  title: string;
  /** カテゴリー */
  category: WorkCategory;
  /** 画像パス（例: "/works/wedding-01.jpg"）。空ならプレースホルダー表示 */
  image: string;
  /** イメージカラー（プレースホルダーやアクセントに使用） */
  color: NeonColor;
  /** ひと言説明 */
  description: string;
}

/** カテゴリーの表示ラベル */
export const categoryLabels: Record<WorkCategory, string> = {
  wedding: "Wedding",
  shop: "Shop sign",
  event: "Event",
  interior: "Interior",
};

/** カテゴリーごとの日本語サブ表記 */
export const categorySubLabels: Record<WorkCategory, string> = {
  wedding: "結婚式・ウェディング",
  shop: "店舗・看板",
  event: "イベント・装飾",
  interior: "インテリア・お部屋",
};

/**
 * 作品リスト。
 * ※下記は世界観を伝えるためのサンプルです。写真が用意でき次第 image を設定し、
 *   不要な項目は削除・差し替えしてください。
 */
export const works: Work[] = [
  {
    id: "winged-heart-iy",
    title: "天使のハート（I＋Y）",
    category: "wedding",
    image: "/works/neon-heart.jpg",
    color: "red",
    description: "天使の輪と羽をまとったハートに、ふたりのイニシャルを灯して。記念日や前撮りにも。",
  },
  {
    id: "name-missemily",
    title: "Miss emily｜お名前ネオン",
    category: "interior",
    image: "/works/neon-missemily.jpg",
    color: "blue",
    description: "筆記体のお名前を、透明アクリルにブルーで。お部屋や撮影スペースのアクセントに。",
  },
  {
    id: "kanji-pink",
    title: "漢字ネオン｜ピンク",
    category: "interior",
    image: "/works/neon-kanji-pink.jpg",
    color: "pink",
    description: "好きな一文字を、ビビッドなピンクで。手曲げならではの力強い筆致を再現。",
  },
  {
    id: "kanji-white",
    title: "漢字ネオン｜ホワイト",
    category: "interior",
    image: "/works/neon-blue-kanji.jpg",
    color: "white",
    description: "ホワイトのチューブで仕上げた、迫力のある漢字ネオン。お部屋の主役にも。",
  },
  {
    id: "script-red",
    title: "筆記体ネオン｜レッド",
    category: "shop",
    image: "/works/neon-forget.jpg",
    color: "red",
    description: "アクリルに浮かぶ、深い赤の筆記体。店名やロゴサインにおすすめ。",
  },
  {
    id: "wedding-names",
    title: "ふたりの名前",
    category: "wedding",
    image: "",
    color: "pink",
    description: "受付に灯した、やわらかいピンクのお名前ネオン。",
  },
  {
    id: "wedding-justmarried",
    title: "Just Married",
    category: "wedding",
    image: "",
    color: "warm",
    description: "高砂の背景に。写真映えする電球色の筆記体。",
  },
  {
    id: "wedding-forever",
    title: "Forever",
    category: "wedding",
    image: "",
    color: "purple",
    description: "前撮りで人気の一語ネオン。持ち運べる自立スタイル。",
  },
  {
    id: "shop-cafe-open",
    title: "OPEN（カフェ）",
    category: "shop",
    image: "",
    color: "green",
    description: "窓辺に置く、視認性の高いオープンサイン。",
  },
  {
    id: "shop-salon-logo",
    title: "美容室のロゴ看板",
    category: "shop",
    image: "",
    color: "blue",
    description: "お店のロゴをそのままネオンに。形状カット仕上げ。",
  },
  {
    id: "shop-bar-name",
    title: "バーの店名サイン",
    category: "shop",
    image: "",
    color: "red",
    description: "夜の街に映える、深い赤の店名ネオン。",
  },
  {
    id: "event-popup",
    title: "ポップアップの装飾",
    category: "event",
    image: "",
    color: "yellow",
    description: "撮影スポットを作る、明るいイエローのワード。",
  },
  {
    id: "event-birthday",
    title: "Happy Birthday",
    category: "event",
    image: "",
    color: "pink",
    description: "お誕生日会を彩る、繰り返し使えるネオン。",
  },
  {
    id: "interior-room",
    title: "お部屋のアクセント",
    category: "interior",
    image: "",
    color: "blue",
    description: "ベッドサイドに。寝る前にちょうどいい明るさ。",
  },
  {
    id: "interior-quote",
    title: "好きな言葉",
    category: "interior",
    image: "",
    color: "purple",
    description: "大切にしている一言を、毎日見える場所に。",
  },
  {
    id: "interior-icon",
    title: "ちいさなアイコン",
    category: "interior",
    image: "",
    color: "green",
    description: "ハートや星など、コンパクトなモチーフネオン。",
  },
  {
    id: "event-logo",
    title: "イベントロゴ",
    category: "event",
    image: "",
    color: "warm",
    description: "ブースのシンボルに。設営しやすい吊り下げ仕様。",
  },
];

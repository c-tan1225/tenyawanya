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
    id: "headphones-blue",
    title: "ヘッドホン｜ブルー",
    category: "interior",
    image: "/works/neon-headphones.jpg",
    color: "blue",
    description: "音楽好きのお部屋に。クールなブルー＆ホワイトで描いたヘッドホンのモチーフネオン。",
  },
  {
    id: "butterfly-purple",
    title: "バタフライ｜パープル",
    category: "interior",
    image: "/works/neon-butterfly.jpg",
    color: "purple",
    description: "ひらひらと舞う蝶を、上品なパープルで。お部屋や撮影スペースのアクセントに。",
  },
  {
    id: "planet-moon",
    title: "プラネット＆ムーン",
    category: "interior",
    image: "/works/neon-planet-moon.jpg",
    color: "pink",
    description: "土星と三日月、きらめく星を組み合わせた宇宙モチーフ。ピンク×ブルーが幻想的。",
  },
  {
    id: "heart-red",
    title: "ハート｜レッド",
    category: "interior",
    image: "/works/neon-heart-red.jpg",
    color: "red",
    description: "シンプルだから飾る場所を選ばない、王道のハートネオン。お部屋にも記念日にも。",
  },
  {
    id: "cloud-bolt",
    title: "雲と稲妻",
    category: "interior",
    image: "/works/neon-cloud-bolt.jpg",
    color: "blue",
    description: "ホワイトの雲にブルーの稲妻。ポップで存在感のある、人気のモチーフネオン。",
  },
  {
    id: "angel-wings",
    title: "天使の羽｜ホワイト",
    category: "wedding",
    image: "/works/neon-wings.jpg",
    color: "white",
    description: "左右に広がる天使の羽を、清らかなホワイトで。前撮りやウェルカムスペースの主役に。",
  },
  {
    id: "kanji-vertical",
    title: "漢字ネオン｜縦書き",
    category: "interior",
    image: "/works/neon-kanji-vertical.jpg",
    color: "white",
    description: "縦書きの漢字を、白に赤・オレンジを効かせた手曲げで。力強い筆致がそのまま灯ります。",
  },
];

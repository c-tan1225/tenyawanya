/** 共通ナビゲーション項目（ヘッダー・フッター・モバイルメニューで共有） */
export interface NavItem {
  href: string;
  label: string;
  /** ラテン表記（装飾用） */
  sub: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "ホーム", sub: "Top" },
  { href: "/about", label: "わたしたちのこと", sub: "About" },
  { href: "/works", label: "制作事例", sub: "Works" },
  { href: "/order", label: "見積もり・オーダー", sub: "Order" },
  { href: "/contact", label: "お問い合わせ", sub: "Contact" },
];

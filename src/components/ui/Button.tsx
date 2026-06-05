import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

/**
 * 共通ボタン（pill 形・やわらかい影・静かな持ち上がり）。
 *   href があれば <Link>、なければ <button> として描画します。
 *   高級感を出すため、過度なバウンドや極太縁取りは避け、
 *   ヘアラインと拡散する影で上質さを表現します。
 */
type Variant = "primary" | "cream" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-pill font-round font-bold tracking-tight transition-all duration-300 ease-smooth active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // メイン：ディープチャコール ＋ ホバーで静かに浮く
  primary:
    "bg-ink text-cream shadow-soft hover:-translate-y-[2px] hover:shadow-lift",
  // クリーム：明るい面の上で使う、白＋ヘアライン
  cream:
    "bg-cream-soft text-ink shadow-soft ring-1 ring-ink/10 hover:-translate-y-[2px] hover:shadow-lift",
  // アウトライン：細い縁取り（塗りつぶしホバー）
  outline:
    "bg-transparent text-ink ring-1 ring-ink/25 hover:ring-ink/0 hover:bg-ink hover:text-cream",
  // ゴースト：装飾なしの軽いリンク
  ghost: "bg-transparent text-ink hover:bg-ink/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[15px]",
  lg: "px-9 py-4 text-base md:text-[17px]",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
  } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonProps;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

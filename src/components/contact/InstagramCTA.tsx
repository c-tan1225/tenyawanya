import { siteConfig } from "@/config/site";
import { InstagramIcon } from "@/components/layout/InstagramIcon";

/**
 * CONTACT：Instagram 導線。
 *   フォームが苦手な方や、お急ぎの方向けのDM案内。
 */
export function InstagramCTA() {
  return (
    <a
      href={siteConfig.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-3xl bg-cream-soft p-5 shadow-soft ring-1 ring-ink/[0.06] transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-lift"
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple text-cream shadow-soft">
        <InstagramIcon className="h-7 w-7" />
      </span>
      <span className="flex-1">
        <span className="block font-round font-bold text-ink">
          Instagram のDMでも受付中
        </span>
        <span className="block text-sm text-ink/60">
          最新の制作事例も更新中 ・ {siteConfig.instagram.handle}
        </span>
      </span>
      <span className="font-round text-ink/40 transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

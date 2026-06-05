import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { InstagramCTA } from "@/components/contact/InstagramCTA";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "ハンドメイドLEDネオンサイン「てんヤわんヤ」へのお問い合わせ・オーダーのご相談はこちら。見積もり内容を添えて送信できます。Instagram のDMも受付中。",
  alternates: { canonical: "/contact" },
};

/** CONTACT ページ：フォーム ＋ Instagram 導線 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        sub="Contact"
        title="お問い合わせ"
        lead="オーダーのご相談、お見積りのご確認など、お気軽にどうぞ。「こんなの作れる？」のひと言からでも大歓迎です。"
      />
      <section className="mx-auto max-w-2xl px-5 pb-20 pt-6 md:pb-28">
        <div className="mb-8">
          <InstagramCTA />
        </div>
        <ContactForm />
      </section>
    </>
  );
}

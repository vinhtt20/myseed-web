import type { Metadata } from "next";
import { ChatCircleDots, EnvelopeSimple, Phone } from "@phosphor-icons/react/ssr";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT, PENDING } from "@/data/site";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Hotline, hỗ trợ trực tuyến và mạng xã hội của MYSEED.",
};

export default function ContactPage() {
  return (
    <div className="container-page grid gap-14 pb-8 pt-12 md:pt-20 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <div>
        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">Liên hệ</h1>
        <p className="mt-5 max-w-[40ch] text-lg text-ink-soft">
          Muốn đồng hành, hợp tác truyền thông hay hỏi về một hạt giống, hãy chọn cách thuận tiện nhất.
        </p>
        <ul className="mt-10 grid gap-8">
          <li className="flex gap-4">
            <Phone size={26} className="mt-0.5 shrink-0 text-moss" aria-hidden />
            <div>
              <h2 className="font-bold">Hotline</h2>
              {CONTACT.hotlineTel ? (
                <a href={`tel:${CONTACT.hotlineTel}`} className="text-ink-soft hover:text-ink">{CONTACT.hotline}</a>
              ) : (
                <p className="text-ink-soft">{PENDING}</p>
              )}
            </div>
          </li>
          <li className="flex gap-4">
            <EnvelopeSimple size={26} className="mt-0.5 shrink-0 text-moss" aria-hidden />
            <div>
              <h2 className="font-bold">Email</h2>
              {CONTACT.email ? (
                <a href={`mailto:${CONTACT.email}`} className="text-ink-soft hover:text-ink">{CONTACT.email}</a>
              ) : (
                <p className="text-ink-soft">{PENDING}</p>
              )}
            </div>
          </li>
          <li className="flex gap-4">
            <ChatCircleDots size={26} className="mt-0.5 shrink-0 text-moss" aria-hidden />
            <div>
              <h2 className="font-bold">Mạng xã hội</h2>
              <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-ink-soft">
                {CONTACT.socials.map((s) => (
                  <li key={s.label}>
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">{s.label}</a>
                    ) : (
                      <span>{s.label} ({PENDING.toLowerCase()})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <section className="rounded-xl border border-line bg-surface p-6 md:p-10" aria-labelledby="ho-tro">
        <h2 id="ho-tro" className="text-2xl font-bold tracking-tight">Hỗ trợ trực tuyến</h2>
        <p className="mb-8 mt-2 text-ink-soft">Để lại lời nhắn, chúng tôi trả lời qua email.</p>
        <ContactForm />
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { CONTACT, PENDING } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <section className="container-page grid gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:items-end md:py-20">
        <h2 className="max-w-[18ch] text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-5xl">
          Bạn biết một ý tưởng đang bị bỏ quên?
        </h2>
        <div className="flex flex-col gap-5 md:items-start">
          <p className="max-w-[46ch] text-ink-soft">
            Kể cho chúng tôi nghe nó bắt đầu thế nào và dừng ở đâu. Đội ngũ đọc từng hồ sơ và liên hệ lại với bạn.
          </p>
          <Link href="/gui-hat-giong" className="btn-primary">
            Gửi hạt giống <ArrowRight size={18} weight="bold" aria-hidden />
          </Link>
        </div>
      </section>

      <div className="border-t border-line">
        <div className="container-page grid gap-8 py-10 text-sm text-ink-soft sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-extrabold text-ink">
              MY<span className="text-amber">SEED</span>
            </p>
            <p className="mt-2 max-w-[32ch]">Ươm lại những dự án cộng đồng từng dang dở.</p>
          </div>
          <nav aria-label="Liên kết chân trang">
            <ul className="grid gap-2">
              <li><Link className="hover:text-ink" href="/gioi-thieu">Giới thiệu</Link></li>
              <li><Link className="hover:text-ink" href="/vuon-uom">Vườn Ươm</Link></li>
              <li><Link className="hover:text-ink" href="/tin-tuc">Tin tức và cẩm nang</Link></li>
              <li><Link className="hover:text-ink" href="/lien-he">Liên hệ</Link></li>
            </ul>
          </nav>
          <div className="grid gap-2">
            {CONTACT.hotlineTel ? (
              <a className="hover:text-ink" href={`tel:${CONTACT.hotlineTel}`}>Hotline {CONTACT.hotline}</a>
            ) : (
              <p>Hotline: {PENDING}</p>
            )}
            {CONTACT.email ? (
              <a className="hover:text-ink" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            ) : (
              <p>Email: {PENDING}</p>
            )}
          </div>
          <ul className="grid gap-2">
            {CONTACT.socials.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a className="hover:text-ink" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ) : (
                  <span>{s.label}: {PENDING}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <p className="container-page pb-10 text-xs text-ink-soft">
          © 2026 MYSEED. Nội dung dự án trên trang là dữ liệu mẫu trong giai đoạn thử nghiệm.
        </p>
      </div>
    </footer>
  );
}

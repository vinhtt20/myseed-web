"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CalendarBlank, MapPin } from "@phosphor-icons/react";
import { ARTICLE_CATEGORIES, ARTICLES, formatDate, type ArticleCategory } from "@/data/articles";

export function NewsList() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("loai");
  const category = ARTICLE_CATEGORIES.find((c) => c.slug === raw)?.slug as ArticleCategory | undefined;
  const list = ARTICLES.filter((a) => !category || a.category === category).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const [lead, ...rest] = list;

  const go = (slug?: string) => router.replace(slug ? `${pathname}?loai=${slug}` : pathname, { scroll: false });

  return (
    <div className="container-page">
      <div className="flex flex-wrap gap-2 border-y border-line py-5" role="group" aria-label="Lọc theo loại bài">
        <Pill pressed={!category} onClick={() => go()}>Tất cả</Pill>
        {ARTICLE_CATEGORIES.map((c) => (
          <Pill key={c.slug} pressed={category === c.slug} onClick={() => go(c.slug)}>{c.label}</Pill>
        ))}
      </div>

      {lead && (
        <article className="group relative mt-10 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-10" data-testid="article-card">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
            <Image src={lead.image} alt="" fill priority sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
          </div>
          <div>
            <Meta a={lead} />
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight">
              <Link href={`/tin-tuc/${lead.slug}`} className="after:absolute after:inset-0 hover:underline hover:underline-offset-4">{lead.title}</Link>
            </h2>
            <p className="mt-3 text-ink-soft">{lead.excerpt}</p>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {rest.map((a) => (
            <li key={a.slug}>
              <article className="group relative grid grid-cols-[120px_1fr] gap-5 sm:grid-cols-[160px_1fr]" data-testid="article-card">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-2">
                  <Image src={a.image} alt="" fill sizes="160px" className="object-cover" />
                </div>
                <div>
                  <Meta a={a} />
                  <h2 className="mt-2 text-lg font-bold leading-snug tracking-tight">
                    <Link href={`/tin-tuc/${a.slug}`} className="after:absolute after:inset-0 hover:underline hover:underline-offset-4">{a.title}</Link>
                  </h2>
                  <p className="mt-1 line-clamp-2 text-[15px] text-ink-soft">{a.excerpt}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Meta({ a }: { a: (typeof ARTICLES)[number] }) {
  const label = ARTICLE_CATEGORIES.find((c) => c.slug === a.category)!.label;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
      <span className="font-semibold text-amber">{label}</span>
      {a.event ? (
        <>
          <span className="inline-flex items-center gap-1.5"><CalendarBlank size={16} aria-hidden /> {formatDate(a.event.date)}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin size={16} aria-hidden /> {a.event.place}</span>
        </>
      ) : (
        <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
      )}
    </div>
  );
}

function Pill({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink aria-pressed:border-moss aria-pressed:bg-moss aria-pressed:text-moss-ink"
    >
      {children}
    </button>
  );
}

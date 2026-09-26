import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarBlank, MapPin } from "@phosphor-icons/react/ssr";
import { ARTICLE_CATEGORIES, ARTICLES, formatDate, getArticle } from "@/data/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt, openGraph: { type: "article", images: [a.image] } };
}

export default async function ArticlePage({ params }: PageProps<"/tin-tuc/[slug]">) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const category = ARTICLE_CATEGORIES.find((c) => c.slug === a.category)!;

  return (
    <article className="pb-8">
      <div className="container-page max-w-[860px] pt-8">
        <Link href={`/tin-tuc?loai=${category.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink">
          <ArrowLeft size={16} aria-hidden /> {category.label}
        </Link>
        <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">{a.title}</h1>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-ink-soft">
          <time dateTime={a.publishedAt}>Đăng ngày {formatDate(a.publishedAt)}</time>
        </div>
        {a.event && (
          <dl className="mt-6 grid gap-3 rounded-xl bg-amber-tint p-5 sm:grid-cols-2" data-testid="event-info">
            <div className="flex items-start gap-3">
              <CalendarBlank size={22} className="mt-0.5 shrink-0" aria-hidden />
              <div><dt className="text-sm text-ink-soft">Thời gian</dt><dd className="font-semibold">{formatDate(a.event.date)}</dd></div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={22} className="mt-0.5 shrink-0" aria-hidden />
              <div><dt className="text-sm text-ink-soft">Địa điểm</dt><dd className="font-semibold">{a.event.place}</dd></div>
            </div>
          </dl>
        )}
      </div>
      <div className="container-page mt-10 max-w-[1100px]">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface-2">
          <Image src={a.image} alt="" fill priority sizes="(min-width: 1100px) 1100px, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="container-page mt-12 max-w-[860px]">
        <p className="text-xl font-semibold leading-relaxed">{a.excerpt}</p>
        {a.body.map((para, i) => (
          <p key={i} className="mt-6 max-w-[68ch] text-lg leading-relaxed text-ink-soft">{para}</p>
        ))}
      </div>
    </article>
  );
}

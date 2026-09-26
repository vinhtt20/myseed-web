import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { InvestDialog } from "@/components/InvestDialog";
import { SeedCard, StageBadge } from "@/components/SeedCard";
import { SEEDS, getSeed } from "@/data/seeds";
import { labelOf } from "@/data/taxonomy";
import { canInvest } from "@/lib/filter";

export function generateStaticParams() {
  return SEEDS.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/vuon-uom/[slug]">): Promise<Metadata> {
  const seed = getSeed((await params).slug);
  if (!seed) return {};
  return { title: seed.title, description: seed.summary, openGraph: { images: [seed.image] } };
}

export default async function SeedPage({ params }: PageProps<"/vuon-uom/[slug]">) {
  const seed = getSeed((await params).slug);
  if (!seed) notFound();

  const related = SEEDS.filter((s) => s.slug !== seed.slug && s.field === seed.field).slice(0, 3);

  return (
    <article>
      <div className="container-page pt-8">
        <Link href="/vuon-uom" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink">
          <ArrowLeft size={16} aria-hidden /> Vườn Ươm
        </Link>
      </div>

      <header className="container-page grid gap-10 pb-12 pt-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <StageBadge stage={seed.stage} />
            <span>Hạt Giống {seed.code}</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">{seed.title}</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-ink-soft">{seed.summary}</p>
          <div className="mt-8">
            {canInvest(seed) ? (
              <InvestDialog seedTitle={seed.title} />
            ) : (
              <p className="max-w-[48ch] rounded-[10px] bg-moss-tint px-4 py-3 text-[15px]" data-testid="no-invest-note">
                {seed.stage === "dang-uom"
                  ? "Dự án đã có người đồng hành và đang chạy lại. Theo dõi tiến độ tại mục Tin tức."
                  : "Dự án đã tự vận hành. Bạn có thể ủng hộ bằng cách mua sản phẩm hoặc ghé thăm."}
              </p>
            )}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-2">
          <Image src={seed.image} alt={seed.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </header>

      <div className="container-page grid gap-12 border-t border-line py-14 lg:grid-cols-[280px_1fr] lg:gap-20">
        <dl className="grid h-fit gap-5 text-[15px]">
          {[
            ["Lĩnh vực", labelOf.field(seed.field)],
            ["Khu vực", `${labelOf.region(seed.region)}, ${seed.place}`],
            ["Người khởi xướng", `${seed.founder.name}, ${seed.founder.role}`],
            ["Giai đoạn", labelOf.stage(seed.stage)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm text-ink-soft">{k}</dt>
              <dd className="mt-0.5 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="grid max-w-[68ch] gap-10">
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Vì sao dự án dừng lại</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{seed.problem}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-tight">Giá trị bản địa sẵn có</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{seed.localValue}</p>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line py-16" aria-labelledby="cung-linh-vuc">
          <div className="container-page">
            <h2 id="cung-linh-vuc" className="text-2xl font-bold tracking-tight">Cùng lĩnh vực</h2>
            <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug}><SeedCard seed={s} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}

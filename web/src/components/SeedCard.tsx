import Image from "next/image";
import Link from "next/link";
import type { Seed } from "@/data/seeds";
import { labelOf } from "@/data/taxonomy";

export function StageBadge({ stage }: { stage: Seed["stage"] }) {
  const tone =
    stage === "bo-quen"
      ? "bg-amber-tint text-ink"
      : stage === "dang-uom"
        ? "bg-moss-tint text-ink"
        : "bg-moss text-moss-ink";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {labelOf.stageShort(stage)}
    </span>
  );
}

export function SeedCard({
  seed,
  size = "normal",
  priority = false,
}: {
  seed: Seed;
  size?: "normal" | "large";
  priority?: boolean;
}) {
  const large = size === "large";
  return (
    <article className="group relative flex h-full flex-col" data-testid="seed-card">
      <div
        className={`relative overflow-hidden rounded-xl bg-surface-2 ${large ? "aspect-[4/3] md:aspect-auto md:min-h-[420px] md:flex-1" : "aspect-[4/3]"}`}
      >
        <Image
          src={seed.image}
          alt={seed.title}
          fill
          priority={priority}
          sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-soft">
        <StageBadge stage={seed.stage} />
        <span>{seed.place}</span>
      </div>
      <h3 className={`mt-2 font-bold leading-snug tracking-tight text-ink ${large ? "text-2xl md:text-3xl" : "text-lg"}`}>
        <Link href={`/vuon-uom/${seed.slug}`} className="after:absolute after:inset-0 hover:underline hover:underline-offset-4">
          {seed.title}
        </Link>
      </h3>
      <p className={`mt-2 text-ink-soft ${large ? "max-w-[55ch]" : "line-clamp-2 text-[15px]"}`}>{seed.summary}</p>
    </article>
  );
}

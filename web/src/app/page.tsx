import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/Reveal";
import { SeedCard } from "@/components/SeedCard";
import { getArticle } from "@/data/articles";
import { SEEDS, getSeed, latestSeeds } from "@/data/seeds";
import { STEPS } from "@/data/site";

export default function Home() {
  const featured = getSeed("mac-ca-say-lanh-krong-no")!;
  const featuredStory = getArticle("hat-giong-001-krong-no")!;
  const [lead, ...others] = latestSeeds(5);
  const provinces = new Set(SEEDS.map((s) => s.place.split(",").at(-1)!.replace(/\(.*\)/, "").trim()));
  const stats = [
    { value: SEEDS.length, label: "hạt giống trong vườn ươm" },
    { value: SEEDS.filter((s) => s.stage === "dang-uom").length, label: "dự án đang được ươm lại" },
    { value: SEEDS.filter((s) => s.stage === "thanh-cay").length, label: "dự án đã tự vận hành" },
    { value: provinces.size, label: "tỉnh thành có hạt giống" },
  ];

  return (
    <>
      {/* D1: hero */}
      <section className="container-page grid items-center gap-10 pb-16 pt-10 md:grid-cols-[1.15fr_1fr] md:gap-14 md:pb-24 md:pt-16 lg:min-h-[calc(100dvh-4rem)]">
        <Reveal fade={false}>
          <h1 className="max-w-[19ch] text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] xl:text-[3.6rem]">
            Ý tưởng bị bỏ dở vẫn có thể nảy mầm.
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-soft">
            MYSEED tìm lại dự án cộng đồng dang dở và kết nối chúng với người đồng hành phù hợp.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/gui-hat-giong" className="btn-primary">
              Gửi hạt giống <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
            <Link href={`/tin-tuc/${featuredStory.slug}`} className="btn-ghost">
              Đọc câu chuyện 001
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-2 md:aspect-[5/6]">
            <Image
              src="https://picsum.photos/seed/myseed-hero-hands-soil/1000/1200"
              alt="Ảnh minh họa cho câu chuyện hạt giống"
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* D2: short intro + figures derived from the current dataset */}
      <section className="border-y border-line bg-surface">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <p className="text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[2rem] md:leading-[1.3]">
              Nhiều dự án tốt ở làng quê dừng lại vì một chiếc máy hỏng, một người rời đi hay một thủ tục chưa ai hướng dẫn.
              <span className="text-ink-soft"> Chúng tôi tìm lại chúng, ghi rõ chỗ bị kẹt và mời đúng người đến gỡ.</span>
            </p>
          </Reveal>
          <div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06} className="flex flex-col">
                  <dt className="order-2 mt-2 block max-w-[18ch] text-ink-soft">{s.label}</dt>
                  <dd className="text-5xl font-extrabold tabular-nums tracking-tight text-moss md:text-6xl">{s.value}</dd>
                </Reveal>
              ))}
            </dl>
            <p className="mt-10 text-sm text-ink-soft">Số liệu tính từ dữ liệu mẫu của giai đoạn thử nghiệm.</p>
          </div>
        </div>
      </section>

      {/* D3: five-step mechanism */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-[22ch] text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Từ hạt giống bị quên đến cây tự đứng.
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.verb} className="relative border-t-2 border-line pt-6 md:border-t-0 md:pt-0">
              <Reveal delay={i * 0.07}>
                <span aria-hidden className="absolute -top-[2px] left-0 hidden h-0.5 w-full bg-line md:block" />
                <span aria-hidden className="absolute -top-[7px] left-0 hidden size-3 rounded-full border-2 border-moss bg-bg md:block" />
                <h3 className="text-2xl font-bold tracking-tight text-ink md:mt-8">{step.verb}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Link href="/gioi-thieu#co-che" className="mt-12 inline-flex items-center gap-2 font-semibold text-ink underline underline-offset-4">
          Xem cơ chế vận hành chi tiết <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      {/* D4: featured seed, overlapping composition */}
      <section className="container-page pb-20 md:pb-28">
        <div className="relative grid md:grid-cols-12">
          <Reveal className="md:col-span-8 md:col-start-1 md:row-start-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-2 md:aspect-[16/11]">
              <Image src={featured.image} alt={featured.title} fill sizes="(min-width: 768px) 65vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-4 -mt-12 md:col-span-5 md:col-start-8 md:row-start-1 md:mx-0 md:mt-0 md:self-center">
            <div className="rounded-xl border border-line bg-surface p-7 shadow-[0_30px_60px_-30px_rgb(23_33_27/0.35)] md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Hạt giống nổi bật</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                Hạt Giống {featured.code}: {featured.title}
              </h2>
              <p className="mt-3 text-ink-soft">{featuredStory.excerpt}</p>
              <p className="mt-2 text-sm text-ink-soft">{featured.place}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                <Link href={`/tin-tuc/${featuredStory.slug}`} className="inline-flex items-center gap-2 font-semibold text-ink underline underline-offset-4">
                  Đọc case study <ArrowRight size={16} aria-hidden />
                </Link>
                <Link href={`/vuon-uom/${featured.slug}`} className="font-semibold text-ink-soft hover:text-ink">
                  Hồ sơ dự án
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* D5: nursery preview, bento of the 5 newest seeds */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-[18ch] text-3xl font-bold leading-tight tracking-tight md:text-5xl">Mới vào Vườn Ươm</h2>
            <Link href="/vuon-uom" className="btn-ghost">
              Xem cả vườn ươm <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr]">
            <Reveal className="md:col-span-2 lg:col-span-1 lg:row-span-2">
              <SeedCard seed={lead} size="large" />
            </Reveal>
            {others.map((seed, i) => (
              <Reveal key={seed.slug} delay={i * 0.05}>
                <SeedCard seed={seed} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* D6: partners. Logos pending (docs Q7): honest placeholder slots, not invented brands. */}
      <section className="container-page border-t border-line py-16 md:py-20" aria-labelledby="doi-tac">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <h2 id="doi-tac" className="text-2xl font-bold tracking-tight">Người đồng hành</h2>
            <p className="mt-2 max-w-[36ch] text-ink-soft">
              Tổ chức muốn cùng ươm hạt giống có thể{" "}
              <Link href="/lien-he" className="font-semibold text-ink underline underline-offset-4">liên hệ với chúng tôi</Link>.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <li
                key={i}
                className="flex h-20 items-center justify-center rounded-xl border border-dashed border-line text-sm text-ink-soft"
              >
                Logo đối tác
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

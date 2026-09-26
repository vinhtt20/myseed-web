import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { STEPS } from "@/data/site";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Vai trò, tầm nhìn, sứ mệnh và cơ chế vận hành của MYSEED.",
};

const ROLES = [
  { title: "Điều phối thực địa", text: "Đến tận nơi, gặp người khởi xướng và lập hồ sơ hạt giống." },
  { title: "Kết nối đồng hành", text: "Ghép dự án với nhà đầu tư, chuyên gia và tình nguyện viên phù hợp." },
  { title: "Pháp lý và tài chính", text: "Hướng dẫn thủ tục, hợp đồng và minh bạch dòng tiền." },
  { title: "Truyền thông", text: "Kể lại câu chuyện của từng hạt giống một cách trung thực." },
];

const SDGS = [
  { no: 1, name: "Xóa nghèo", why: "Dự án chạy lại tạo thu nhập tại chỗ cho hộ gia đình." },
  { no: 8, name: "Việc làm bền vững và tăng trưởng kinh tế", why: "Giữ người trẻ ở lại làm việc tại quê." },
  { no: 12, name: "Tiêu dùng và sản xuất có trách nhiệm", why: "Ưu tiên nguyên liệu bản địa và tái chế." },
  { no: 15, name: "Hệ sinh thái trên cạn", why: "Bảo tồn cây thuốc, rừng và đất canh tác." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro title="Chúng tôi đi tìm những việc tốt bị bỏ dở.">
        <p>
          MYSEED là đội ngũ nhỏ làm việc với cộng đồng ở cả ba miền. Chúng tôi không tạo ra dự án mới. Chúng tôi giúp những dự án đã có chạy lại.
        </p>
      </PageIntro>

      <section id="ve-chung-toi" className="container-page scroll-mt-24 border-t border-line py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-2">
            <Image src="https://picsum.photos/seed/myseed-team-field/900/1100" alt="Ảnh minh họa đội ngũ trong chuyến thực địa" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Về chúng tôi</h2>
            <p className="mt-4 max-w-[58ch] text-ink-soft">
              Đội thực hiện gồm bốn nhóm vai trò. Ảnh và tên từng thành viên sẽ được cập nhật khi ra mắt chính thức.
            </p>
            <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {ROLES.map((r) => (
                <div key={r.title} className="border-t border-line pt-4">
                  <dt className="text-lg font-bold">{r.title}</dt>
                  <dd className="mt-1 text-ink-soft">{r.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="tam-nhin" className="scroll-mt-24 bg-moss text-moss-ink">
        <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] opacity-80">Tầm nhìn</h2>
            <p className="mt-4 text-2xl font-semibold leading-snug md:text-3xl">
              Mỗi xã ở Việt Nam có ít nhất một dự án cộng đồng tự đứng được, do chính người dân vận hành.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] opacity-80">Sứ mệnh</h2>
            <p className="mt-4 text-2xl font-semibold leading-snug md:text-3xl">
              Tìm lại ý tưởng bị bỏ quên, gọi đúng người đến giúp và rút lui khi cộng đồng đã tự làm được.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="co-che" className="container-page scroll-mt-24 py-16 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Cơ chế vận hành chi tiết</h2>
        <ol className="mt-10 grid gap-4">
          {STEPS.map((s) => (
            <li key={s.verb} className="grid gap-3 rounded-xl bg-surface p-6 md:grid-cols-[200px_1fr_280px] md:items-baseline md:gap-8">
              <h3 className="text-2xl font-bold tracking-tight text-moss">{s.verb}</h3>
              <p className="text-ink">{s.text}</p>
              <p className="text-sm text-ink-soft">
                <span className="font-semibold text-ink">Ai tham gia: </span>
                {s.who}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="sdgs" className="container-page scroll-mt-24 border-t border-line py-16 md:py-24">
        <h2 className="max-w-[24ch] text-3xl font-bold tracking-tight md:text-4xl">
          Liên kết với Mục tiêu Phát triển Bền vững của Liên Hợp Quốc
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SDGS.map((g) => (
            <li key={g.no} className="flex flex-col">
              <span className="text-6xl font-extrabold tabular-nums tracking-tight text-amber">{g.no}</span>
              <span className="sr-only">Mục tiêu {g.no}: </span>
              <p className="mt-3 text-lg font-bold leading-snug">{g.name}</p>
              <p className="mt-2 text-ink-soft">{g.why}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

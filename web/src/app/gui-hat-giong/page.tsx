import type { Metadata } from "next";
import { SeedForm } from "@/components/SeedForm";

export const metadata: Metadata = {
  title: "Gửi hạt giống",
  description: "Gửi cho MYSEED một ý tưởng cộng đồng đang bị bỏ dở.",
};

export default function SubmitPage() {
  return (
    <div className="container-page grid gap-12 pb-8 pt-12 md:pt-20 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:h-fit">
        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">Gửi hạt giống</h1>
        <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-ink-soft">
          Không cần kế hoạch kinh doanh. Hãy kể thật: ý tưởng là gì, đã làm đến đâu và vì sao dừng lại.
        </p>
        <ul className="mt-8 grid gap-3 text-[15px] text-ink-soft">
          <li>Mất khoảng 10 phút.</li>
          <li>Bạn có thể gửi thay cho người khác, miễn là họ đồng ý.</li>
          <li>Thông tin liên hệ không hiển thị công khai.</li>
        </ul>
      </div>
      <SeedForm />
    </div>
  );
}

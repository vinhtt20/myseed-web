import type { Metadata } from "next";
import { Suspense } from "react";
import { NurseryBrowser, NurserySkeleton } from "@/components/NurseryBrowser";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Vườn Ươm",
  description: "Các hạt giống bỏ quên, đang ươm và đã thành cây, lọc theo lĩnh vực và khu vực.",
};

export default function NurseryPage() {
  return (
    <>
      <PageIntro title="Vườn Ươm">
        <p>Mỗi hạt giống là một dự án thật đang chờ người đồng hành. Lọc theo giai đoạn, lĩnh vực hoặc miền để tìm dự án bạn có thể giúp.</p>
      </PageIntro>
      <Suspense fallback={<NurserySkeleton />}>
        <NurseryBrowser />
      </Suspense>
    </>
  );
}

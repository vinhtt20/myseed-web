import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsList } from "@/components/NewsList";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Tin tức và cẩm nang",
  description: "Case study, tin tức nội bộ và sự kiện của MYSEED.",
};

export default function NewsPage() {
  return (
    <>
      <PageIntro title="Tin tức và cẩm nang" />
      <Suspense fallback={<div className="container-page h-96 animate-pulse rounded-xl bg-surface-2 motion-reduce:animate-none" aria-hidden />}>
        <NewsList />
      </Suspense>
    </>
  );
}

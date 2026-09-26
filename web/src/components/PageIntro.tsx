import type { ReactNode } from "react";

export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="container-page pb-10 pt-12 md:pb-14 md:pt-20">
      <h1 className="max-w-[20ch] text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-6xl">{title}</h1>
      {children && <div className="mt-5 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{children}</div>}
    </div>
  );
}

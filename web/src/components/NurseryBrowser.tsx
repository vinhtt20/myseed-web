"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { SEEDS } from "@/data/seeds";
import { FIELDS, REGIONS, STAGES } from "@/data/taxonomy";
import { applyFilter, filterToQuery, parseFilter, type SeedFilter } from "@/lib/filter";
import { SeedCard } from "./SeedCard";

export function NurseryBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filter = useMemo(() => parseFilter(new URLSearchParams(params.toString())), [params]);
  const results = useMemo(() => applyFilter(SEEDS, filter), [filter]);
  const active = Boolean(filter.stage || filter.field || filter.region);

  // router.replace lands asynchronously; chaining quick changes off the URL alone
  // would drop the earlier one. Keep the latest requested filter in a ref.
  const latest = useRef(filter);
  useEffect(() => {
    latest.current = filter;
  }, [filter]);

  const update = (patch: Partial<SeedFilter>) => {
    latest.current = { ...latest.current, ...patch };
    router.replace(`${pathname}${filterToQuery(latest.current)}`, { scroll: false });
  };

  const clear = () => {
    latest.current = {};
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="container-page">
      <div className="flex flex-col gap-5 border-y border-line py-5 lg:flex-row lg:items-end lg:justify-between">
        <fieldset>
          <legend className="label mb-2">Giai đoạn</legend>
          <div className="flex flex-wrap gap-2">
            <StageButton pressed={!filter.stage} onClick={() => update({ stage: undefined })}>
              Tất cả
            </StageButton>
            {STAGES.map((s) => (
              <StageButton key={s.slug} pressed={filter.stage === s.slug} onClick={() => update({ stage: s.slug })}>
                {s.label}
              </StageButton>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2 lg:w-[520px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="loc-linh-vuc" className="label">Lĩnh vực</label>
            <select
              id="loc-linh-vuc"
              className="input"
              value={filter.field ?? ""}
              onChange={(e) => update({ field: (e.target.value || undefined) as SeedFilter["field"] })}
            >
              <option value="">Tất cả lĩnh vực</option>
              {FIELDS.map((f) => (
                <option key={f.slug} value={f.slug}>{f.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="loc-khu-vuc" className="label">Khu vực</label>
            <select
              id="loc-khu-vuc"
              className="input"
              value={filter.region ?? ""}
              onChange={(e) => update({ region: (e.target.value || undefined) as SeedFilter["region"] })}
            >
              <option value="">Cả ba miền</option>
              {REGIONS.map((r) => (
                <option key={r.slug} value={r.slug}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-5 text-sm text-ink-soft">
        <p aria-live="polite" data-testid="result-count">
          {results.length} dự án
        </p>
        {active && (
          <button type="button" onClick={clear} className="font-semibold text-ink underline underline-offset-4">
            Xóa bộ lọc
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line px-6 py-16 text-center" data-testid="empty-state">
          <p className="text-xl font-bold text-ink">Chưa có hạt giống nào khớp bộ lọc này.</p>
          <p className="mx-auto mt-2 max-w-[48ch] text-ink-soft">
            Thử bỏ bớt một tiêu chí, hoặc gửi cho chúng tôi dự án bạn biết ở khu vực này.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" className="btn-ghost" onClick={clear}>
              Xóa bộ lọc
            </button>
            <Link href="/gui-hat-giong" className="btn-primary">Gửi hạt giống</Link>
          </div>
        </div>
      ) : (
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((seed) => (
            <li key={seed.slug}>
              <SeedCard seed={seed} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StageButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
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

export function NurserySkeleton() {
  return (
    <div className="container-page" aria-hidden>
      <div className="h-24 animate-pulse rounded-xl bg-surface-2 motion-reduce:animate-none" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i}>
            <div className="aspect-[4/3] animate-pulse rounded-xl bg-surface-2 motion-reduce:animate-none" />
            <div className="mt-4 h-5 w-3/4 rounded bg-surface-2" />
            <div className="mt-2 h-4 w-1/2 rounded bg-surface-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

import { FIELDS, REGIONS, STAGES, type Field, type Region, type Stage } from "@/data/taxonomy";
import type { Seed } from "@/data/seeds";

export interface SeedFilter {
  stage?: Stage;
  field?: Field;
  region?: Region;
}

export const FILTER_PARAM = { stage: "giai-doan", field: "linh-vuc", region: "khu-vuc" } as const;

const pick = <T extends string>(allowed: readonly { slug: T }[], value: string | null) =>
  allowed.find((x) => x.slug === value)?.slug;

/** Reads filter state from a URL query. Unknown values are ignored (BR-03). */
export function parseFilter(params: URLSearchParams): SeedFilter {
  return {
    stage: pick(STAGES, params.get(FILTER_PARAM.stage)),
    field: pick(FIELDS, params.get(FILTER_PARAM.field)),
    region: pick(REGIONS, params.get(FILTER_PARAM.region)),
  };
}

export function filterToQuery(filter: SeedFilter): string {
  const params = new URLSearchParams();
  if (filter.stage) params.set(FILTER_PARAM.stage, filter.stage);
  if (filter.field) params.set(FILTER_PARAM.field, filter.field);
  if (filter.region) params.set(FILTER_PARAM.region, filter.region);
  const q = params.toString();
  return q ? `?${q}` : "";
}

/** AND-combines every active criterion (BR-02). */
export function applyFilter(seeds: Seed[], filter: SeedFilter): Seed[] {
  return seeds.filter(
    (s) =>
      (!filter.stage || s.stage === filter.stage) &&
      (!filter.field || s.field === filter.field) &&
      (!filter.region || s.region === filter.region),
  );
}

/** Investing is only offered on forgotten seeds (BR-01). */
export const canInvest = (seed: Pick<Seed, "stage">) => seed.stage === "bo-quen";

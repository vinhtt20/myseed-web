import { describe, expect, it } from "vitest";
import { SEEDS } from "@/data/seeds";
import { applyFilter, canInvest, filterToQuery, parseFilter } from "./filter";

const q = (s: string) => new URLSearchParams(s);

describe("parseFilter", () => {
  it("reads valid values", () => {
    expect(parseFilter(q("giai-doan=dang-uom&linh-vuc=tai-che&khu-vuc=nam"))).toEqual({
      stage: "dang-uom",
      field: "tai-che",
      region: "nam",
    });
  });

  it("ignores unknown values (BR-03)", () => {
    expect(parseFilter(q("giai-doan=hacked&khu-vuc=<script>"))).toEqual({
      stage: undefined,
      field: undefined,
      region: undefined,
    });
  });
});

describe("filterToQuery", () => {
  it("round-trips through parseFilter", () => {
    const f = { stage: "bo-quen", region: "trung" } as const;
    expect(parseFilter(q(filterToQuery(f).slice(1)))).toEqual({ ...f, field: undefined });
  });

  it("returns empty string when nothing is selected", () => {
    expect(filterToQuery({})).toBe("");
  });
});

describe("applyFilter", () => {
  it("returns everything without criteria", () => {
    expect(applyFilter(SEEDS, {})).toHaveLength(SEEDS.length);
  });

  it("AND-combines criteria (BR-02)", () => {
    const out = applyFilter(SEEDS, { stage: "dang-uom", region: "trung" });
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((s) => s.stage === "dang-uom" && s.region === "trung")).toBe(true);
  });

  it("can yield an empty list (BR-04)", () => {
    expect(applyFilter(SEEDS, { stage: "thanh-cay", field: "cong-nghe" })).toEqual([]);
  });
});

describe("canInvest (BR-01)", () => {
  it("is true only for forgotten seeds", () => {
    expect(canInvest({ stage: "bo-quen" })).toBe(true);
    expect(canInvest({ stage: "dang-uom" })).toBe(false);
    expect(canInvest({ stage: "thanh-cay" })).toBe(false);
  });
});

describe("seed data integrity", () => {
  it("has unique slugs and ISO dates", () => {
    expect(new Set(SEEDS.map((s) => s.slug)).size).toBe(SEEDS.length);
    for (const s of SEEDS) expect(s.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("covers every stage", () => {
    for (const stage of ["bo-quen", "dang-uom", "thanh-cay"]) {
      expect(SEEDS.some((s) => s.stage === stage)).toBe(true);
    }
  });
});

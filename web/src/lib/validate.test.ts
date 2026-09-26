import { describe, expect, it } from "vitest";
import {
  isEmail,
  isPhone,
  parseInvites,
  validateContact,
  validateInvest,
  validateSeed,
  type InvestmentIntent,
  type SeedSubmission,
} from "./validate";

const seed: SeedSubmission = {
  title: "Lò sấy mắc ca",
  description: "Nhóm phụ nữ góp máy sấy lạnh để bán mắc ca đã tách vỏ thay vì bán hạt tươi.",
  reason: "Máy sấy hỏng bo mạch và nhóm không có tiền sửa.",
  localValue: "Vườn mắc ca đã cho trái ổn định nhiều năm.",
  field: "nong-san",
  region: "trung",
  name: "H'Bia Niê",
  email: "hbia@example.com",
  phone: "",
  consent: true,
};

const invest: InvestmentIntent = {
  role: "chuyen-gia",
  expertise: ["Pháp lý"],
  invites: "",
  createChat: true,
  name: "Trần Minh Quân",
  email: "quan@example.com",
  phone: "",
};

describe("isEmail / isPhone", () => {
  it.each(["a@b.vn", " x.y+z@mail.com "])("accepts email %s", (v) => expect(isEmail(v)).toBe(true));
  it.each(["a@b", "a b@c.vn", "@c.vn", ""])("rejects email %s", (v) => expect(isEmail(v)).toBe(false));
  it.each(["0912345678", "0912 345 678", "0912.345.678", "+84912345678", "02838291234"])("accepts phone %s", (v) =>
    expect(isPhone(v)).toBe(true),
  );
  it.each(["12345", "091234567", "84912345678", "0912abc678"])("rejects phone %s", (v) =>
    expect(isPhone(v)).toBe(false),
  );
});

describe("validateSeed", () => {
  it("passes a complete submission", () => {
    expect(validateSeed(seed)).toEqual({});
  });

  it("flags every required field on an empty form", () => {
    const errors = validateSeed({ ...seed, title: "", description: "", reason: "", localValue: "", field: "", region: "", name: "", email: "", consent: false });
    expect(Object.keys(errors).sort()).toEqual(
      ["consent", "description", "email", "field", "localValue", "name", "phone", "reason", "region", "title"].sort(),
    );
  });

  it("accepts phone only (BR-05)", () => {
    expect(validateSeed({ ...seed, email: "", phone: "0912345678" })).toEqual({});
  });

  it("enforces length bounds and ignores surrounding whitespace", () => {
    expect(validateSeed({ ...seed, title: "   abc   " }).title).toMatch(/ít nhất 5/);
    expect(validateSeed({ ...seed, description: "x".repeat(2001) }).description).toMatch(/tối đa 2000/);
  });

  it("rejects values outside the taxonomy", () => {
    expect(validateSeed({ ...seed, field: "vu-tru" }).field).toBeDefined();
  });
});

describe("validateInvest", () => {
  it("passes a complete intent", () => {
    expect(validateInvest(invest)).toEqual({});
  });

  it("requires role, expertise and email", () => {
    const e = validateInvest({ ...invest, role: "", expertise: [], email: "" });
    expect(e.role && e.expertise && e.email).toBeTruthy();
  });

  it("parses invites split by comma, semicolon or whitespace", () => {
    expect(parseInvites("A@x.vn, b@x.vn;c@x.vn \n d@x.vn")).toEqual(["a@x.vn", "b@x.vn", "c@x.vn", "d@x.vn"]);
  });

  it("limits invites to 5 (BR-06)", () => {
    const six = Array.from({ length: 6 }, (_, i) => `p${i}@x.vn`).join(",");
    expect(validateInvest({ ...invest, invites: six }).invites).toMatch(/tối đa 5/);
  });

  it("rejects duplicate, malformed or own-email invites (BR-06)", () => {
    expect(validateInvest({ ...invest, invites: "a@x.vn, A@x.vn" }).invites).toMatch(/trùng/);
    expect(validateInvest({ ...invest, invites: "khong-phai-email" }).invites).toMatch(/không phải email/);
    expect(validateInvest({ ...invest, invites: "QUAN@example.com" }).invites).toMatch(/chính email/);
  });
});

describe("validateContact", () => {
  it("requires all three fields", () => {
    expect(Object.keys(validateContact({ name: "", email: "", message: "" })).sort()).toEqual(["email", "message", "name"]);
  });
});

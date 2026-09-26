import { FIELDS, INVEST_ROLES, REGIONS } from "@/data/taxonomy";

export type Errors<K extends string> = Partial<Record<K, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(0|\+84)\d{9,10}$/;

export const isEmail = (v: string) => EMAIL_RE.test(v.trim());
export const isPhone = (v: string) => PHONE_RE.test(v.replace(/[\s.-]/g, ""));

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function length(v: string, min: number, max: number, name: string) {
  const n = v.trim().length;
  if (n === 0) return `Vui lòng nhập ${name}.`;
  if (n < min) return `${capitalize(name)} cần ít nhất ${min} ký tự (hiện có ${n}).`;
  if (n > max) return `${capitalize(name)} tối đa ${max} ký tự (hiện có ${n}).`;
}

function contact(email: string, phone: string, requireEmail: boolean) {
  const errors: Errors<"email" | "phone"> = {};
  const e = email.trim();
  const p = phone.trim();
  if (requireEmail && !e) errors.email = "Vui lòng nhập email.";
  if (!requireEmail && !e && !p) {
    errors.email = "Cần ít nhất email hoặc số điện thoại.";
    errors.phone = "Cần ít nhất email hoặc số điện thoại.";
  }
  if (e && !isEmail(e)) errors.email = "Email chưa đúng định dạng, ví dụ: ten@gmail.com.";
  if (p && !isPhone(p)) errors.phone = "Số điện thoại cần 10-11 số, bắt đầu bằng 0 hoặc +84.";
  return errors;
}

function prune<K extends string>(errors: Errors<K>): Errors<K> {
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v)) as Errors<K>;
}

export interface SeedSubmission {
  title: string;
  description: string;
  reason: string;
  localValue: string;
  field: string;
  region: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

export type SeedField = keyof SeedSubmission;

export function validateSeed(v: SeedSubmission): Errors<SeedField> {
  return prune<SeedField>({
    title: length(v.title, 5, 120, "tên ý tưởng"),
    description: length(v.description, 50, 2000, "mô tả"),
    reason: length(v.reason, 20, 1000, "lý do bỏ dở"),
    localValue: length(v.localValue, 20, 1000, "giá trị bản địa"),
    field: FIELDS.some((f) => f.slug === v.field) ? undefined : "Vui lòng chọn lĩnh vực.",
    region: REGIONS.some((r) => r.slug === v.region) ? undefined : "Vui lòng chọn khu vực.",
    name: length(v.name, 2, 80, "họ tên"),
    ...contact(v.email, v.phone, false),
    consent: v.consent ? undefined : "Bạn cần đồng ý để chúng tôi liên hệ lại.",
  });
}

export interface InvestmentIntent {
  role: string;
  expertise: string[];
  invites: string;
  createChat: boolean;
  name: string;
  email: string;
  phone: string;
}

export type InvestField = keyof InvestmentIntent;

export const MAX_INVITES = 5;

export function parseInvites(raw: string) {
  return raw
    .split(/[\s,;]+/)
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);
}

function invitesError(raw: string, ownEmail: string) {
  const invites = parseInvites(raw);
  const bad = invites.find((x) => !isEmail(x));
  if (bad) return `"${bad}" không phải email hợp lệ.`;
  if (invites.length > MAX_INVITES) return `Chỉ mời tối đa ${MAX_INVITES} người.`;
  if (new Set(invites).size !== invites.length) return "Danh sách có email bị trùng.";
  if (ownEmail.trim() && invites.includes(ownEmail.trim().toLowerCase()))
    return "Không cần mời chính email của bạn.";
}

export function validateInvest(v: InvestmentIntent): Errors<InvestField> {
  return prune<InvestField>({
    role: INVEST_ROLES.some((r) => r.value === v.role) ? undefined : "Vui lòng chọn tư cách tham gia.",
    expertise: v.expertise.length ? undefined : "Chọn ít nhất một chuyên môn bạn có thể góp.",
    invites: invitesError(v.invites, v.email),
    name: length(v.name, 2, 80, "họ tên"),
    ...contact(v.email, v.phone, true),
  });
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export function validateContact(v: ContactMessage): Errors<keyof ContactMessage> {
  return prune<keyof ContactMessage>({
    name: length(v.name, 2, 80, "họ tên"),
    email: !v.email.trim()
      ? "Vui lòng nhập email."
      : isEmail(v.email)
        ? undefined
        : "Email chưa đúng định dạng, ví dụ: ten@gmail.com.",
    message: length(v.message, 10, 1000, "nội dung"),
  });
}

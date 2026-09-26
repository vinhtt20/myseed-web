"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { FIELDS, REGIONS } from "@/data/taxonomy";
import { validateSeed, type Errors, type SeedField, type SeedSubmission } from "@/lib/validate";
import { FormField, describedBy, focusFirstError } from "./FormField";

const EMPTY: SeedSubmission = {
  title: "",
  description: "",
  reason: "",
  localValue: "",
  field: "",
  region: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
};

export function SeedForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors<SeedField>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = <K extends SeedField>(key: K, value: SeedSubmission[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key] || ((key === "email" || key === "phone") && (errors.email || errors.phone)))
      setErrors((e) => ({ ...e, [key]: undefined, ...(key === "email" || key === "phone" ? { email: undefined, phone: undefined } : {}) }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validateSeed(values);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => focusFirstError(formRef.current));
      return;
    }
    setStatus("sending");
    // MVP: no backend yet. Replace with POST /api/seeds (docs section 4).
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="rounded-xl border border-line bg-surface p-8 md:p-10" role="status" data-testid="seed-success">
        <CheckCircle size={44} weight="duotone" className="text-moss" aria-hidden />
        <h2 className="mt-4 text-3xl font-bold tracking-tight">Hạt giống đã được gửi.</h2>
        <p className="mt-3 max-w-[52ch] text-ink-soft">
          Cảm ơn {values.name.trim()}. Chúng tôi sẽ đọc hồ sơ &quot;{values.title.trim()}&quot; và liên hệ lại qua{" "}
          {values.email.trim() || values.phone.trim()}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/vuon-uom" className="btn-primary">Xem Vườn Ươm</Link>
          <button type="button" className="btn-ghost" onClick={() => { setValues(EMPTY); setStatus("idle"); }}>
            Gửi thêm một ý tưởng
          </button>
        </div>
      </div>
    );
  }

  const text = (key: SeedField, label: string, opts: { rows?: number; max?: number; hint?: string; autoComplete?: string; type?: string; optional?: boolean } = {}) => {
    const id = `seed-${key}`;
    const value = values[key] as string;
    const common = {
      id,
      name: key,
      value,
      className: "input",
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": describedBy(id, errors[key], Boolean(opts.hint || opts.max)),
    } as const;
    return (
      <FormField
        id={id}
        label={label}
        error={errors[key]}
        optional={opts.optional}
        hint={opts.max ? `${opts.hint ? `${opts.hint} ` : ""}${value.trim().length}/${opts.max} ký tự` : opts.hint}
      >
        {opts.rows ? (
          <textarea {...common} rows={opts.rows} className="input resize-y" onChange={(e) => set(key, e.target.value)} />
        ) : (
          <input {...common} type={opts.type ?? "text"} autoComplete={opts.autoComplete} onChange={(e) => set(key, e.target.value)} />
        )}
      </FormField>
    );
  };

  return (
    <form ref={formRef} noValidate onSubmit={submit} className="grid gap-12" aria-label="Gửi hạt giống">
      <fieldset className="grid gap-6">
        <legend className="mb-6 text-2xl font-bold tracking-tight">Về ý tưởng</legend>
        {text("title", "Tên ý tưởng", { hint: "Ví dụ: Lò sấy mắc ca của nhóm phụ nữ Krông Nô." })}
        {text("description", "Mô tả ngắn", { rows: 5, max: 2000, hint: "Ý tưởng làm gì, cho ai, đã làm được đến đâu." })}
        {text("reason", "Vì sao ý tưởng bị bỏ dở?", { rows: 4, max: 1000 })}
        {text("localValue", "Giá trị bản địa sẵn có", { rows: 4, max: 1000, hint: "Nguyên liệu, tay nghề, đất đai, con người đang có tại chỗ." })}
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField id="seed-field" label="Lĩnh vực" error={errors.field}>
            <select id="seed-field" className="input" value={values.field} onChange={(e) => set("field", e.target.value)}
              aria-invalid={errors.field ? true : undefined} aria-describedby={describedBy("seed-field", errors.field)}>
              <option value="">Chọn lĩnh vực</option>
              {FIELDS.map((f) => <option key={f.slug} value={f.slug}>{f.label}</option>)}
            </select>
          </FormField>
          <FormField id="seed-region" label="Khu vực" error={errors.region}>
            <select id="seed-region" className="input" value={values.region} onChange={(e) => set("region", e.target.value)}
              aria-invalid={errors.region ? true : undefined} aria-describedby={describedBy("seed-region", errors.region)}>
              <option value="">Chọn khu vực</option>
              {REGIONS.map((r) => <option key={r.slug} value={r.slug}>{r.label}</option>)}
            </select>
          </FormField>
        </div>
      </fieldset>

      <fieldset className="grid gap-6">
        <legend className="mb-2 text-2xl font-bold tracking-tight">Thông tin liên hệ</legend>
        <p className="-mt-2 text-ink-soft">Cần ít nhất email hoặc số điện thoại.</p>
        {text("name", "Họ tên", { autoComplete: "name" })}
        <div className="grid gap-6 sm:grid-cols-2">
          {text("email", "Email", { type: "email", autoComplete: "email", optional: true })}
          {text("phone", "Số điện thoại", { type: "tel", autoComplete: "tel", optional: true })}
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              id="seed-consent"
              type="checkbox"
              className="mt-1 size-4 accent-[var(--moss)]"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={describedBy("seed-consent", errors.consent)}
            />
            <span className="text-[15px]">
              Tôi đồng ý để MYSEED lưu và dùng thông tin này để liên hệ về ý tưởng, theo Nghị định 13/2023/NĐ-CP.
            </span>
          </label>
          {errors.consent && <p id="seed-consent-error" className="field-error">{errors.consent}</p>}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">Bạn có thể sửa hoặc rút hồ sơ bất cứ lúc nào qua email.</p>
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Đang gửi..." : "Gửi hạt giống"}
        </button>
      </div>
    </form>
  );
}

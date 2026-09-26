"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle, X } from "@phosphor-icons/react";
import { EXPERTISE, INVEST_ROLES } from "@/data/taxonomy";
import { MAX_INVITES, validateInvest, type Errors, type InvestField, type InvestmentIntent } from "@/lib/validate";
import { FormField, describedBy, focusFirstError } from "./FormField";

const EMPTY: InvestmentIntent = {
  role: "",
  expertise: [],
  invites: "",
  createChat: true,
  name: "",
  email: "",
  phone: "",
};

type Status = "idle" | "sending" | "done";

/**
 * Native <dialog> gives us modal focus containment, Esc to close and
 * focus return to the trigger without extra code.
 */
export function InvestDialog({ seedTitle }: { seedTitle: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<InvestmentIntent>(EMPTY);
  const [errors, setErrors] = useState<Errors<InvestField>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = <K extends InvestField>(key: K, value: InvestmentIntent[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const open = () => {
    dialogRef.current?.showModal();
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input")?.focus());
  };

  const close = () => dialogRef.current?.close();

  const onClosed = () => {
    if (status === "done") {
      setValues(EMPTY);
      setStatus("idle");
    }
    setErrors({});
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validateInvest(values);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => focusFirstError(formRef.current));
      return;
    }
    setStatus("sending");
    // MVP: no backend yet (docs Q1, Q2). Simulate the request.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  };

  return (
    <>
      <button type="button" className="btn-primary" onClick={open}>
        Đầu tư vào hạt giống này
      </button>

      <dialog
        ref={dialogRef}
        onClose={onClosed}
        aria-labelledby="invest-title"
        className="m-auto scroll-pt-28 w-[min(640px,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] rounded-xl border border-line bg-surface p-0 text-ink shadow-[0_24px_80px_-20px_rgb(15_33_24/0.45)] backdrop:bg-ink/50"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface px-6 py-5">
          <div>
            <h2 id="invest-title" className="text-xl font-bold tracking-tight">Đồng hành cùng dự án</h2>
            <p className="mt-1 text-sm text-ink-soft">{seedTitle}</p>
          </div>
          <button type="button" onClick={close} className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line hover:border-ink" aria-label="Đóng">
            <X size={18} />
          </button>
        </div>

        {status === "done" ? (
          <div className="px-6 py-10" role="status">
            <CheckCircle size={40} weight="duotone" className="text-moss" aria-hidden />
            <p className="mt-4 text-2xl font-bold tracking-tight">Đã ghi nhận ý định đồng hành.</p>
            <p className="mt-2 max-w-[48ch] text-ink-soft">
              Đội MYSEED sẽ gửi email cho {values.email} để sắp xếp buổi gặp với người khởi xướng
              {values.createChat ? " và mở nhóm trao đổi chung" : ""}.
            </p>
            <button type="button" className="btn-ghost mt-8" onClick={close}>Đóng</button>
          </div>
        ) : (
          <form ref={formRef} noValidate onSubmit={submit} className="grid gap-6 px-6 py-6">
            <fieldset aria-describedby={describedBy("inv-role", errors.role)}>
              <legend className="label mb-3">Bạn tham gia với tư cách</legend>
              <div role="radiogroup" aria-label="Tư cách tham gia" aria-invalid={errors.role ? true : undefined} className="grid gap-2 sm:grid-cols-2">
                {INVEST_ROLES.map((r) => (
                  <label key={r.value} className="flex cursor-pointer items-center gap-3 rounded-[10px] border border-line px-3.5 py-3 has-[:checked]:border-moss has-[:checked]:bg-moss-tint">
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={values.role === r.value}
                      onChange={() => set("role", r.value)}
                      className="accent-[var(--moss)]"
                    />
                    <span className="text-[15px]">{r.label}</span>
                  </label>
                ))}
              </div>
              {errors.role && <p id="inv-role-error" className="field-error mt-2">{errors.role}</p>}
            </fieldset>

            <fieldset aria-describedby={describedBy("inv-exp", errors.expertise)}>
              <legend className="label mb-3">Chuyên môn bạn có thể góp</legend>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE.map((x) => {
                  const checked = values.expertise.includes(x);
                  return (
                    <label key={x} className="cursor-pointer rounded-full border border-line px-3.5 py-2 text-sm has-[:checked]:border-moss has-[:checked]:bg-moss has-[:checked]:text-moss-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        aria-invalid={errors.expertise ? true : undefined}
                        onChange={() =>
                          set("expertise", checked ? values.expertise.filter((y) => y !== x) : [...values.expertise, x])
                        }
                      />
                      {x}
                    </label>
                  );
                })}
              </div>
              {errors.expertise && <p id="inv-exp-error" className="field-error mt-2">{errors.expertise}</p>}
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="inv-name" label="Họ tên" error={errors.name}>
                <input id="inv-name" className="input" autoComplete="name" value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={errors.name ? true : undefined} aria-describedby={describedBy("inv-name", errors.name)} />
              </FormField>
              <FormField id="inv-email" label="Email" error={errors.email}>
                <input id="inv-email" type="email" className="input" autoComplete="email" value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy("inv-email", errors.email)} />
              </FormField>
            </div>

            <FormField id="inv-phone" label="Số điện thoại" optional error={errors.phone}>
              <input id="inv-phone" type="tel" className="input" autoComplete="tel" value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={errors.phone ? true : undefined} aria-describedby={describedBy("inv-phone", errors.phone)} />
            </FormField>

            <FormField id="inv-invites" label="Mời thêm người cùng tham gia" optional error={errors.invites}
              hint={`Nhập tối đa ${MAX_INVITES} email, cách nhau bằng dấu phẩy.`}>
              <textarea id="inv-invites" rows={2} className="input resize-y" value={values.invites}
                onChange={(e) => set("invites", e.target.value)}
                aria-invalid={errors.invites ? true : undefined} aria-describedby={describedBy("inv-invites", errors.invites, true)} />
            </FormField>

            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" className="mt-1 size-4 accent-[var(--moss)]" checked={values.createChat}
                onChange={(e) => set("createChat", e.target.checked)} />
              <span className="text-[15px]">
                Tạo nhóm chat chung với người khởi xướng và những người tôi mời
              </span>
            </label>

            <p className="rounded-[10px] bg-amber-tint px-4 py-3 text-sm text-ink">
              MYSEED chỉ ghi nhận ý định đồng hành. Không có khoản tiền nào được thu qua trang này.
            </p>

            <div className="flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
              <button type="button" className="btn-ghost" onClick={close}>Để sau</button>
              <button type="submit" className="btn-primary" disabled={status === "sending"}>
                {status === "sending" ? "Đang gửi..." : "Gửi ý định"}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}

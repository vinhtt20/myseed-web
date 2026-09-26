"use client";

import { useRef, useState, type FormEvent } from "react";
import { validateContact, type ContactMessage, type Errors } from "@/lib/validate";
import { FormField, describedBy, focusFirstError } from "./FormField";

const EMPTY: ContactMessage = { name: "", email: "", message: "" };

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors<keyof ContactMessage>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (key: keyof ContactMessage, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validateContact(values);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => focusFirstError(formRef.current));
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div role="status" className="rounded-xl bg-moss-tint p-6">
        <p className="text-lg font-bold">Đã nhận tin nhắn của bạn.</p>
        <p className="mt-1 text-ink-soft">Chúng tôi sẽ trả lời qua {values.email}.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={submit} className="grid gap-5" aria-label="Hỗ trợ trực tuyến">
      <FormField id="ct-name" label="Họ tên" error={errors.name}>
        <input id="ct-name" className="input" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)}
          aria-invalid={errors.name ? true : undefined} aria-describedby={describedBy("ct-name", errors.name)} />
      </FormField>
      <FormField id="ct-email" label="Email" error={errors.email}>
        <input id="ct-email" type="email" className="input" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)}
          aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy("ct-email", errors.email)} />
      </FormField>
      <FormField id="ct-message" label="Bạn cần hỗ trợ gì?" error={errors.message}>
        <textarea id="ct-message" rows={5} className="input resize-y" value={values.message} onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined} aria-describedby={describedBy("ct-message", errors.message)} />
      </FormField>
      <div>
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Đang gửi..." : "Gửi tin nhắn"}
        </button>
      </div>
    </form>
  );
}

import type { ReactNode } from "react";

/** Label above, hint and error below; the control receives ids via `describedBy`. */
export function FormField({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="font-normal text-ink-soft"> (không bắt buộc)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export const describedBy = (id: string, error?: string, hint?: boolean) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

/** Moves focus to the first invalid control after a failed submit. */
export function focusFirstError(form: HTMLFormElement | null) {
  const el = form?.querySelector<HTMLElement>('[aria-invalid="true"]');
  // Groups (e.g. a radiogroup) carry aria-invalid themselves; focus their first control.
  const target = el?.matches("input, select, textarea") ? el : el?.querySelector<HTMLElement>("input, select, textarea");
  target?.focus();
}

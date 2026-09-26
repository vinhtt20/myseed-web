"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";

export const NAV = [
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/vuon-uom", label: "Vườn Ươm" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  // Menu state is tied to the path it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((typeof next === "function" ? next(open) : next) ? pathname : null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-moss focus:px-4 focus:py-2 focus:text-moss-ink"
      >
        Bỏ qua điều hướng
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-ink" aria-label="MYSEED, về trang chủ">
          MY<span className="text-amber">SEED</span>
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-full px-3.5 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink aria-[current=page]:bg-moss-tint aria-[current=page]:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/gui-hat-giong" className="btn-primary hidden !py-2.5 sm:inline-flex">
            Gửi hạt giống
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="menu-di-dong"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-di-dong" aria-label="Điều hướng di động" className="border-t border-line bg-bg md:hidden">
          <ul className="container-page flex flex-col py-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block py-3 text-lg font-semibold text-ink aria-[current=page]:text-amber"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link href="/gui-hat-giong" className="btn-primary w-full">
                Gửi hạt giống
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

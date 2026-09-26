import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 md:py-36">
      <p className="text-sm font-semibold text-amber">Lỗi 404</p>
      <h1 className="mt-3 max-w-[18ch] text-4xl font-bold leading-tight tracking-tight md:text-6xl">
        Trang này chưa được gieo.
      </h1>
      <p className="mt-5 max-w-[46ch] text-lg text-ink-soft">
        Đường dẫn có thể đã đổi hoặc bị gõ nhầm. Bạn có thể quay về trang chủ hoặc xem Vườn Ươm.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Về trang chủ</Link>
        <Link href="/vuon-uom" className="btn-ghost">Xem Vườn Ươm</Link>
      </div>
    </div>
  );
}

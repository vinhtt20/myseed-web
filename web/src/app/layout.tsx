import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

// Vietnamese-designed sans with full diacritic coverage; chosen over Inter/Geist for this brand.
const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vinhtt20.github.io/myseed-web/"),
  title: { default: "MYSEED | Ươm lại ý tưởng cộng đồng bị bỏ quên", template: "%s | MYSEED" },
  description:
    "MYSEED tìm lại các dự án cộng đồng dang dở và kết nối chúng với người đồng hành phù hợp.",
  openGraph: { type: "website", locale: "vi_VN", siteName: "MYSEED" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1511" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="flex min-h-[100dvh] flex-col">
        <SiteHeader />
        <main id="noi-dung" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

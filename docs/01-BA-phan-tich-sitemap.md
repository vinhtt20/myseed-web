# MYSEED: Phân tích Sitemap (BA) và bàn giao cho Dev / QA

> Nguồn: `MYSEED - Sơ đồ Sitemap Website.html`
> Phiên bản tài liệu: 1.0 (26/09/2026)
> Người đọc: Senior Dev, QA/Tester, PO

---

## 1. Tóm tắt sản phẩm

MYSEED là nền tảng "ươm" các ý tưởng cộng đồng bị bỏ dở ("hạt giống bỏ quên"), kết nối người có ý tưởng với người đồng hành (nhà đầu tư, chuyên gia, tình nguyện viên) để đưa ý tưởng qua 5 bước: **Gửi, Tìm thấy, Ươm, Nảy mầm, Bén rễ**.

Mục tiêu chuyển đổi chính (theo thứ tự ưu tiên):

1. **Gửi hạt giống** (form ý tưởng) - CTA chính toàn site.
2. **Đầu tư / đồng hành** một dự án trong Vườn Ươm (modal đầu tư).
3. Đọc case study / tin tức để tạo niềm tin.
4. Liên hệ.

### Persona

| Persona | Mô tả | Hành trình chính |
|---|---|---|
| P1 Người gửi ý tưởng | Người dân địa phương, hợp tác xã, sinh viên có ý tưởng dở dang | Trang chủ → Cơ chế 5 bước → Gửi hạt giống |
| P2 Người đồng hành | Nhà đầu tư nhỏ, chuyên gia, doanh nghiệp CSR | Vườn Ươm → lọc lĩnh vực/khu vực → Chi tiết → Modal đầu tư |
| P3 Đối tác / báo chí | Tổ chức, truyền thông | Giới thiệu, Case study, Liên hệ |

---

## 2. Information Architecture và URL

Quy ước: slug tiếng Việt không dấu, kebab-case. Bộ lọc dùng query string để chia sẻ được link và back/forward hoạt động.

| # | Trang | Route | Loại |
|---|---|---|---|
| 1 | Trang chủ | `/` | Tĩnh (SSG) |
| 2 | Giới thiệu | `/gioi-thieu` (anchor: `#ve-chung-toi`, `#tam-nhin`, `#co-che`, `#sdgs`) | SSG |
| 3 | Vườn Ươm (danh sách) | `/vuon-uom?giai-doan=&linh-vuc=&khu-vuc=` | SSG + lọc client |
| 3a | Chi tiết dự án | `/vuon-uom/[slug]` | SSG (generateStaticParams) |
| 3b | Modal đầu tư | trong `/vuon-uom/[slug]`, chỉ giai đoạn **Bỏ Quên** | Client |
| 4 | Gửi hạt giống | `/gui-hat-giong` | Client form |
| 5 | Tin tức / Cẩm nang | `/tin-tuc?loai=` | SSG + lọc |
| 5a | Chi tiết bài | `/tin-tuc/[slug]` | SSG |
| 6 | Liên hệ | `/lien-he` | SSG |
| - | 404 | `not-found` | - |

Điều hướng chính (1 dòng trên desktop): Giới thiệu, Vườn Ươm, Tin tức, Liên hệ + nút **Gửi hạt giống**. Logo về Trang chủ.

---

## 3. Đặc tả từng trang

### 3.1 Trang chủ (7 dải D1-D7)

| Dải | Nội dung | Ghi chú Dev | Ghi chú thiết kế (anti-AI) |
|---|---|---|---|
| D1 Banner | Giới thiệu MYSEED, câu chuyện Hạt Giống 001, kêu gọi gửi ý tưởng | Sitemap ghi "Carousel". **Đề xuất: 1 hero tĩnh** + link câu chuyện 001 (carousel hero giảm chuyển đổi, khó a11y) | Hero chia đôi, ảnh thật, tối đa 4 phần tử chữ |
| D2 Giới thiệu ngắn + số liệu | Đoạn giới thiệu + 3-4 chỉ số | **Số liệu phải lấy từ dữ liệu thật**. Chưa có → đánh dấu minh họa | Không dùng số "tròn đẹp" giả |
| D3 Cơ chế 5 bước | Gửi, Tìm thấy, Ươm, Nảy mầm, Bén rễ | Dữ liệu tĩnh | Không dùng nhãn "Bước 1/2/3" |
| D4 Hạt giống nổi bật | Case Đắk Nông (Hạt Giống 001) | Link tới bài case study | Ảnh lớn full-width |
| D5 Vườn Ươm preview | Lưới dự án mới nhất (5 mục) | Sắp xếp `createdAt desc` | Link "Xem cả vườn ươm" |
| D6 Đối tác | Logo đối tác | Chỉ logo, không nhãn ngành | Chưa có logo thật → monogram tạm |
| D7 Footer + CTA | "Gửi hạt giống" | Dùng chung footer | Một nhãn CTA duy nhất toàn site |

### 3.2 Giới thiệu

- Về chúng tôi: Vai trò, Đội thực hiện (ảnh, tên, vai trò).
- Tầm nhìn, Sứ mệnh.
- Cơ chế vận hành chi tiết (mở rộng D3: ai làm gì ở từng bước).
- Liên kết SDGs: **SDG 1, 8, 12, 15** (dùng tên chính thức tiếng Việt).

### 3.3 Vườn Ươm (mục nổi bật)

**3 giai đoạn** (segmented control), mỗi giai đoạn lọc theo:

- Lĩnh vực (5): Nông sản và dược liệu bản địa; Thủ công và làng nghề; Tái chế và môi trường; Du lịch trải nghiệm bản địa; Công nghệ và giáo dục cộng đồng.
- Khu vực (3): Miền Bắc, Miền Trung, Miền Nam.

| Giai đoạn | slug | Hành động trên chi tiết |
|---|---|---|
| Hạt Giống Bỏ Quên | `bo-quen` | Nút **Đầu tư** → Modal đầu tư |
| Hạt Giống Đang Ươm | `dang-uom` | Theo dõi tiến độ (không có nút đầu tư, theo sitemap) |
| Phát Triển Thành Cây | `thanh-cay` | Xem kết quả |

**Chi tiết dự án**: tên, ảnh, lĩnh vực, khu vực, tỉnh, mô tả, vấn đề (lý do bỏ dở), giá trị bản địa, người khởi xướng, nút Đầu tư (chỉ `bo-quen`).

**Modal đầu tư** (4 nhóm trường theo sitemap):

1. Tư cách tham gia (radio): Nhà đầu tư cá nhân / Doanh nghiệp / Chuyên gia cố vấn / Tình nguyện viên.
2. Chuyên môn đóng góp (chọn nhiều).
3. Mời người tham gia (email, tối đa 5, tùy chọn).
4. Tạo nhóm chat (checkbox) + thông tin liên hệ người đầu tư (họ tên, email, SĐT).

### 3.4 Gửi hạt giống (form)

| Trường | Kiểu | Bắt buộc | Validate |
|---|---|---|---|
| Tên ý tưởng | text | Có | 5-120 ký tự |
| Mô tả | textarea | Có | 50-2000 ký tự |
| Lý do bỏ dở | textarea | Có | 20-1000 ký tự |
| Giá trị bản địa sẵn có | textarea | Có | 20-1000 ký tự |
| Lĩnh vực | select | Có | 1 trong 5 |
| Khu vực | select | Có | 1 trong 3 |
| Họ tên | text | Có | 2-80 ký tự |
| Email | email | Có (hoặc SĐT) | định dạng email |
| SĐT | tel | Có (hoặc email) | `^(0|\+84)\d{9,10}$` (bỏ khoảng trắng, dấu chấm) |
| Đồng ý xử lý dữ liệu | checkbox | Có | Theo Nghị định 13/2023/NĐ-CP |

> Lĩnh vực, Khu vực và Đồng ý dữ liệu **không có trong sitemap**, BA đề xuất thêm để dự án gửi lên phân loại được vào Vườn Ươm. Cần PO xác nhận (Q3).

### 3.5 Tin tức / Cẩm nang

Danh mục: Case Study, Tin tức nội bộ, Sự kiện. Case study đầu tiên: Hạt Giống 001 (Đắk Nông). Sự kiện có ngày, địa điểm.

### 3.6 Liên hệ

Hotline (link `tel:`), Hỗ trợ trực tuyến (form ngắn), Mạng xã hội (Facebook, Zalo, YouTube: chờ PO cung cấp link).

---

## 4. Mô hình dữ liệu

```ts
type Stage = "bo-quen" | "dang-uom" | "thanh-cay";
type Field = "nong-san" | "thu-cong" | "tai-che" | "du-lich" | "cong-nghe";
type Region = "bac" | "trung" | "nam";

interface Seed {
  slug: string; title: string; stage: Stage; field: Field; region: Region;
  province: string; summary: string; problem: string; localValue: string;
  founder: { name: string; role: string };
  image: string; createdAt: string; // ISO 8601, ví dụ "2026-08-14"
}

interface Article {
  slug: string; title: string; category: "case-study" | "tin-noi-bo" | "su-kien";
  excerpt: string; body: string[]; image: string; publishedAt: string; // ISO 8601
  event?: { date: string; place: string };
}

interface InvestmentIntent {
  seedSlug: string; role: "ca-nhan" | "doanh-nghiep" | "chuyen-gia" | "tinh-nguyen";
  expertise: string[]; invites: string[]; createChat: boolean;
  name: string; email: string; phone?: string;
}
```

API (giai đoạn 2, khi có backend): `POST /api/seeds`, `POST /api/investments`, `POST /api/contact`. MVP hiện tại: dữ liệu tĩnh trong `web/src/data`, form submit giả lập (không gửi dữ liệu ra ngoài).

---

## 5. Quy tắc nghiệp vụ

- BR-01: Nút Đầu tư **chỉ** hiển thị với dự án giai đoạn `bo-quen`.
- BR-02: Bộ lọc Vườn Ươm kết hợp AND (giai đoạn + lĩnh vực + khu vực). Không chọn = tất cả.
- BR-03: Trạng thái lọc phản ánh trên URL; tải lại trang giữ nguyên bộ lọc. Giá trị query không hợp lệ bị bỏ qua.
- BR-04: Không có kết quả → trạng thái rỗng + nút xóa lọc + link Gửi hạt giống.
- BR-05: Form Gửi hạt giống yêu cầu ít nhất 1 trong Email/SĐT.
- BR-06: Mời người tham gia tối đa 5 email hợp lệ, không trùng nhau, không trùng email người đầu tư.
- BR-07: Một nhãn CTA "Gửi hạt giống" dùng thống nhất toàn site.

---

## 6. Tiêu chí chấp nhận (cho QA)

- **AC-01 Điều hướng**: Given desktop 1280px, When tải bất kỳ trang, Then menu trên 1 dòng, cao ≤ 80px, mục hiện tại có `aria-current="page"`.
- **AC-02 Mobile nav**: Given 375px, When bấm nút menu, Then menu mở; Esc đóng và focus quay lại nút.
- **AC-03 Lọc Vườn Ươm**: Given `/vuon-uom`, When chọn "Đang Ươm" + "Miền Trung", Then URL chứa `giai-doan=dang-uom&khu-vuc=trung` và chỉ hiện dự án thỏa cả 2.
- **AC-04 Deep link**: Given mở trực tiếp URL có query lọc, Then UI bộ lọc hiển thị đúng trạng thái.
- **AC-05 Rỗng**: Given bộ lọc không có kết quả, Then hiển thị trạng thái rỗng và nút "Xóa bộ lọc" hoạt động.
- **AC-06 Nút đầu tư**: Given dự án `bo-quen`, Then có nút "Đầu tư"; dự án `dang-uom`/`thanh-cay` thì không.
- **AC-07 Modal đầu tư**: Mở modal → focus vào trường đầu tiên, focus bị giữ trong modal, Esc đóng; submit thiếu trường → lỗi inline dưới trường; submit hợp lệ → màn hình xác nhận.
- **AC-08 Form gửi hạt giống**: Submit rỗng → mọi trường bắt buộc báo lỗi, focus nhảy tới lỗi đầu tiên; điền hợp lệ → trạng thái đang gửi → thành công.
- **AC-09 Tin tức**: Lọc theo loại hoạt động; bài sự kiện hiện ngày và địa điểm.
- **AC-10 404**: URL sai → trang 404 có link về trang chủ.
- **AC-11 Dark mode**: Theo `prefers-color-scheme`; chữ đạt WCAG AA ở cả 2 chế độ.
- **AC-12 Reduced motion**: Bật `prefers-reduced-motion` → không có animation.

---

## 7. Yêu cầu phi chức năng

- Hiệu năng: LCP < 2.5s, CLS < 0.1, INP < 200ms (Lighthouse mobile).
- Truy cập: WCAG 2.2 AA, điều hướng bàn phím đầy đủ, `lang="vi"`.
- SEO: `title`/`description` riêng từng trang, Open Graph, `sitemap.xml`, `robots.txt`.
- Bảo mật (khi có backend): rate limit form, chống spam (honeypot/Turnstile), validate lại phía server.
- Pháp lý: Nghị định 13/2023/NĐ-CP về dữ liệu cá nhân.

---

## 8. Khoảng trống và câu hỏi mở cho PO

| # | Câu hỏi | Rủi ro nếu bỏ qua | Giả định đang dùng |
|---|---|---|---|
| Q1 | "Đầu tư" là góp tiền thật hay cam kết đồng hành? | **Pháp lý cao**: gọi vốn cộng đồng có quy định riêng tại VN | Chỉ ghi nhận **ý định** đồng hành, không thu tiền |
| Q2 | "Tạo nhóm chat" dùng nền tảng nào (Zalo, nội bộ)? | Cần backend + đăng nhập | Chỉ ghi nhận mong muốn, đội ngũ liên hệ sau |
| Q3 | Form gửi có cần Lĩnh vực/Khu vực/Đồng ý dữ liệu? | Không phân loại được | Đã thêm |
| Q4 | Số liệu D2 lấy từ đâu? | Số giả làm mất uy tín | Hiển thị nhãn "số liệu minh họa" |
| Q5 | Có cần tài khoản người dùng? | Ảnh hưởng kiến trúc | MVP không có đăng nhập |
| Q6 | Ai duyệt ý tưởng trước khi lên Vườn Ươm? | Nội dung rác | Cần CMS/admin ở giai đoạn 2 |
| Q7 | Logo đối tác, ảnh đội ngũ, ảnh dự án, link MXH, hotline thật | Placeholder lên production | Dùng placeholder (picsum) có đánh dấu |
| Q8 | "Hỗ trợ trực tuyến" là live chat hay form? | Chọn sai công cụ | Form ngắn |
| Q9 | Sitemap ghi "Case Đắk Nông", nhưng từ 2025 Đắk Nông đã sáp nhập vào Lâm Đồng. Ghi địa danh thế nào? | Thông tin sai hoặc gây nhầm | "Krông Nô, Lâm Đồng (Đắk Nông cũ)" |
| Q10 | D1 ghi "Carousel": có bắt buộc không? | Carousel hero giảm chuyển đổi và khó dùng với trình đọc màn hình | Dùng 1 hero tĩnh + nút "Đọc câu chuyện 001" |

---

## 9. Bàn giao cho Senior Dev

- Stack: Next.js 16 (App Router, RSC) + TypeScript + Tailwind v4 + Motion; icon Phosphor; font Be Vietnam Pro (qua `next/font`, subset `vietnamese`).
- Cấu trúc: `src/app/*` (route), `src/components/*`, `src/data/*` (dữ liệu tĩnh, sau thay bằng CMS), `src/lib/*` (filter, validate: hàm thuần, có unit test).
- Motion chỉ trong client component lá; tôn trọng reduced motion.
- `useSearchParams` phải bọc trong `<Suspense>` (yêu cầu build của Next 16).
- Giai đoạn 2: CMS (Payload/Sanity), API route + DB, admin duyệt ý tưởng, email thông báo, chống spam.

## 10. Bàn giao cho QA

- Test plan chi tiết: `docs/02-QA-test-plan.md`.
- Tự động: unit test (`web/src/lib/*.test.ts`, Vitest), E2E Playwright (`web/e2e/`) trên Chromium desktop + mobile.
- Thủ công: đọc soát tiếng Việt, dark mode, bàn phím, VoiceOver.

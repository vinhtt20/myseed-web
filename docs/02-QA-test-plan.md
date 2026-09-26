# MYSEED: QA Test Plan và kết quả kiểm thử

> Phiên bản 1.0 (26/09/2026). Đi kèm `01-BA-phan-tich-sitemap.md`.
> Phạm vi: bản MVP trong `web/` (Next.js 16, dữ liệu tĩnh, form giả lập, chưa có backend).

## 1. Cách chạy

```bash
cd web
npm install
npx playwright install chromium   # lần đầu
npm run dev                       # http://localhost:3000
npm run typecheck && npm run lint
npm test                          # unit (Vitest)
npm run build && npm run test:e2e # E2E (Playwright, tự chạy next start cổng 3100)
```

## 2. Chiến lược

| Tầng | Công cụ | Phạm vi | File |
|---|---|---|---|
| Static | TypeScript strict, ESLint (next + jsx-a11y + react-hooks) | Toàn bộ `src`, `e2e` | - |
| Unit | Vitest | Logic thuần: lọc, parse URL, validate form, toàn vẹn dữ liệu | `web/src/lib/*.test.ts` |
| E2E | Playwright, Chromium desktop 1280px + Pixel 7 | Luồng người dùng theo AC-01 đến AC-12 | `web/e2e/site.spec.ts` |
| Quality gate tự động | Playwright | Mỗi route: 0 lỗi console, đúng 1 `h1`, 0 em-dash, không cuộn ngang; mọi `img` có `alt` | `site.spec.ts` |
| Thủ công | Mắt người | Nội dung tiếng Việt, VoiceOver, ảnh thật | Mục 5 |

## 3. Ma trận truy vết AC → test

| AC | Nội dung | Test tự động | Kết quả |
|---|---|---|---|
| AC-01 | Nav 1 dòng, ≤ 80px, `aria-current` | `Navigation › AC-01` | Đạt |
| AC-02 | Menu mobile, Esc đóng, trả focus | `Navigation › AC-02` + "closes after navigating" | Đạt |
| AC-03 | Lọc giai đoạn + khu vực, URL cập nhật | `Vườn Ươm filters › AC-03` | Đạt (sau khi sửa BUG-02) |
| AC-04 | Deep link khôi phục bộ lọc | `AC-04` | Đạt |
| AC-05 | Trạng thái rỗng + xóa lọc | `AC-05` | Đạt |
| AC-06 | Nút Đầu tư chỉ ở `bo-quen` | `AC-06` + unit `canInvest` | Đạt |
| AC-07 | Modal: focus, Esc, validate, thành công | `AC-07` | Đạt |
| AC-08 | Form gửi: lỗi inline, focus lỗi đầu, sending, success | 2 test `AC-08` + unit `validateSeed` | Đạt |
| AC-09 | Lọc tin tức, thông tin sự kiện | `AC-09` | Đạt |
| AC-10 | 404 có link về trang chủ | `AC-10` + slug dự án sai trả 404 | Đạt |
| AC-11 | Dark mode | `AC-11` + soát ảnh chụp | Đạt |
| AC-12 | Reduced motion | `AC-12` | Đạt (sau khi sửa BUG-01) |
| BR-03 | Query không hợp lệ bị bỏ qua | unit `parseFilter` + E2E "invalid query values" | Đạt |
| BR-06 | Mời tối đa 5, không trùng, không mời chính mình | unit `validateInvest` | Đạt |

**Tổng kết lần chạy cuối:** 36/36 unit pass; 52/52 E2E pass (4 test bị skip có chủ đích vì chỉ áp dụng cho desktop hoặc mobile). Các test nhạy với async (AC-03/04/05/07/12) chạy lặp 5 lần: 50/50 pass, không flaky.

## 4. Bug phát hiện trong kiểm thử (đã sửa)

| ID | Mức | Mô tả | Nguyên nhân | Sửa | Test chặn tái phát |
|---|---|---|---|---|---|
| BUG-01 | Cao (a11y) | Bật "giảm chuyển động" nhưng nội dung vẫn fade/trượt vào | HTML render từ server đã có `opacity:0` trước khi client đọc được tùy chọn người dùng | Class `.reveal` + CSS `!important` dưới `prefers-reduced-motion`; hero không fade để bảo vệ LCP | `AC-12` |
| BUG-02 | Cao (chức năng) | Chọn giai đoạn rồi đổi khu vực nhanh thì mất bộ lọc giai đoạn | `router.replace` bất đồng bộ, lần đổi thứ 2 đọc URL cũ | Lưu bộ lọc mới nhất trong ref, các thao tác liên tiếp cộng dồn | `AC-03` (thao tác liên tiếp không chờ) |
| BUG-03 | Trung bình (UI) | Ảnh "Hạt giống nổi bật" trên trang chủ có chiều rộng 0, không hiển thị | Grid item chỉ có `col-span-8`, không có cột bắt đầu nên bị đẩy sang cột ngầm | Thêm `col-start-1` | "regression: featured seed image has real size" |
| BUG-04 | Thấp (UI) | Tiêu đề hero rớt 3 dòng ở desktop | Cỡ chữ quá lớn so với độ rộng cột | Giảm cỡ, nới `max-width` | "desktop hero headline wraps to at most 2 lines" |
| BUG-05 | Thấp (a11y) | Lỗi validate trong modal: radio bị header dính che khi focus | Thiếu scroll padding trong dialog | `scroll-pt-28` trên `<dialog>` | Soát thủ công |
| BUG-06 | Thấp (lint) | `setState` trong effect ở menu mobile gây render dây chuyền | Đóng menu theo pathname bằng effect | Gắn trạng thái mở với pathname | ESLint `react-hooks` |

## 5. Checklist thủ công (trước mỗi release)

- [ ] Đọc soát toàn bộ chữ tiếng Việt (dấu, chính tả, giọng văn thống nhất).
- [ ] VoiceOver (Safari macOS/iOS): đi hết form Gửi hạt giống và modal Đầu tư chỉ bằng bàn phím.
- [ ] Zoom 200%: không mất nội dung, không cuộn ngang.
- [ ] Safari iOS: thanh địa chỉ không làm nhảy hero (dùng `100dvh`).
- [ ] Lighthouse mobile trên bản deploy: LCP < 2.5s, CLS < 0.1, Accessibility ≥ 95.
- [ ] Thay toàn bộ ảnh picsum bằng ảnh thật trước khi ra mắt.

## 6. Rủi ro còn lại và ngoài phạm vi

- **Form chưa gửi dữ liệu đi đâu** (giả lập). Khi có backend cần thêm: test API, validate phía server, rate limit, chống spam, test email thông báo.
- **Ảnh là placeholder ngẫu nhiên** (picsum), không khớp nội dung dự án.
- **Liên hệ, logo đối tác, đội ngũ** đang hiển thị "Đang cập nhật" hoặc ô trống có nhãn, chờ PO (Q7).
- Chưa test trên Firefox/WebKit; nên thêm vào `playwright.config.ts` khi có CI.
- Dữ liệu dự án là mẫu, địa danh theo đơn vị hành chính sau sáp nhập tỉnh 2025. Cần PO xác nhận cách ghi (ví dụ "Krông Nô, Lâm Đồng (Đắk Nông cũ)").

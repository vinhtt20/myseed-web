# MYSEED web

Website MYSEED: ươm lại các dự án cộng đồng bị bỏ dở.

Bản chạy thử: https://vinhtt20.github.io/myseed-web/

| Thư mục | Nội dung |
|---|---|
| `web/` | Code (Next.js 16, Tailwind v4, Motion), xuất HTML tĩnh cho GitHub Pages |
| `docs/01-BA-phan-tich-sitemap.md` | Phân tích sitemap, đặc tả, tiêu chí nghiệm thu, câu hỏi mở cho PO |
| `docs/02-QA-test-plan.md` | Kế hoạch kiểm thử, ma trận AC, bug đã sửa, checklist thủ công |
| `MYSEED - Sơ đồ Sitemap Website.html` | Sitemap gốc |

## Chạy ở máy

```bash
cd web
npm install
npm run dev        # http://localhost:3000
npm test           # unit test
npm run build && npm run test:e2e   # E2E (lần đầu: npx playwright install chromium)
```

## Deploy

Mỗi lần push lên `main`, GitHub Actions (`.github/workflows/deploy.yml`) chạy lint và unit test, build với `GITHUB_PAGES=true` (đường dẫn gốc `/myseed-web`) rồi đưa lên GitHub Pages.

Nội dung dự án, ảnh và thông tin liên hệ hiện là dữ liệu mẫu, chờ PO cung cấp bản thật (xem mục 8 trong tài liệu BA).

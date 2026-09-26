import { expect, test } from "@playwright/test";

const isMobile = (name: string) => name === "mobile";

test.describe("Navigation", () => {
  test("AC-01 desktop nav fits one line, marks current page", async ({ page }, info) => {
    test.skip(isMobile(info.project.name), "desktop only");
    await page.goto("/vuon-uom");
    const nav = page.getByRole("navigation", { name: "Điều hướng chính" });
    await expect(nav.getByRole("link", { name: "Vườn Ươm" })).toHaveAttribute("aria-current", "page");
    const header = await page.locator("header").first().boundingBox();
    expect(header!.height).toBeLessThanOrEqual(80);
    const tops = await nav.getByRole("link").evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
    expect(new Set(tops).size).toBe(1);
  });

  test("AC-02 mobile menu opens, closes on Esc and returns focus", async ({ page }, info) => {
    test.skip(!isMobile(info.project.name), "mobile only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Mở menu" });
    await toggle.click();
    await expect(page.locator("#menu-di-dong")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#menu-di-dong")).toBeHidden();
    await expect(page.getByRole("button", { name: "Mở menu" })).toBeFocused();
  });

  test("mobile menu closes after navigating", async ({ page }, info) => {
    test.skip(!isMobile(info.project.name), "mobile only");
    await page.goto("/");
    await page.getByRole("button", { name: "Mở menu" }).click();
    await page.locator("#menu-di-dong").getByRole("link", { name: "Tin tức" }).click();
    await expect(page).toHaveURL(/\/tin-tuc$/);
    await expect(page.locator("#menu-di-dong")).toBeHidden();
  });

  test("desktop hero headline wraps to at most 2 lines", async ({ page }, info) => {
    test.skip(isMobile(info.project.name), "desktop only");
    await page.goto("/");
    const lines = await page.getByRole("heading", { level: 1 }).evaluate((el) => {
      const lh = parseFloat(getComputedStyle(el).lineHeight);
      return Math.round(el.getBoundingClientRect().height / lh);
    });
    expect(lines).toBeLessThanOrEqual(2);
  });

  test("regression: featured seed image has real size", async ({ page }) => {
    await page.goto("/");
    const img = page.getByRole("img", { name: "Mắc ca sấy lạnh của nhóm phụ nữ Krông Nô" }).first();
    await img.scrollIntoViewIfNeeded();
    const box = await img.boundingBox();
    expect(box!.width).toBeGreaterThan(200);
  });

  test("home hero shows headline and primary CTA without scrolling", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
    await expect(page.getByRole("main").getByRole("link", { name: "Gửi hạt giống" }).first()).toBeInViewport();
  });
});

test.describe("Vườn Ươm filters", () => {
  test("AC-03 stage + region filter updates URL and results", async ({ page }) => {
    await page.goto("/vuon-uom");
    await page.getByRole("button", { name: "Hạt Giống Đang Ươm" }).click();
    await page.getByLabel("Khu vực").selectOption("trung");
    await expect(page).toHaveURL(/giai-doan=dang-uom/);
    await expect(page).toHaveURL(/khu-vuc=trung/);
    const cards = page.getByTestId("seed-card");
    await expect(cards.first()).toBeVisible();
    for (const card of await cards.all()) await expect(card).toContainText("Đang ươm");
  });

  test("AC-04 deep link restores filter UI", async ({ page }) => {
    await page.goto("/vuon-uom?giai-doan=bo-quen&linh-vuc=tai-che");
    await expect(page.getByRole("button", { name: "Hạt Giống Bỏ Quên" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByLabel("Lĩnh vực")).toHaveValue("tai-che");
    await expect(page.getByTestId("result-count")).toHaveText("1 dự án");
  });

  test("AC-05 empty state and clear filters", async ({ page }) => {
    await page.goto("/vuon-uom?giai-doan=thanh-cay&linh-vuc=cong-nghe");
    await expect(page.getByTestId("empty-state")).toBeVisible();
    await page.getByTestId("empty-state").getByRole("button", { name: "Xóa bộ lọc" }).click();
    await expect(page).toHaveURL(/\/vuon-uom$/);
    await expect(page.getByTestId("result-count")).toHaveText("13 dự án");
  });

  test("invalid query values are ignored", async ({ page }) => {
    await page.goto("/vuon-uom?giai-doan=abc&khu-vuc=%3Cscript%3E");
    await expect(page.getByTestId("result-count")).toHaveText("13 dự án");
  });
});

test.describe("Seed detail and invest dialog", () => {
  test("AC-06 invest button only on forgotten seeds", async ({ page }) => {
    await page.goto("/vuon-uom/mac-ca-say-lanh-krong-no");
    await expect(page.getByRole("button", { name: "Đầu tư vào hạt giống này" })).toHaveCount(0);
    await expect(page.getByTestId("no-invest-note")).toBeVisible();
    await page.goto("/vuon-uom/ghe-nhua-cu-lao-cham");
    await expect(page.getByRole("button", { name: "Đầu tư vào hạt giống này" })).toBeVisible();
  });

  test("AC-07 dialog focus, validation, Esc and success", async ({ page }) => {
    await page.goto("/vuon-uom/ghe-nhua-cu-lao-cham");
    const trigger = page.getByRole("button", { name: "Đầu tư vào hạt giống này" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Đồng hành cùng dự án" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("radio").first()).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await dialog.getByRole("button", { name: "Gửi ý định" }).click();
    await expect(dialog.getByText("Vui lòng chọn tư cách tham gia.")).toBeVisible();
    await expect(dialog.getByText("Vui lòng nhập email.")).toBeVisible();

    await dialog.getByText("Chuyên gia cố vấn").click();
    await dialog.getByText("Pháp lý", { exact: true }).click();
    await dialog.getByLabel("Họ tên").fill("Trần Minh Quân");
    await dialog.getByLabel("Email").fill("quan@example.com");
    await dialog.getByLabel(/Mời thêm người/).fill("a@x.vn, a@x.vn");
    await dialog.getByRole("button", { name: "Gửi ý định" }).click();
    await expect(dialog.getByText("Danh sách có email bị trùng.")).toBeVisible();

    await dialog.getByLabel(/Mời thêm người/).fill("a@x.vn, b@x.vn");
    await dialog.getByRole("button", { name: "Gửi ý định" }).click();
    await expect(dialog.getByText("Đã ghi nhận ý định đồng hành.")).toBeVisible();
  });
});

test.describe("Gửi hạt giống form", () => {
  test("AC-08 empty submit shows inline errors and focuses first", async ({ page }) => {
    await page.goto("/gui-hat-giong");
    await page.getByRole("button", { name: "Gửi hạt giống" }).last().click();
    await expect(page.getByLabel("Tên ý tưởng")).toBeFocused();
    await expect(page.getByLabel("Tên ý tưởng")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Vui lòng chọn lĩnh vực.")).toBeVisible();
    await expect(page.getByText("Bạn cần đồng ý để chúng tôi liên hệ lại.")).toBeVisible();
    await expect(page.getByText("Cần ít nhất email hoặc số điện thoại.").first()).toBeVisible();
  });

  test("AC-08 valid submit goes through sending to success", async ({ page }) => {
    await page.goto("/gui-hat-giong");
    await page.getByLabel("Tên ý tưởng").fill("Vườn thuốc nam bản Dao");
    await page.getByLabel("Mô tả ngắn").fill("Ghi chép và trồng lại các loài cây thuốc mà người lớn tuổi trong bản vẫn dùng hằng ngày.");
    await page.getByLabel("Vì sao ý tưởng bị bỏ dở?").fill("Người dẫn dắt nhóm ốm nặng và chưa ai thay.");
    await page.getByLabel("Giá trị bản địa sẵn có").fill("Còn năm người biết cây thuốc và có đất đồi.");
    await page.getByLabel("Lĩnh vực").selectOption("nong-san");
    await page.getByLabel("Khu vực").selectOption("bac");
    await page.getByLabel("Họ tên").fill("Triệu Thị Mẩy");
    await page.getByLabel(/Số điện thoại/).fill("0912 345 678");
    await page.getByLabel(/Tôi đồng ý/).check();
    await page.getByRole("button", { name: "Gửi hạt giống" }).last().click();
    await expect(page.getByRole("button", { name: "Đang gửi..." })).toBeVisible();
    await expect(page.getByTestId("seed-success")).toContainText("Hạt giống đã được gửi.");
  });
});

test.describe("Tin tức", () => {
  test("AC-09 category filter and event details", async ({ page }) => {
    await page.goto("/tin-tuc");
    await page.getByRole("button", { name: "Sự kiện" }).click();
    await expect(page).toHaveURL(/loai=su-kien/);
    await expect(page.getByTestId("article-card")).toHaveCount(2);
    await page.getByRole("link", { name: "Ngày hội Hạt Giống tại Đà Nẵng" }).click();
    await expect(page.getByTestId("event-info")).toContainText("18/10/2026");
  });
});

test("AC-10 unknown URL renders 404 with a way home", async ({ page }) => {
  const res = await page.goto("/khong-ton-tai");
  expect(res?.status()).toBe(404);
  await page.getByRole("link", { name: "Về trang chủ", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("unknown seed slug returns 404", async ({ page }) => {
  const res = await page.goto("/vuon-uom/khong-co");
  expect(res?.status()).toBe(404);
});

test.describe("Quality gates", () => {
  const ROUTES = ["/", "/gioi-thieu", "/vuon-uom", "/gui-hat-giong", "/tin-tuc", "/lien-he", "/vuon-uom/ghe-nhua-cu-lao-cham", "/tin-tuc/hat-giong-001-krong-no"];

  for (const route of ROUTES) {
    test(`${route}: no console errors, one h1, no em-dash, no horizontal scroll`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1")).toHaveCount(1);
      const text = await page.locator("body").innerText();
      expect(text).not.toMatch(/[—–]/);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  test("AC-12 reduced motion renders content without transforms", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    // Check a below-the-fold block immediately after scrolling: no fade, no slide.
    const steps = page.getByRole("heading", { name: "Từ hạt giống bị quên đến cây tự đứng." });
    await steps.scrollIntoViewIfNeeded();
    const style = await steps.evaluate((el) => {
      const s = getComputedStyle(el.closest(".reveal")!);
      return { opacity: s.opacity, transform: s.transform };
    });
    expect(style).toEqual({ opacity: "1", transform: "none" });
    await ctx.close();
  });

  test("AC-11 dark mode switches surface colors", async ({ browser }) => {
    const ctx = await browser.newContext({ colorScheme: "dark" });
    const page = await ctx.newPage();
    await page.goto("/");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe("rgb(15, 21, 17)");
    await ctx.close();
  });

  test("every image has alt attribute", async ({ page }) => {
    for (const route of ["/", "/vuon-uom", "/tin-tuc"]) {
      await page.goto(route);
      const missing = await page.locator("img:not([alt])").count();
      expect(missing, route).toBe(0);
    }
  });
});

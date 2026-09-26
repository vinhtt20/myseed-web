export const STAGES = [
  { slug: "bo-quen", label: "Hạt Giống Bỏ Quên", short: "Bỏ quên" },
  { slug: "dang-uom", label: "Hạt Giống Đang Ươm", short: "Đang ươm" },
  { slug: "thanh-cay", label: "Phát Triển Thành Cây", short: "Thành cây" },
] as const;

export const FIELDS = [
  { slug: "nong-san", label: "Nông sản và dược liệu bản địa" },
  { slug: "thu-cong", label: "Thủ công và làng nghề" },
  { slug: "tai-che", label: "Tái chế và môi trường" },
  { slug: "du-lich", label: "Du lịch trải nghiệm bản địa" },
  { slug: "cong-nghe", label: "Công nghệ và giáo dục cộng đồng" },
] as const;

export const REGIONS = [
  { slug: "bac", label: "Miền Bắc" },
  { slug: "trung", label: "Miền Trung" },
  { slug: "nam", label: "Miền Nam" },
] as const;

export type Stage = (typeof STAGES)[number]["slug"];
export type Field = (typeof FIELDS)[number]["slug"];
export type Region = (typeof REGIONS)[number]["slug"];

export const labelOf = {
  stage: (s: Stage) => STAGES.find((x) => x.slug === s)!.label,
  stageShort: (s: Stage) => STAGES.find((x) => x.slug === s)!.short,
  field: (f: Field) => FIELDS.find((x) => x.slug === f)!.label,
  region: (r: Region) => REGIONS.find((x) => x.slug === r)!.label,
};

export const INVEST_ROLES = [
  { value: "ca-nhan", label: "Nhà đầu tư cá nhân" },
  { value: "doanh-nghiep", label: "Doanh nghiệp" },
  { value: "chuyen-gia", label: "Chuyên gia cố vấn" },
  { value: "tinh-nguyen", label: "Tình nguyện viên" },
] as const;

export const EXPERTISE = [
  "Vốn",
  "Kỹ thuật sản xuất",
  "Bán hàng và thị trường",
  "Truyền thông",
  "Pháp lý",
  "Quản trị hợp tác xã",
] as const;

export type InvestRole = (typeof INVEST_ROLES)[number]["value"];

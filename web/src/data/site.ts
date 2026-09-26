// Real contact details are pending from the PO (docs Q7). Empty values render as "Đang cập nhật".
export const CONTACT: {
  hotline: string | null;
  hotlineTel: string | null;
  email: string | null;
  socials: { label: string; href: string | null }[];
} = {
  hotline: null,
  hotlineTel: null,
  email: null,
  socials: [
    { label: "Facebook", href: null },
    { label: "Zalo", href: null },
    { label: "YouTube", href: null },
  ],
};

export const PENDING = "Đang cập nhật";

export const STEPS = [
  {
    verb: "Gửi",
    text: "Ai biết về một dự án dang dở cũng có thể gửi hồ sơ qua trang web.",
    who: "Người dân, hợp tác xã, giáo viên, cán bộ xã",
  },
  {
    verb: "Tìm thấy",
    text: "Đội thực địa đến tận nơi, gặp người khởi xướng và ghi lại vì sao dự án dừng.",
    who: "Đội thực địa MYSEED",
  },
  {
    verb: "Ươm",
    text: "Dự án lên Vườn Ươm để người đồng hành chọn góp vốn, kỹ năng hoặc thời gian.",
    who: "Nhà đầu tư, chuyên gia, tình nguyện viên",
  },
  {
    verb: "Nảy mầm",
    text: "Dự án chạy lại với một mục tiêu nhỏ, đo được trong 3 đến 6 tháng.",
    who: "Người khởi xướng và người đồng hành",
  },
  {
    verb: "Bén rễ",
    text: "Cộng đồng tự vận hành. MYSEED lùi lại và chỉ theo dõi định kỳ.",
    who: "Cộng đồng địa phương",
  },
] as const;

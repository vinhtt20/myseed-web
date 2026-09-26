// Sample content for the MVP. Replace with CMS data before launch.
export const ARTICLE_CATEGORIES = [
  { slug: "case-study", label: "Case study" },
  { slug: "tin-noi-bo", label: "Tin tức nội bộ" },
  { slug: "su-kien", label: "Sự kiện" },
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]["slug"];

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  body: string[];
  image: string;
  publishedAt: string;
  event?: { date: string; place: string };
}

const img = (seed: string) => `https://picsum.photos/seed/myseed-${seed}/1400/900`;

export const ARTICLES: Article[] = [
  {
    slug: "hat-giong-001-krong-no",
    title: "Hạt Giống 001: chiếc máy sấy hỏng và mười hai hộ mắc ca",
    category: "case-study",
    excerpt:
      "Dự án đầu tiên MYSEED tìm thấy dừng lại vì một bo mạch giá chưa tới năm triệu đồng.",
    body: [
      "Năm 2022, nhóm phụ nữ ở Krông Nô góp tiền mua một máy sấy lạnh để bán mắc ca đã tách vỏ. Hai tháng sau, bo mạch điều khiển cháy. Đơn hàng đầu tiên bị hủy và nhóm quay lại bán hạt tươi cho thương lái.",
      "Khi đội MYSEED đến, máy sấy vẫn nằm trong nhà xưởng, được phủ bạt cẩn thận. Chị H'Bia Niê giữ lại toàn bộ sổ ghi chép đơn hàng, giá thu mua và danh sách khách từng hỏi mua.",
      "Chúng tôi kết nối nhóm với một kỹ sư điện lạnh ở Buôn Ma Thuột và một cửa hàng đồ khô tại TP. Hồ Chí Minh cần nguồn mắc ca có truy xuất nguồn gốc. Máy chạy lại sau 11 ngày.",
      "Hạt Giống 001 hiện ở giai đoạn Đang Ươm. Việc tiếp theo là làm hồ sơ công bố sản phẩm và thiết kế bao bì.",
    ],
    image: img("article-krong-no"),
    publishedAt: "2026-05-12",
  },
  {
    slug: "mo-vong-tim-kiem-mien-tay",
    title: "Mở vòng tìm kiếm hạt giống ở miền Tây",
    category: "tin-noi-bo",
    excerpt: "Đội thực địa sẽ đi qua các tỉnh đồng bằng sông Cửu Long trong tháng 10.",
    body: [
      "Từ tháng 10, đội thực địa của MYSEED bắt đầu vòng tìm kiếm tại đồng bằng sông Cửu Long, tập trung vào các dự án tái chế và nông sản từng bị bỏ dở.",
      "Nếu bạn biết một dự án như vậy, hãy gửi thông tin qua trang Gửi hạt giống. Chúng tôi đọc từng hồ sơ.",
    ],
    image: img("article-mekong"),
    publishedAt: "2026-09-08",
  },
  {
    slug: "cap-nhat-gom-bau-truc",
    title: "Gốm Bàu Trúc giảm tỷ lệ vỡ khi vận chuyển",
    category: "tin-noi-bo",
    excerpt: "Hộp giấy tổ ong do sinh viên thiết kế giúp đơn hàng đầu tiên tới Hà Nội nguyên vẹn.",
    body: [
      "Sau ba lần thử, nhóm nghệ nhân chọn hộp giấy tổ ong có vách ngăn riêng cho từng sản phẩm.",
      "Đơn hàng thử nghiệm 24 chiếc gửi ra Hà Nội đã tới nơi không vỡ chiếc nào.",
    ],
    image: img("article-pottery"),
    publishedAt: "2026-07-26",
  },
  {
    slug: "ngay-hoi-hat-giong-da-nang",
    title: "Ngày hội Hạt Giống tại Đà Nẵng",
    category: "su-kien",
    excerpt: "Gặp người khởi xướng các dự án miền Trung và nghe họ kể lý do từng dừng lại.",
    body: [
      "Ngày hội gồm phần trình bày ngắn của 8 dự án, khu trưng bày sản phẩm và buổi ghép cặp với người đồng hành.",
      "Vào cửa tự do, cần đăng ký trước để ban tổ chức chuẩn bị chỗ ngồi.",
    ],
    image: img("article-danang-event"),
    publishedAt: "2026-09-15",
    event: { date: "2026-10-18", place: "Nhà Văn hóa Thanh niên, Đà Nẵng" },
  },
  {
    slug: "workshop-dinh-gia-tour",
    title: "Workshop: định giá tour trải nghiệm cộng đồng",
    category: "su-kien",
    excerpt: "Buổi làm việc thực hành cho các nhóm du lịch cộng đồng đang ươm.",
    body: [
      "Workshop hướng dẫn cách tính chi phí thật của một tour, gồm bảo hiểm, người dẫn và phần chia cho cộng đồng.",
    ],
    image: img("article-workshop"),
    publishedAt: "2026-08-30",
    event: { date: "2026-11-08", place: "Trực tuyến qua Google Meet" },
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

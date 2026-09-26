import type { Field, Region, Stage } from "./taxonomy";

// Sample content for the MVP. Replace with CMS data before launch (see docs Q6, Q7).
// Province names follow the 2025 provincial merger.
export interface Seed {
  slug: string;
  code: string;
  title: string;
  stage: Stage;
  field: Field;
  region: Region;
  place: string;
  summary: string;
  problem: string;
  localValue: string;
  founder: { name: string; role: string };
  image: string;
  createdAt: string;
}

const img = (seed: string, w = 1200, h = 900) =>
  `https://picsum.photos/seed/myseed-${seed}/${w}/${h}`;

export const SEEDS: Seed[] = [
  {
    slug: "mac-ca-say-lanh-krong-no",
    code: "001",
    title: "Mắc ca sấy lạnh của nhóm phụ nữ Krông Nô",
    stage: "dang-uom",
    field: "nong-san",
    region: "trung",
    place: "Krông Nô, Lâm Đồng (Đắk Nông cũ)",
    summary:
      "Mười hai hộ gia đình góp máy sấy lạnh để bán mắc ca đã tách vỏ thay vì bán hạt tươi cho thương lái.",
    problem:
      "Năm 2022 máy sấy hỏng bo mạch, nhóm không có tiền sửa và mất đơn hàng đầu tiên. Dự án dừng hơn hai năm.",
    localValue:
      "Vườn mắc ca đã cho trái ổn định, phụ nữ trong nhóm quen phân loại hạt và có sẵn nhà xưởng nhỏ.",
    founder: { name: "H'Bia Niê", role: "Trưởng nhóm sản xuất" },
    image: img("krong-no-macadamia"),
    createdAt: "2026-02-10",
  },
  {
    slug: "vuon-thuoc-nam-ba-vi",
    code: "014",
    title: "Vườn thuốc nam của người Dao ở Ba Vì",
    stage: "bo-quen",
    field: "nong-san",
    region: "bac",
    place: "Ba Vì, Hà Nội",
    summary:
      "Ghi chép và trồng lại 40 loài cây thuốc mà các bà trong bản vẫn dùng để tắm và xông.",
    problem:
      "Người dẫn dắt nhóm ốm nặng, các bài thuốc chưa được ghi lại nên nhóm không biết tiếp tục từ đâu.",
    localValue:
      "Còn năm người lớn tuổi nhận biết cây thuốc và một khoảnh đất đồi sẵn sàng cho mượn.",
    founder: { name: "Triệu Thị Mẩy", role: "Người khởi xướng" },
    image: img("ba-vi-herbs"),
    createdAt: "2026-08-21",
  },
  {
    slug: "nuoc-mam-nhi-sa-huynh",
    code: "017",
    title: "Nước mắm nhĩ đóng chai của làng Sa Huỳnh",
    stage: "bo-quen",
    field: "nong-san",
    region: "trung",
    place: "Đức Phổ, Quảng Ngãi",
    summary: "Bốn lò ủ chượp muốn bán nước mắm nhĩ có truy xuất nguồn gốc cho nhà hàng.",
    problem:
      "Không đủ tiền làm hồ sơ công bố chất lượng nên chưa bán được qua kênh chính thức.",
    localValue: "Nghề ủ chượp hơn một trăm năm, cá cơm đánh bắt ngay trong vùng.",
    founder: { name: "Phạm Văn Lượm", role: "Chủ lò ủ" },
    image: img("sa-huynh-fish-sauce"),
    createdAt: "2026-08-02",
  },
  {
    slug: "may-tre-dan-phu-vinh",
    code: "019",
    title: "Đơn hàng mây tre nhỏ cho làng Phú Vinh",
    stage: "bo-quen",
    field: "thu-cong",
    region: "bac",
    place: "Chương Mỹ, Hà Nội",
    summary: "Nhận đơn số lượng ít từ các cửa hàng thiết kế thay vì chỉ làm hàng khối cho xưởng lớn.",
    problem:
      "Thợ trẻ bỏ đi làm công nhân, nhóm thiếu người chụp ảnh và trả lời khách trên mạng.",
    localValue: "Hơn 30 thợ lành nghề, nguồn mây giang ổn định từ các tỉnh lân cận.",
    founder: { name: "Nguyễn Thị Hiền", role: "Tổ trưởng tổ đan" },
    image: img("phu-vinh-rattan"),
    createdAt: "2026-07-18",
  },
  {
    slug: "ghe-nhua-cu-lao-cham",
    code: "022",
    title: "Ghế ngồi từ nhựa vớt ở Cù Lao Chàm",
    stage: "bo-quen",
    field: "tai-che",
    region: "trung",
    place: "Cù Lao Chàm, Đà Nẵng",
    summary: "Ép nhựa vớt từ biển thành ghế đá cho các điểm dừng chân trên đảo.",
    problem: "Máy ép thuê bị thu hồi, nhựa gom được vẫn chất trong kho hội phụ nữ.",
    localValue: "Nhóm ngư dân đã quen phân loại nhựa, xã đảo sẵn sàng đặt 20 ghế.",
    founder: { name: "Huỳnh Tấn Lực", role: "Tổ trưởng tổ gom rác biển" },
    image: img("cu-lao-cham-plastic"),
    createdAt: "2026-06-29",
  },
  {
    slug: "tour-rung-ngap-man-can-gio",
    code: "025",
    title: "Tour đi bộ rừng ngập mặn do ngư dân dẫn",
    stage: "bo-quen",
    field: "du-lich",
    region: "nam",
    place: "Cần Giờ, TP. Hồ Chí Minh",
    summary: "Ngư dân dẫn khách đi bộ và đi xuồng qua rừng đước lúc nước ròng.",
    problem: "Chưa có bảo hiểm cho khách và chưa biết cách định giá tour.",
    localValue: "Người dẫn thuộc lòng lịch con nước và biết chỗ quan sát chim.",
    founder: { name: "Lê Văn Tới", role: "Ngư dân" },
    image: img("can-gio-mangrove"),
    createdAt: "2026-06-11",
  },
  {
    slug: "lop-tin-hoc-mu-cang-chai",
    code: "027",
    title: "Lớp tin học cuối tuần cho trẻ vùng cao",
    stage: "bo-quen",
    field: "cong-nghe",
    region: "bac",
    place: "Mù Cang Chải, Lào Cai",
    summary: "Dạy trẻ gõ bàn phím, tra cứu an toàn và làm bài thuyết trình đơn giản.",
    problem: "Sáu máy tính cũ được tặng đã hỏng ổ cứng, giáo viên tình nguyện chuyển công tác.",
    localValue: "Nhà văn hóa bản có điện ổn định và có wifi từ trạm y tế.",
    founder: { name: "Giàng A Dế", role: "Giáo viên tiểu học" },
    image: img("mu-cang-chai-class"),
    createdAt: "2026-05-30",
  },
  {
    slug: "gom-bau-truc-ban-truc-tuyen",
    code: "008",
    title: "Gốm Bàu Trúc bán trực tuyến",
    stage: "dang-uom",
    field: "thu-cong",
    region: "trung",
    place: "Ninh Phước, Khánh Hòa",
    summary: "Ba nghệ nhân Chăm chụp ảnh sản phẩm và tự đóng gói giao hàng toàn quốc.",
    problem: "Tỷ lệ vỡ khi vận chuyển quá cao khiến nhóm lỗ và dừng bán.",
    localValue: "Kỹ thuật nặn không bàn xoay được UNESCO ghi danh.",
    founder: { name: "Đàng Thị Phương", role: "Nghệ nhân" },
    image: img("bau-truc-pottery"),
    createdAt: "2026-04-15",
  },
  {
    slug: "bao-bi-la-chuoi-cai-rang",
    code: "011",
    title: "Bao bì lá chuối cho chợ nổi Cái Răng",
    stage: "dang-uom",
    field: "tai-che",
    region: "nam",
    place: "Cái Răng, Cần Thơ",
    summary: "Thay túi ni lông bằng lá chuối và dây lác cho các ghe bán trái cây.",
    problem: "Tiểu thương ngại vì lá héo nhanh, chưa có cách bảo quản qua ngày.",
    localValue: "Vườn chuối ven sông dư lá, dây lác có sẵn ở các xã lân cận.",
    founder: { name: "Trần Thị Mỹ Duyên", role: "Tiểu thương" },
    image: img("cai-rang-banana-leaf"),
    createdAt: "2026-03-22",
  },
  {
    slug: "thu-vien-so-truong-lang",
    code: "012",
    title: "Thư viện số cho trường làng",
    stage: "dang-uom",
    field: "cong-nghe",
    region: "nam",
    place: "Mỏ Cày, Vĩnh Long",
    summary: "Máy chủ nhỏ chạy ngoại tuyến chứa sách giáo khoa, truyện và video bài giảng.",
    problem: "Nhóm sinh viên làm dự án đã tốt nghiệp, không ai bảo trì phần mềm.",
    localValue: "Hội phụ huynh sẵn sàng đóng góp tiền điện, trường có phòng máy.",
    founder: { name: "Võ Minh Khang", role: "Cựu sinh viên kỹ thuật" },
    image: img("mo-cay-library"),
    createdAt: "2026-03-05",
  },
  {
    slug: "det-tho-cam-ban-lac",
    code: "003",
    title: "Dệt thổ cẩm bản Lác theo đơn đặt trước",
    stage: "thanh-cay",
    field: "thu-cong",
    region: "bac",
    place: "Mai Châu, Phú Thọ",
    summary: "Tổ dệt nhận đơn đặt trước qua trang riêng, khách chọn hoa văn và chờ ba tuần.",
    problem: "Từng ngừng vì hàng tồn kho quá lớn khi dệt sẵn theo mùa du lịch.",
    localValue: "Hai mươi khung dệt tại nhà, hoa văn Thái trắng riêng của bản.",
    founder: { name: "Lò Thị Xuân", role: "Tổ trưởng tổ dệt" },
    image: img("mai-chau-weaving"),
    createdAt: "2025-11-20",
  },
  {
    slug: "lang-rau-tra-que",
    code: "005",
    title: "Một buổi làm nông ở làng rau Trà Quế",
    stage: "thanh-cay",
    field: "du-lich",
    region: "trung",
    place: "Hội An, Đà Nẵng",
    summary: "Khách cuốc đất, bón rong và nấu bữa trưa cùng gia đình trồng rau.",
    problem: "Các hộ tự làm riêng lẻ, giá lộn xộn và khách phàn nàn.",
    localValue: "Rau trồng bằng rong vớt từ sông Cổ Cò, cách phố cổ 3 km.",
    founder: { name: "Nguyễn Văn Đực", role: "Nông dân" },
    image: img("tra-que-vegetables"),
    createdAt: "2025-10-08",
  },
  {
    slug: "phan-vi-sinh-vo-tom",
    code: "006",
    title: "Phân bón vi sinh từ vỏ tôm",
    stage: "thanh-cay",
    field: "tai-che",
    region: "nam",
    place: "Vĩnh Châu, Cần Thơ",
    summary: "Ủ vỏ tôm từ cơ sở chế biến thành phân bón cho ruộng hành tím.",
    problem: "Mùi hôi làm hàng xóm phản đối, nhóm phải dừng khu ủ đầu tiên.",
    localValue: "Nguồn vỏ tôm dồi dào, nông dân trồng hành cần phân hữu cơ.",
    founder: { name: "Thạch Thị Sa Rươl", role: "Kỹ thuật viên nông nghiệp" },
    image: img("vinh-chau-compost"),
    createdAt: "2025-09-14",
  },
];

export function getSeed(slug: string) {
  return SEEDS.find((s) => s.slug === slug);
}

export function latestSeeds(n: number) {
  return [...SEEDS].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, n);
}

**Tech Stack đề xuất (Nhanh - Nhẹ - Đẹp)**

- **Framework:** Next.js (React) + Tailwind CSS để dựng layout nhanh, chuẩn responsive.
- **Animation & 3D:** Framer Motion (xử lý scroll-driven animations mượt mà) + Spline hoặc Three.js/React Three Fiber (nhúng mô hình 3D bánh kem, hộp quà hoặc trái tim).
- **Hiệu ứng đặc biệt:** `canvas-confetti` (pháo giấy hồng), Lucide Icons.
- **Deploy:** Vercel (miễn phí, tích hợp domain riêng trong 2 phút).

**Cấu trúc 6 Section cho Landing Page**

| Section | Tên Section                                | Nội dung & Visual                                                                                                | Hiệu ứng & Kỹ thuật                                                                                                |
| ------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **01**  | **Hero: The Birthday Teaser**              | Lời chúc sinh nhật 27/8, tiêu đề lớn typography Playfair Display, nút "Khám phá bí mật" để bật nhạc nền tự động. | Floating 3D heart/cake (Spline), hiệu ứng pháo giấy nhẹ, background chuyển màu hồng - trắng pastel.                |
| **02**  | **Timeline: The Date (25/8)**              | Thông báo ngày hẹn hò sớm mừng sinh nhật (25/8), đếm ngược (countdown timer) đến giờ hẹn.                        | Parallax card xuất hiện theo nhịp cuộn (Scroll-telling).                                                           |
| **03**  | **Interactive Itinerary: Lộ trình hẹn hò** | Lộ trình từng chặng từ đón, ăn tối lãng mạn, quán cafe/bar ngắm view, đến hoạt động vui chơi bí mật.             | Dạng dọc (Vertical Timeline) có pin trôi theo trục thời gian, đính kèm link Google Maps và hình minh họa địa điểm. |
| **04**  | **Memories Gallery: Dựng ảnh đôi**         | Bộ sưu tập những khoảnh khắc đẹp nhất của 2 người, kèm caption ngắn cho từng cột mốc.                            | 3D Carousel xoay vòng hoặc hiệu ứng Polaroid rơi tự nhiên khi cuộn trang, click mở lightbox phóng to.              |
| **05**  | **Letter from Heart: Lời nhắn gửi**        | Bức thư tay số hóa (digital letter) gửi lời chúc ngọt ngào nhất cho tuổi mới.                                    | Hiệu ứng gõ chữ (Typewriter effect) hoặc phong bì thư mở nắp khi người xem cuộn tới.                               |
| **06**  | **RSVP / Call To Action: Lời hẹn**         | Nút bấm xác nhận "Em đồng ý đi chứ?" (Có nút tương tác vui: bấm "Đồng ý" bung pháo hoa rực rỡ).                  | Full-screen confetti animation, âm thanh chúc mừng vui nhộn.                                                       |

**Các tính năng cốt lõi cần tích hợp**

- **Music Player Floating Widget:** Một widget đĩa than mini hoặc nút tròn góc phải màn hình, có nút bật/tắt nhạc và sóng âm (waveform) chuyển động.
- **Typography:** `Playfair Display` cho các tiêu đề (Headings) mang vẻ thanh lịch, cổ điển; `Inter` cho văn bản (Body text) đảm bảo dễ đọc trên điện thoại.
- **Mobile-First Responsive:** Căn chỉnh toàn bộ timeline và thư viện ảnh thành layout 1 cột trên điện thoại để thao tác vuốt mượt mà.

Bạn đã chốt danh sách cụ thể các địa điểm và hoạt động cho ngày 25/8 chưa để cùng đưa vào khung timeline chi tiết?

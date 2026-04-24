# Kế hoạch phát triển app quản lý tài chính cá nhân

## 1) Mục tiêu sản phẩm
Xây dựng ứng dụng giúp người dùng quản lý thu/chi hằng ngày, theo dõi sức khỏe tài chính và kiểm soát ngân sách theo tháng.

### Kết quả người dùng nhận được
- Ghi lại giao dịch **nhanh trong vài giây**.
- Xem được tổng kết theo **tuần / tháng / năm**.
- Có **dashboard** hiển thị tình hình chi tiêu tổng quan.
- Phân loại được **thu nhập** và **chi tiêu** theo danh mục.
- Lập và theo dõi **budget theo tháng** cho từng danh mục.

---

## 2) Tính năng cốt lõi (MVP)

## 2.1 Quản lý giao dịch theo ngày
- Thêm giao dịch với các trường:
  - Loại: `income` (thu nhập) hoặc `expense` (chi tiêu)
  - Số tiền
  - Danh mục
  - Ngày giao dịch
  - Ghi chú (tuỳ chọn)
  - Tài khoản/nguồn tiền (ví, ngân hàng) (tuỳ chọn)
- Chỉnh sửa/xoá giao dịch.
- Danh sách giao dịch theo ngày, có tìm kiếm/lọc theo:
  - khoảng thời gian
  - loại giao dịch
  - danh mục

## 2.2 Danh mục thu nhập và chi tiêu
- Danh mục mặc định:
  - Chi tiêu: Ăn uống, Di chuyển, Nhà ở, Hóa đơn, Mua sắm, Giải trí, Y tế, Giáo dục, Khác
  - Thu nhập: Lương, Thưởng, Freelance, Đầu tư, Khác
- Cho phép người dùng tạo/sửa/xoá danh mục riêng.

## 2.3 Tổng kết theo tuần/tháng/năm
- KPI chính:
  - Tổng thu nhập
  - Tổng chi tiêu
  - Chênh lệch (thu - chi)
  - Tỷ lệ tiết kiệm
- Biểu đồ:
  - Cột: so sánh thu vs chi theo từng mốc thời gian
  - Tròn: tỷ trọng chi tiêu theo danh mục

## 2.4 Dashboard tổng quan
- Thẻ chỉ số nhanh (cards):
  - Chi tiêu tháng hiện tại
  - Thu nhập tháng hiện tại
  - Ngân sách đã dùng (%)
  - Cảnh báo vượt budget
- Widget gợi ý:
  - Top 3 danh mục chi nhiều nhất tháng này
  - Xu hướng 3 tháng gần nhất

## 2.5 Quản lý budget theo tháng
- Tạo ngân sách cho từng danh mục theo tháng (ví dụ: Ăn uống 3.000.000đ/tháng).
- Theo dõi:
  - Đã chi bao nhiêu
  - Còn lại bao nhiêu
  - % sử dụng ngân sách
- Cảnh báo màu:
  - < 80%: xanh
  - 80–100%: vàng
  - > 100%: đỏ

---

## 3) User flow đề xuất
1. Người dùng mở app → vào màn hình Dashboard.
2. Nhấn “+ Giao dịch” để thêm khoản thu/chi trong ngày.
3. Cuối tuần/tháng mở báo cáo để xem xu hướng.
4. Đầu tháng đặt ngân sách theo danh mục.
5. Trong tháng theo dõi mức sử dụng budget và điều chỉnh.

---

## 4) Cấu trúc dữ liệu gợi ý

## 4.1 Bảng `users`
- `id` (PK)
- `email`
- `password_hash`
- `created_at`

## 4.2 Bảng `categories`
- `id` (PK)
- `user_id` (FK -> users.id)
- `name`
- `type` (`income` | `expense`)
- `icon` (tuỳ chọn)
- `created_at`

## 4.3 Bảng `transactions`
- `id` (PK)
- `user_id` (FK)
- `category_id` (FK)
- `type` (`income` | `expense`)
- `amount` (decimal)
- `transaction_date` (date)
- `note` (text, nullable)
- `created_at`

## 4.4 Bảng `budgets`
- `id` (PK)
- `user_id` (FK)
- `category_id` (FK)
- `month` (YYYY-MM)
- `limit_amount` (decimal)
- `created_at`

---

## 5) API endpoints tối thiểu (REST)
- `POST /auth/register`
- `POST /auth/login`
- `GET /transactions`
- `POST /transactions`
- `PUT /transactions/:id`
- `DELETE /transactions/:id`
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `GET /reports/summary?period=week|month|year`
- `GET /budgets?month=YYYY-MM`
- `POST /budgets`
- `PUT /budgets/:id`

---

## 6) Gợi ý dashboard UI
- **Header:** Tổng quan tài chính tháng hiện tại.
- **Row 1:** 4 cards KPI (Thu, Chi, Cân đối, % budget đã dùng).
- **Row 2:**
  - Trái: biểu đồ thu/chi theo ngày trong tháng.
  - Phải: biểu đồ tròn cơ cấu danh mục chi tiêu.
- **Row 3:**
  - Thanh tiến độ ngân sách từng danh mục.
  - Danh sách giao dịch gần nhất.

---

## 7) Roadmap phát triển
### Phase 1 (1–2 tuần)
- Auth cơ bản
- CRUD giao dịch
- Danh mục
- Tổng kết tháng đơn giản

### Phase 2 (1–2 tuần)
- Budget theo danh mục
- Cảnh báo vượt budget
- Dashboard biểu đồ

### Phase 3 (1 tuần)
- Báo cáo tuần/năm
- Tối ưu UX nhập giao dịch nhanh
- Export CSV/PDF (tuỳ chọn)

---

## 8) Gợi ý stack công nghệ
- Frontend: React + TypeScript + Chart.js/Recharts
- Backend: Node.js (NestJS/Express) hoặc .NET Web API
- Database: PostgreSQL
- Auth: JWT
- Deploy: Vercel (FE) + Render/Fly.io (BE) + Supabase/Neon (DB)

---

## 9) Tiêu chí hoàn thành
- Người dùng thêm giao dịch mới trong <= 10 giây.
- Dashboard tải trong <= 2 giây với dữ liệu 1 năm.
- Báo cáo tuần/tháng/năm chính xác theo timezone người dùng.
- Theo dõi budget theo danh mục và hiển thị cảnh báo đúng ngưỡng.

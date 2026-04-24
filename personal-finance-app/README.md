# Personal Finance App (Starter Repository)

Repository này là bộ khởi tạo (starter) cho app quản lý tài chính cá nhân.

## Mục tiêu
- Ghi nhận giao dịch thu/chi theo ngày.
- Tổng kết theo tuần / tháng / năm.
- Dashboard theo dõi xu hướng chi tiêu.
- Quản lý danh mục thu nhập / chi tiêu.
- Lập ngân sách theo tháng cho từng danh mục.

## Cấu trúc thư mục

```bash
personal-finance-app/
├─ backend/        # REST API + nghiệp vụ budget/report
├─ frontend/       # Web dashboard
└─ docker-compose.yml
```

## Công nghệ đề xuất
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL

## Chạy nhanh bằng Docker
```bash
docker compose up -d
```

## Backend local
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Frontend local
```bash
cd frontend
npm install
npm run dev
```

## API khởi đầu
- `GET /health`
- `GET /api/v1/summary?period=week|month|year`


# Quản lý nhân viên

## Thành phần

- `frontend/`: dashboard Next.js, các trang GraphQL và API proxy.
- `backend/`: API NestJS, DTO, migrations và consumer RabbitMQ.
- `producer-api/`: Elysia producer gửi yêu cầu quét batch vào RabbitMQ.
- PostgreSQL là database dùng chung. PostGraphile phục vụ GraphQL.

## Chạy local

Cần Node.js, Docker Desktop và PostgreSQL đang chạy theo cấu hình trong `backend/config/config.json`.

Từ `frontend/`:

```powershell
npm install
npm install --prefix ../producer-api
npm run db:migrate
npm run rabbitmq:up
npm run dev:all
```

Mở dashboard tại `http://localhost:3000`. GraphiQL ở `http://127.0.0.1:5001/`, NestJS ở `http://127.0.0.1:5002/api`, Elysia ở `http://127.0.0.1:5003`; RabbitMQ Management ở `http://localhost:15672` (mặc định local: `employee_app` / `dev_only_change_me`).

`dev:all` build NestJS và Elysia rồi chạy Next.js, PostGraphile, NestJS, Elysia. RabbitMQ được khởi động riêng bằng `npm run rabbitmq:up`. Dừng bằng Ctrl+C; dừng broker bằng `npm run rabbitmq:down`.

## Luồng import tuần 4

1. Giao diện đọc file, kiểm tra trước và tạo UUID `batchId`.
2. Giao diện không cho lưu nếu còn dòng lỗi. NestJS kiểm tra lại từng nhóm tối đa 50 dòng và từ chối nhóm không hợp lệ; nhóm hợp lệ mới được ghi vào `user_import_raw` với `is_scanned = false`, `processing_status = pending` và `batch_id`.
3. `POST /api/employees/import/scan` chuyển tiếp tới Elysia. Producer gửi `{ key: "SCAN_IMPORTED_RAW", batchId }` vào queue bền `employee.import.scan` và chờ publisher confirm.
4. NestJS consumer nhận message, kiểm tra dữ liệu raw, đưa dòng hợp lệ vào `Employees` và cập nhật trạng thái cùng `validation_errors`. Dòng không hợp lệ vẫn ở raw, được đánh dấu đã quét và hiện lỗi.
5. Giao diện gọi `GET /api/employees/import/:batchId` định kỳ, hiển thị trạng thái tổng và lỗi theo từng dòng.

Migration `20261005130000-add-import-batch-and-status.js` thêm batch/status và gán UUID riêng cho các dòng raw đã tồn tại. Các route liên quan:

| Method | Path | Vai trò |
| --- | --- | --- |
| `POST` | `/api/employees/import/validate` | Kiểm tra trước khi lưu raw. |
| `POST` | `/api/employees/import` | Lưu batch vào bảng raw. |
| `POST` | `/api/employees/import/scan` | Yêu cầu Elysia đưa batch vào queue. |
| `GET` | `/api/employees/import/:batchId` | Đọc trạng thái và lỗi của batch từ NestJS. |
| `GET` | `/health` trên cổng 5003 | Kiểm tra Elysia producer. |

## API nhân viên và GraphQL

Dashboard đọc danh sách/chi tiết qua `frontend/app/lib/graphql.ts` → `/api/graphql` → PostGraphile → PostgreSQL. Thêm và cập nhật nhân viên gọi NestJS qua Next.js API proxy.

| Method | NestJS path (base `/api`) | DTO |
| --- | --- | --- |
| `POST` | `/employees` | `CreateEmployeeDto` |
| `PUT` | `/employees/:id` | `UpdateEmployeeDto` |
| `POST` | `/employees/import/validate` | `ValidateImportDto` |
| `POST` | `/employees/import` | `SaveImportRawDto` |
| `GET` | `/employees/import/:batchId` | UUID path param |

Các route GraphQL cụ thể phụ thuộc schema PostGraphile đang chạy; kiểm tra trực tiếp ở GraphiQL để xem field/enum hiện có.

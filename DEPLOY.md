# Triển khai Luminary

Trang này chạy bằng **Node.js thuần**, không cần cài dependency để chạy website. Đơn hàng được lưu tại `data/orders.json` trên máy chủ.

## 1. Chạy tại máy

```bash
cd banh-ngot-website
node server.js
# hoặc
npm start
```

Mở:

- Website: http://localhost:3000
- Quản lý đơn: http://localhost:3000/admin.html
- Kiểm tra sức khỏe: http://localhost:3000/api/health

Mã quản lý mặc định là `luminary2026`. Đổi bằng biến môi trường:

```bash
ADMIN_TOKEN=ma-bi-mat-cua-ban node server.js
```

> Trên Windows, nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd start` hoặc chạy trực tiếp `node server.js`.

## 2. Đổi tên miền

Trước khi lên mạng, thay `luminary-wpi5.onrender.com` bằng tên miền thật của bạn trong:

- `index.html` (canonical, og:url, og:image, twitter:image)
- `manifest.webmanifest`
- `sw.js`
- `robots.txt`
- `sitemap.xml`
- README.md

## 3. Triển khai có lưu đơn thật

### Render (nhanh nhất, có URL free)

Repo này đã có sẵn `render.yaml`. Các bước:

1. Đẩy toàn bộ thư mục này lên GitHub (public hoặc private đều được). `node_modules/` và `data/orders.json` đã nằm trong `.gitignore`.
2. Vào <https://dashboard.render.com> → **New → Blueprint** → chọn repo vừa push → **Apply**.  
   Hoặc **New → Web Service** và điền thủ công:
   - **Build command**: `npm ci --omit=dev`
   - **Start command**: `node server.js`
   - **Health check path**: `/api/health`
   - **Plan**: `Free`, **Region**: `Singapore`
   - **Environment**: `NODE_VERSION=22`, `ADMIN_TOKEN=<mã bí mật>` (`render.yaml` sẽ tự sinh nếu dùng Blueprint)
3. Render cấp URL dạng `https://luminary-wpi5.onrender.com` (có thể thêm hậu tố nếu tên đã被人 dùng). Mở thử:
   ```bash
   curl https://luminary-wpi5.onrender.com/api/health
   ```
4. Trang quản lý: `https://luminary-wpi5.onrender.com/admin.html`, dùng đúng `ADMIN_TOKEN` trong mục **Environment** của service.

**Giới hạn của Free plan cần biết:**

- Service **ngủ sau 15 phút không có truy cập**; request đầu tiên sau đó chờ khoảng 1 phút để website “thức dậy”.
- Free **không gắn persistent disk** → filesystem là tạm. Đơn ghi vào `data/orders.json` sẽ **mất khi service restart / redeploy / spin down**.
- Để lưu đơn thật lâu dài: nâng service lên paid plan rồi vào **Disk → Add disk**, mount path:
  ```text
  /opt/render/project/src/data
  ```
  (ứng với `data/` của `server.js` trên runtime Node của Render). Render cũng tự snapshot disk mỗi 24 giờ.

> Với mục đích demo/cho người xem thử thì Free là đủ. Trước khi nhận đơn thật nhớ đổi `ADMIN_TOKEN`, làm theo mục 2 về tên miền và cân nhắc nâng paid + disk.

### Docker / VPS

```bash
docker build -t luminary .
docker run -d --name luminary \
  -p 3000:3000 \
  -e ADMIN_TOKEN="ma-bi-mat-cua-ban" \
  -v luminary-data:/app/data \
  --restart unless-stopped \
  luminary
```

Volume `luminary-data` giúp đơn hàng không mất khi khởi động lại container.

### Render / Railway / Fly.io

- Build command: để trống (không cần cài gì)
- Start command: `node server.js`
- Biến môi trường: `PORT=3000`, `ADMIN_TOKEN=<mã bí mật>`
- **Phải gắn ổ đĩa bền vững vào `/app/data`**, nếu không đơn sẽ mất khi dịch vụ khởi động lại.
- Bật HTTPS để trình duyệt cho phép cài PWA.

### Đặt sau reverse proxy

Nếu dùng Nginx, truyền header thật cho Node:

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 4. Lưu ý

- Đơn gửi qua `POST /api/orders` và được xác thực cơ bản ở máy chủ.
- Trang quản lý dùng mã quản lý qua header `x-admin-token`; không nên chia sẻ mã này.
- Đây **chưa phải cổng thanh toán**. Khách chọn thanh toán khi nhận hàng hoặc chuyển khoản, tiệm xác nhận đơn trong trang quản lý.
- Tài khoản đăng nhập trên trang khách vẫn là demo lưu trong `localStorage`; không dùng mật khẩu thật.
- Sao lưu định kỳ tệp `data/orders.json`.

## 5. Kiểm tra sau khi triển khai

```bash
curl https://ten-mien-cua-ban/api/health
curl -X POST https://ten-mien-cua-ban/api/orders \
  -H "Content-Type: application/json" \
  -d '{"code":"LM261127-1234","createdAt":"2026-11-27T09:00:00.000Z","delivery":"express","payment":"cod","customer":{"fullName":"Nguyen Van A","phone":"0901234567","email":"a@example.com","city":"TP. Hồ Chí Minh","district":"Quan 1","address":"128 Nguyen Hue"},"items":[{"id":13,"name":"Macaron Vani Đơn Vị","price":45000,"qty":2}],"subtotal":90000,"shipping":30000,"discount":0,"total":120000}'
curl https://ten-mien-cua-ban/api/orders -H "x-admin-token: luminary2026"
```

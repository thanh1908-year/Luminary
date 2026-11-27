# Luminary

Website bánh ngọt chạy thật bằng Node.js: giao diện pastel, 15 món bánh, đặt hàng gửi về máy chủ, có trang quản lý đơn và hỗ trợ cài như ứng dụng (PWA).

## Chạy website

```bash
cd banh-ngot-website
node server.js
# hoặc: npm start
```

- Website: http://localhost:3000
- Quản lý đơn: http://localhost:3000/admin.html
- Kiểm tra hệ thống: http://localhost:3000/api/health
- Mã quản lý mặc định: `luminary2026` (đổi qua biến môi trường `ADMIN_TOKEN`)

Để mở từ điện thoại/máy khác **trong cùng Wi‑Fi**, dùng `http://<IP-LAN-của-máy-này>:3000` thay vì `localhost`. Xem IP bằng `ipconfig` (trong trường hợp này là `10.42.42.18`). Nếu không truy cập được, chạy `tools/allow-firewall.ps1` với quyền Administrator để mở cổng 3000. Đây chỉ là địa chỉ nội bộ; muốn người ngoài mạng truy cập thì triển khai theo `DEPLOY.md`.

> Trên Windows, nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd start` hoặc chạy thẳng `node server.js`. Xem `DEPLOY.md` để lên máy chủ thật; repo đã có `render.yaml` để deploy public nhanh với URL `onrender.com`.

## Điểm mới sau khi cải thiện

- **Giao diện làm mới**: bảng màu raspberry/caramel/sage, hero có họa tiết chấm, thẻ sản phẩm hiển thị % giảm giá, nút “Xem nhanh”, stats và CTA rõ ràng hơn.
- **Bố cục editorial / bento (đã khôi phục làm trang chính)**: hero tách dòng có ảnh chồng + rail dọc + ribbon, trust bar cuộn marquee, danh mục xếp bento 12 cột (card cookie dạng banner ngang), about có ảnh phủ, review nổi bật full-width, footer wordmark mờ. `index.html` dùng lại layout này; các file thử nghiệm Shopee đã được gỡ bỏ, còn chung `script.js` nên giỏ hàng/checkout/lịch sử đơn và 56 test hiện tại vẫn xanh.
- **Màn hình chào khi vào trang**: logo nở ra, thanh tiến độ + số % chạy thật, dòng chữ “Đang nướng bánh tươi”, sau đó overlay mờ dần để hero hiện theo nhịp (gạch eyebrow → tiêu đề → mô tả → nút → ảnh → floating card). Có thể bấm/phím bỏ qua, tự ẩn sau ~2,9s và bị tắt hẳn với `prefers-reduced-motion`. Khi bỏ qua (hoặc đã xem trong phiên), class `intro-skipped` giúp hero hiện ngay thay vì chờ delay cũ. Link CSS/JS có `?v=12` để tránh cache cũ.
- **Animation có tiết chế**: thanh tiến độ cuộn, revealing theo thứ tự (`--delay`), line-up tiêu đề + vẽ gạch eyebrow, parallax nhẹ, đếm số stats, nút magnetic, product/category card tilt + shine theo con trỏ, orb và wordmark chuyển động.
- **Micro-interaction vui nhộn**: chấm bay vào giỏ + icon giỏ “bump”, tim nở vòng khi yêu thích, shine lướt qua nút, badge danh mục pulse, success popup có vòng lan, order card/footer hiện stagger, nút “về đầu trang” ẩn/hiện theo cuộn. Ưu tiên `transform`/`opacity`, chạy bằng `requestAnimationFrame`, tự tắt khi bật `prefers-reduced-motion` hoặc trên thiết bị không hover.
- **Luồng bán hàng hoàn chỉnh**: xem nhanh sản phẩm → chọn số lượng → giỏ hàng → form đặt hàng → mã đơn → lịch sử đơn → “Đặt lại”. Đơn được gửi không đồng bộ tới `POST /api/orders` và lưu tại `data/orders.json`.
- **Tìm vị ngọt hợp bạn (mới)**: nút ✦ trong hero mở bảng chọn 4 tâm trạng (vui / ấm áp / tự thưởng / tặng quà); site gợi ý món kèm lý do, giá và nút thêm vào giỏ. Hoạt động cả khi bật giảm chuyển động, dùng chung modal/focus trap với các popup khác.
- **Checkout thực tế hơn**: validate họ tên/điện thoại/email/địa chỉ, chọn giao nhanh hoặc tự nhận, phí giao 30.000đ (miễn phí từ 300.000đ), mã `GIAM10` giảm 10%.
- **Lưu dữ liệu an toàn**: giỏ hàng, yêu thích và tối đa 20 đơn gần nhất lưu trong `localStorage`; đơn còn được gửi về máy chủ để tiệm xem tại trang quản lý. Dữ liệu cũ bị lỗi sẽ được lọc bỏ khi tải.
- **Tối ưu mobile & tốc độ**: ảnh WebP theo `srcset` (480/800/1200/1600px), kích thước ảnh khai báo sẵn, `loading="lazy"`, `fetchpriority="high"` cho ảnh hero, thanh giỏ hàng cố định trên mobile, `prefers-reduced-motion`.
- **Khả năng truy cập**: skip link, focus trap trong modal, đóng bằng `Esc`, `aria-label`/`aria-pressed`/`aria-live`, fallback khi trình duyệt không hỗ trợ `IntersectionObserver`.
- **Tìm kiếm tốt hơn**: bỏ dấu tiếng Việt (gõ `dau` vẫn ra “Bánh Dâu Tươi”), số lượng kết quả cập nhật theo bộ lọc; debounce 180ms để không cuộn trang liên tục khi gõ.
- **Bản 1.2 – sửa theo tiêu chí review**: ảnh WebP theo kích thước thực tế của từng món (hết lỗi ảnh Panna Cotta bị vỡ trên màn hình DPR cao), màu chữ/nút đạt tương phản WCAG AA, có `<noscript>` để nội dung không bị ẩn khi tắt JS, intro chỉ chạy lần đầu trong phiên và có hint bỏ qua.
- **Danh sách yêu thích (mới)**: nút tim trên header, lưu trong `localStorage`, bấm tim không render lại cả grid (giữ focus cho bàn phím), modal riêng với nút Xem / Thêm / Bỏ.
- **Thông tin tiệm & credit ảnh (mới)**: footer có FAQ, chính sách giao hàng, đổi trả và bảng credit 17 ảnh ngay trên trang (không chỉ trong README) để đáp ứng giấy phép CC BY-SA. Các nút mạng xã hội không còn nhảy lên đầu trang.
- **Checkout gọn hơn**: tự nhận tại tiệm thì ẩn dấu `*` trên ô quận/địa chỉ, cho phép “Bỏ mã” giảm giá, modal chuyển tiếp giỏ → thanh toán không còn chồng overlay.
- **Bản 1.3 – motion & layout lấy cảm hứng từ AURA studio (đã chuyển sang chất riêng Luminary)**: tiêu đề `data-split` tách từng chữ trượt lên (vẫn giữ `<em>` nghiêng), `.anim` + `--d` cho stagger, chip lọc nhanh đồng bộ với sidebar, khối **Nhật ký bếp** dạng `news-grid` với 3 bài đọc trong modal, counter stats, reveal tự quét cả nội dung render động bằng `MutationObserver`, và `IntersectionObserver` cập nhật mục nav đang xem (đã thêm `#journal`).
- **Giao diện Sáng / Tối (mới)**: nút ☀/🌙 trên header và liên kết ở footer, lưu lựa chọn trong `localStorage`, mặc định theo `prefers-color-scheme` nếu chưa từng chọn. Palette tối vẫn là hồng/caramel/sage ấm, không chuyển sang tím/indigo; `color-scheme: dark` để form/scrollbar đồng bộ.
- **Tiện ích nhỏ mới**: gợi ý “Ăn kèm ngon hơn” trong quick view (thêm thẳng vào giỏ), nút “Xóa lịch sử” đơn hàng, phím `/` để mở tìm kiếm (bỏ qua khi đang gõ/modal mở), JSON-LD `Bakery` cho SEO địa phương.
- **Bản 1.4 – sửa chữ bị chìm**: thêm token `--solid`, `--on-solid`, `--stamp-ink`, `--stamp-accent` cho cả 2 chế độ sáng/tối. Huy hiệu, nút, toast, thanh giỏ mobile, icon thành công và các stamp dùng token nên chữ không còn trùng tông nền nữa.
- **Đăng nhập tài khoản (demo)**: nút người trên header và liên kết ở footer mở dialog Đăng nhập / Đăng ký. Danh sách user và phiên đăng nhập lưu trong `localStorage`; avatar/lời chào cập nhật ngay, tên và email được điền sẵn ở checkout nếu ô còn trống. **Mật khẩu lưu nguyên văn trong `localStorage` chỉ để demo — không dùng cho tài khoản thật.**
- **Thêm chi tiết trang trí**: badge “Đang mở cửa” trên thanh thông báo, 5 chấm confetti trong hero, đường kẻ doodle giữa các section, ghi chú bếp nghiêng trong about và mẹo cắt bánh trong nhật ký. Các chi tiết này tự ẩn/điều chỉnh trên mobile.
- **Smoke test mở rộng**: 56/56 case bằng jsdom, gồm split text, chip/sidebar sync, journal, theme, quick pairing, xóa đơn, phím tắt, auth demo (đăng ký / sai mật khẩu / đăng nhập / đăng xuất / prefill checkout), token tương phản, element trang trí và kiểm tra không gọi WebP 800 của Panna Cotta. Riêng `IMAGE_WIDTHS` đã được quét lại: 50 tổ hợp ảnh/kích thước đều có file thật.
- **Máy chủ thật (2.0)** (đổi thương hiệu Luminary từ 2.1): `server.js` phục vụ file tĩnh và API `POST /api/orders`, `GET /api/orders`, `PATCH/DELETE /api/orders/:code`, `/api/health`. Có kiểm tra dữ liệu, chống trùng mã, giới hạn 10 đơn/phút/IP và chặn path traversal.
- **Trang quản lý đơn**: `admin.html` + `admin.js` + `admin.css`, đăng nhập bằng `x-admin-token`, xem thống kê, tìm kiếm, lọc trạng thái, đổi trạng thái và xóa đơn.
- **PWA & SEO**: `manifest.webmanifest`, `sw.js` (cache shell, không cache API/admin), icon PNG 192/512, canonical/Open Graph/Twitter, `robots.txt` và `sitemap.xml`.

> Đơn hàng được gửi về máy chủ khi mở qua http:// hoặc https://. Thanh toán trực tuyến bằng thẻ chưa được tích hợp; khách chọn thanh toán khi nhận hàng hoặc chuyển khoản. Tài khoản đăng nhập trên trang khách vẫn là demo lưu trong `localStorage` — không dùng mật khẩu thật.

## Cấu trúc thư mục

```text
banh-ngot-website/
├── index.html              # trang khách: modal checkout, giỏ hàng, quick view
├── styles.css              # toàn bộ style + responsive + reduced motion
├── script.js               # 15 món, giỏ/checkout, gửi đơn lên API, theme, PWA
├── server.js               # máy chủ Node + API đơn hàng (không dependency)
├── admin.html              # trang quản lý đơn
├── admin.css / admin.js    # giao diện và logic quản lý đơn
├── manifest.webmanifest    # cấu hình PWA
├── sw.js                   # service worker (cache shell)
├── robots.txt / sitemap.xml
├── Dockerfile / Procfile   # cấu hình triển khai
├── render.yaml             # Blueprint deploy nhanh lên Render
├── DEPLOY.md               # hướng dẫn lên máy chủ thật (có mục Render)
├── data/orders.json        # dữ liệu đơn (tự tạo khi chạy server)
├── images/
│   ├── *.jpg               # ảnh gốc (fallback)
│   ├── webp/*.webp         # ảnh tối ưu theo nhiều kích thước
│   ├── logo-mark.svg       # logo
│   └── icon-192.png, icon-512.png
├── tools/
│   ├── optimize_images.py  # tạo lại ảnh WebP
│   ├── check_ids.py        # so khớp id HTML/JS
│   └── smoke_test.js       # test luồng chính bằng jsdom
└── README.md
```

## Script hỗ trợ

```bash
# Chạy website
node server.js

# Tạo lại ảnh WebP khi thêm/sửa ảnh gốc
python tools/optimize_images.py

# Kiểm tra id HTML/JS
python tools/check_ids.py

# Chạy smoke test (cần jsdom)
npm install
npm test
```

> Windows: nếu `npm` bị chặn bởi chính sách thực thi PowerShell, dùng `npm.cmd install` / `npm.cmd test`.

## Bảng màu

| Vai trò | Màu |
| --- | --- |
| Kem nền | `#FFF9F4` |
| Hồng phấn | `#FBE7EA` / `#E58AA0` |
| Đào | `#F7D7C0` |
| Caramel | `#B9754D` |
| Ca cao (tiêu đề/footer) | `#4D352E` |
| Xanh sage (điểm nhấn) | `#8FAE86` |

Font: **Playfair Display** (tiêu đề) + **Be Vietnam Pro** (nội dung).

Logo: `images/logo-mark.svg` – cupcake kem hồng trên nền pastel, dùng cho header, footer và favicon. Bộ icon PWA tương ứng là `images/icon-192.png` và `images/icon-512.png`.

## Nguồn ảnh

Ảnh được tải từ Wikimedia Commons / Unsplash (giữ nguyên credit theo giấy phép tương ứng):

| File | Tác giả | Giấy phép | Nguồn |
| --- | --- | --- | --- |
| `hero.jpg` | Shixart1985 | CC BY 2.0 | [Link](https://commons.wikimedia.org/wiki/File:A_beautifully_arranged_dessert_table_set_outside_showcases_a_pastel-colored_cake_adorned_with_flowers.jpg) |
| `cake-strawberry.jpg` | Karl Thomas Moore | CC BY-SA 4.0 | [Link](https://commons.wikimedia.org/wiki/File:Strawberry_Cake_I.jpg) |
| `cake-chocolate.jpg` | Daria Yakovleva | CC0 | [Link](https://commons.wikimedia.org/wiki/File:Piece_of_chocolate_cake_on_a_white_plate_decorated_with_chocolate_sauce.jpg) |
| `cake-matcha.jpg` | MichaellaaRubio | CC BY 4.0 | [Link](https://commons.wikimedia.org/wiki/File:Matcha_Tiramisu_Cake.jpg) |
| `pastry-croissant.jpg` | SKopp | CC BY-SA 3.0 | [Link](https://commons.wikimedia.org/wiki/File:Croissant,_cross_section.jpg) |
| `about-baker.jpg` | Karen Zhou | CC BY-SA 4.0 | [Link](https://commons.wikimedia.org/wiki/File:Pastry_chef,_Frida_Backe.jpg) |
| `cake-cheesecake.jpg` | Peachyeung316 | CC BY-SA 4.0 | [Link](https://commons.wikimedia.org/wiki/File:A_little_cheesecake_with_blueberry.jpg) |
| `cake-swiss-roll.jpg` | Evan-Amos | CC0 | [Link](https://commons.wikimedia.org/wiki/File:LD-Swiss-Cake-Rolls.jpg) |
| `cake-tiramisu.jpg` | Sharon Chen | CC BY 2.0 | [Link](https://commons.wikimedia.org/wiki/File:Classic_Italian_Tiramisu-3_(29989504485).jpg) |
| `mousse-raspberry.jpg` | Unsplash | Unsplash License | [Link](https://images.unsplash.com/photo-1621303837174-89787a7d4729) |
| `mousse-panna-cotta.jpg` | Insatiable Munchies | CC BY 2.0 | [Link](https://commons.wikimedia.org/wiki/File:Panna_cotta_with_chocolate_mousse.jpg) |
| `pastry-cinnamon.jpg` | Andy Li | CC0 | [Link](https://commons.wikimedia.org/wiki/File:Cinnamon_bun_-_Milfey_Patisserie_2026-08-31.jpg) |
| `pastry-fruit-tart.jpg` | Prayitno | CC BY 2.0 | [Link](https://commons.wikimedia.org/wiki/File:Fruit_Tart_(14863357020).jpg) |
| `macaron-box.jpg` | AlphaLemur | CC BY-SA 4.0 | [Link](https://commons.wikimedia.org/wiki/File:Box_of_Macarons.jpg) |
| `macaron-vanilla.jpg` | Michelle Naherny | CC BY-SA 4.0 | [Link](https://commons.wikimedia.org/wiki/File:VanillaMacaron.jpg) |
| `cookie-brownie.jpg` | Unsplash | Unsplash License | [Link](https://images.unsplash.com/photo-1606313564200-e75d5e30476c) |
| `cookie-choc-chip.jpg` | Unsplash | Unsplash License | [Link](https://images.unsplash.com/photo-1499636136210-6f4ee915583e) |

> Lưu ý: ảnh CC BY-SA yêu cầu ghi credit và chia sẻ tác phẩm phái sinh cùng giấy phép nếu dùng cho mục đích thương mại. Bản WebP trong `images/webp/` là phiên bản nén của các ảnh gốc này.

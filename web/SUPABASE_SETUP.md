# Hướng Dẫn Cài Đặt Supabase (Supabase Setup Guide)

Tài liệu này hướng dẫn chi tiết cách thiết lập Supabase cho dự án BinBill, bao gồm Database, Authentication và Storage.

## 1. Tạo Project Mới
1.  Truy cập [supabase.com](https://supabase.com) và đăng nhập.
2.  Nhấn **"New Project"**.
3.  Chọn Organization của bạn.
4.  Điền thông tin:
    *   **Name**: `binbill-store` (hoặc tên tùy ý)
    *   **Database Password**: Lưu mật khẩu này lại (quan trọng).
    *   **Region**: Chọn `Singapore` hoặc `Tokyo` để có tốc độ tốt nhất cho Việt Nam.
5.  Nhấn **"Create new project"** và đợi vài phút.

## 2. Thiết Lập Database (Tables & Policies)
1.  Trong Dashboard, chọn menu **SQL Editor** (biểu tượng `[ ]` bên trái).
2.  Nhấn **"New Query"**.
3.  Copy toàn bộ nội dung dưới đây và dán vào khung soạn thảo:

```sql
-- 1. Tạo bảng Products (Sản phẩm)
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric not null,
  original_price numeric,
  image_url text not null,
  description text,
  category text default 'standard', -- 'new', 'sale', 'second_hand', 'standard'
  condition text, -- Ví dụ: '99%', 'Like New'
  is_hot boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Bật bảo mật Row Level Security (RLS)
alter table public.products enable row level security;

-- 3. Tạo Policy: Ai cũng có thể xem sản phẩm đang hoạt động
create policy "Public products are viewable by everyone"
  on public.products for select
  using ( is_active = true );

-- 4. Tạo Policy: Admin (đã đăng nhập) có thể làm mọi thứ (Thêm/Sửa/Xóa/Xem tất cả)
create policy "Admins can do everything"
  on public.products for all
  to authenticated
  using ( true )
  with check ( true );

-- 5. Tạo Storage Bucket để lưu ảnh
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- 6. Tạo Policy cho Storage: Ai cũng xem được ảnh
create policy "Public Access" 
  on storage.objects for select 
  using ( bucket_id = 'product-images' );

-- 7. Tạo Policy cho Storage: Chỉ Admin mới được up ảnh
create policy "Admin Upload" 
  on storage.objects for insert 
  to authenticated 
  with check ( bucket_id = 'product-images' );
```

4.  Nhấn nút **"Run"** (màu xanh lá) để chạy lệnh. Nếu thành công, bạn sẽ thấy thông báo "Success".

## 3. Tạo Tài Khoản Admin Mặc Định
Để đăng nhập vào trang Admin, bạn cần một tài khoản. Chạy lệnh SQL sau trong **SQL Editor** để tạo tài khoản `admin@binbill.com` với mật khẩu `admin123`:

```sql
-- Tạo user admin mặc định
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'authenticated',
  'admin@binbill.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);
```

> **Lưu ý:** Sau khi đăng nhập, hãy đổi mật khẩu ngay tại trang Settings.

## 4. Kết Nối Với Ứng Dụng (Lấy API Keys)
1.  Trong Dashboard, vào **Project Settings** (bánh răng dưới cùng bên trái).
2.  Chọn mục **API**.
3.  Bạn sẽ thấy:
    *   **Project URL**: (Ví dụ: `https://xyz.supabase.co`)
    *   **Project API keys** -> **anon** / **public**: (Một chuỗi dài bắt đầu bằng `ey...`)
4.  Mở file `web/.env.local` trong dự án của bạn.
5.  Dán thông tin vào:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

6.  **Khởi động lại server** (`Ctrl+C` rồi `pnpm dev`) để áp dụng thay đổi.

## 5. Kiểm Tra
1.  Truy cập `http://localhost:4000/admin/login`.
2.  Đăng nhập với:
    *   Email: `admin@binbill.com`
    *   Pass: `admin123`
3.  Nếu vào được Dashboard là thành công!

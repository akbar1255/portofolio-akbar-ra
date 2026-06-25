# Migrasi Portfolio ke Next.js + Vercel Blob + Admin Panel

Migrasi portofolio dari HTML/CSS/JS + Express/SQLite ke **Next.js 14 (App Router)** dengan data disimpan di **Vercel Blob Storage** dan dilengkapi **halaman admin panel** yang terproteksi untuk mengedit seluruh isi website.

## User Review Required

> [!IMPORTANT]
> Karena Vercel Blob membutuhkan akun Vercel dan token `BLOB_READ_WRITE_TOKEN`, kamu perlu:
> 1. Deploy di Vercel (atau buat proyek Vercel kosong) untuk mendapat token Blob
> 2. Set environment variable `BLOB_READ_WRITE_TOKEN` di `.env.local`
> 3. Set `ADMIN_PASSWORD` (password admin) di `.env.local` — default akan `admin123`
> 4. Set `JWT_SECRET` di `.env.local` — default akan pakai random string
>
> Semua variabel ini bisa diisi setelah project dibuat sebelum deploy.

> [!WARNING]
> **Folder lama (`backend/`, `index.html`, `style.css`, `script.js`)** akan tetap ada — hanya folder baru Next.js yang akan dibuat. Kamu bisa hapus file lama setelah migrasi selesai dan diverifikasi berjalan.

## Open Questions

Ada beberapa pertanyaan untuk mengklarifikasi implementasi:
1. **Opsi Struktur Folder**: Rencana ini mengasumsikan kita menginisialisasi Next.js **langsung** di root folder workspace (`Portofolio/`), sehingga file `package.json` dan struktur folder Next.js berada di root. Apakah ini disetujui? (Direkomendasikan agar deployment ke Vercel lebih mudah).
2. **Bahasa Pemrograman**: Kita akan menggunakan Javascript (JS) biasa agar kompatibel langsung dengan file `script.js` lama tanpa komplikasi TypeScript.

---

## Proposed Changes

### 1. Next.js Project Setup

#### [NEW] `package.json` (root)
- Inisialisasi Next.js project di root.
- Dependencies: `@vercel/blob`, `bcryptjs`, `jsonwebtoken`, `lucide-react` (untuk icon modern) atau font-awesome via CDN.

#### [NEW] `next.config.mjs`
- Konfigurasi Next.js dengan image domains untuk vercel blob storage.

#### [MODIFY] `Portofolio/` (root)
- Buat struktur folder Next.js App Router:
  - `app/` untuk routing, layouts, and pages.
  - `components/` untuk reusable sections dan UI components.
  - `lib/` untuk helpers (auth, blob storage access).

### 2. Storage: Vercel Blob Helper

#### [NEW] `lib/blob.js`
- `getContent()` → fetch file JSON dari Vercel Blob (default key: `portfolio-content.json`). Jika file tidak ada, kembalikan data seed awal.
- `saveContent(data)` → tulis JSON konten baru ke Vercel Blob.
- `getMessages()` → fetch pesan dari Vercel Blob (`portfolio-messages.json`).
- `saveMessages(messages)` → tulis data pesan baru ke Vercel Blob.

### 3. API Routes

#### [NEW] `app/api/content/route.js`
- `GET` -> Mengembalikan data portofolio publik.

#### [NEW] `app/api/admin/login/route.js`
- `POST` -> Mengautentikasi admin, mengembalikan JWT token.

#### [NEW] `app/api/admin/content/route.js`
- `GET` & `PUT` -> Membaca dan memperbarui isi konten portofolio (terproteksi JWT).

#### [NEW] `app/api/admin/upload/route.js`
- `POST` -> Upload image ke Vercel Blob dan mengembalikan URL gambar (terproteksi JWT).

#### [NEW] `app/api/contact/route.js`
- `POST` -> Menyimpan pesan kontak baru ke dalam Blob storage.

### 4. Frontend & Styles Migration

#### [NEW] `app/globals.css`
- Salin styling dari `style.css` lama dengan beberapa perbaikan agar kompatibel dengan Next.js.

#### [NEW] `app/page.js`
- Server component untuk me-render halaman utama portofolio secara dinamis menggunakan data dari Vercel Blob.

#### [NEW] `components/`
- Pecah halaman utama menjadi section-section: `HeroSection.js`, `AboutSection.js`, `SkillsSection.js`, `ProjectsSection.js`, `EducationSection.js`, `ExperienceSection.js`, `ContactSection.js`.

### 5. Admin Panel

#### [NEW] `app/admin/login/page.js`
- Form login dengan glassmorphism modern.

#### [NEW] `app/admin/page.js`
- Dashboard admin yang terproteksi (pengecekan token di client-side/middleware).
- Menyediakan tab editor untuk:
  - Profile (nama, deskripsi, foto profil)
  - Skills (tambah/hapus/edit skill)
  - Projects (CRUD project)
  - Education (CRUD education)
  - Experience (CRUD experience)
  - Messages (melihat list pesan masuk)

---

## Verification Plan

### Automated Tests
- `npm run build` -> Memastikan aplikasi Next.js berhasil di-compile tanpa error.

### Manual Verification
1. Verifikasi halaman portfolio utama di browser.
2. Coba kirim pesan lewat contact form, pastikan tersimpan ke Blob.
3. Login ke admin dashboard `/admin/login`.
4. Edit deskripsi profile di admin panel dan upload avatar baru, pastikan ter-update di halaman utama.
5. Jalankan `npm run build` lokal.

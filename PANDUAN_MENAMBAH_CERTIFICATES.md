# Panduan Menambah Certificates ke Website

Website Anda menggunakan **Supabase** untuk menyimpan data certificates. Berikut adalah langkah-langkah untuk menambahkan certificates Anda:

## 📋 Langkah-Langkah

### **1. Login ke Supabase Dashboard**
- Buka [supabase.com](https://supabase.com) dan login
- Akses project Anda yang sudah terhubung dengan website

### **2. Navigasi ke Tabel Certificates**
- Di sidebar kiri, klik **"SQL Editor"** atau **"Table Editor"**
- Pilih tabel **`certificates`**

### **3. Struktur Data di Tabel Certificates**
Tabel Anda harus memiliki struktur seperti ini:

| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | int (Primary Key) | Auto-increment ID |
| `Img` | text | URL gambar certificate (bisa dari URL publik atau base64) |
| Created_at | timestamp | Waktu pembuatan (auto) |

### **4. Menambah Certificate Baru**

#### **Opsi A: Upload Gambar ke Supabase Storage (Recommended)**

1. **Buat folder storage untuk certificates:**
   - Di Supabase Dashboard, buka **Storage** tab
   - Klik **Create new bucket** → beri nama `certificates` → Buat

2. **Upload file gambar:**
   - Masuk ke bucket `certificates`
   - Klik **Upload file**
   - Pilih file gambar certificate Anda (PNG, JPG, WebP)
   - Setelah upload, copy URL publik gambar

3. **Tambah record di tabel certificates:**
   - Buka tabel `certificates`
   - Klik **Insert row** / **+** button
   - Isi kolom `Img` dengan URL publik yang sudah di-copy
   - Klik **Save**

#### **Opsi B: Gunakan URL Gambar Eksternal**

Jika certificate sudah tersimpan di Google Drive, Imgur, atau tempat lain:

1. Buka tabel `certificates` di Supabase
2. Klik **Insert row**
3. Paste URL gambar di kolom `Img`
4. Klik **Save**

**Contoh URL yang valid:**
```
https://lh3.googleusercontent.com/xxxxx (Google Drive)
https://imgur.com/xxxxx.jpg
https://your-domain.com/certificate.jpg
```

### **5. Format URL Google Drive (jika menggunakan)**

Jika gambar tersimpan di Google Drive:

1. **Buka file di Google Drive**
2. **Right-click → Get link**
3. **Copy link dan ubah formatnya:**
   - Dari: `https://drive.google.com/file/d/FILE_ID/view`
   - Menjadi: `https://drive.google.com/uc?id=FILE_ID`

   Contoh:
   ```
   https://drive.google.com/uc?id=1ABC123DEF456
   ```

---

## 🖼️ Cara Membuat Gambar Certificate

### **Template Online (Gratis):**
- **Canva** - [canva.com](https://canva.com) - Pilih "Certificate" template
- **Figma** - Buat custom design
- **Adobe Express** - Template certificate gratis

### **Dimensi Rekomendasi:**
- **Lebar:** 1200-1400 px
- **Tinggi:** 800-1000 px
- **Format:** PNG atau JPG dengan kualitas tinggi
- **Ukuran file:** Max 2-3 MB

---

## 📱 Melihat Certificates di Website

Setelah menambah certificates ke Supabase:

1. **Hard refresh website:** `Ctrl+Shift+R` (Windows/Linux) atau `Cmd+Shift+R` (Mac)
2. **Buka tab "Certificates"** di Portfolio page
3. Certificates akan tampil dalam grid layout

### **Fitur yang Tersedia:**
- ✅ Hover untuk preview
- ✅ Klik untuk fullscreen
- ✅ Responsive design (mobile & desktop)
- ✅ Show More/See Less button (jika > 6 certificates)

---

## 🔍 Troubleshooting

### **Certificates tidak muncul?**

1. **Cek struktur tabel:**
   ```sql
   SELECT * FROM certificates;
   ```

2. **Pastikan kolom `Img` terisi dengan URL yang valid**
   - Coba akses URL di browser
   - Pastikan HTTPS (bukan HTTP)

3. **Clear cache browser:**
   - DevTools → Application → Clear Storage → Clear All
   - Atau akses dengan incognito mode

4. **Cek console browser:**
   - Tekan `F12`
   - Buka tab **Console**
   - Cari error messages

### **Gambar tidak muncul tapi data ada?**

- Pastikan URL gambar **accessible** (bukan private/protected)
- Coba gunakan Supabase Storage untuk hasil lebih reliable

---

## 📊 Contoh SQL untuk Insert Multiple Certificates

Jika ingin insert banyak sekaligus, gunakan SQL editor:

```sql
INSERT INTO certificates (Img) VALUES
('https://drive.google.com/uc?id=1ABC123'),
('https://imgur.com/xxxxx.jpg'),
('https://your-storage.com/cert1.png');
```

---

## 💡 Tips

1. **Organized Naming:** Beri nama file sertifikat sesuai jenis (AWS-2024.png, GoogleCloud-2024.png)
2. **Backup:** Download backup gambar-gambar sertifikat Anda
3. **Konsisten:** Gunakan ukuran dan format yang sama untuk semua certificates
4. **Kualitas:** Gunakan gambar dengan resolusi tinggi untuk hasil terbaik
5. **Ordering:** Certificates ditampilkan sesuai urutan ID di database

---

## 🚀 Next Steps

Setelah berhasil menambah certificates:
1. Test responsive design di berbagai ukuran layar
2. Optimize gambar untuk loading cepat
3. Consider menambah deskripsi untuk setiap certificate (jika ingin feature tambahan)

**Need help?** Hubungi developer atau check console browser untuk error messages.

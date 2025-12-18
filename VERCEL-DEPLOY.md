# 🚀 Vercel'e Deploy Rehberi

## 📸 Vercel Blob Storage Kurulumu

Fotoğrafların kalıcı olması için Vercel Blob Storage kullanıyoruz.

### Adım 1: Vercel Projesini Deploy Edin

1. [Vercel.com](https://vercel.com) hesabınıza giriş yapın
2. "Add New..." → "Project" butonuna tıklayın
3. Bu klasörü GitHub'a yükleyin veya direkt Vercel'e yükleyin
4. "Deploy" butonuna tıklayın

### Adım 2: Vercel Blob Storage'ı Aktif Edin

1. Vercel Dashboard'da projenize gidin
2. **Settings** sekmesine tıklayın
3. **Storage** sekmesine gidin
4. **"Create Database"** veya **"Add Storage"** butonuna tıklayın
5. **"Blob"** seçeneğini seçin
6. Bir isim verin (örn: `yilbasi-gallery`)
7. **"Create"** butonuna tıklayın

### Adım 3: Environment Variable Ekleyin

1. Vercel Dashboard'da projenize gidin
2. **Settings** → **Environment Variables** sekmesine gidin
3. Şu değişkeni ekleyin:

   **Name:** `BLOB_READ_WRITE_TOKEN`  
   **Value:** Vercel otomatik olarak oluşturur, Storage sayfasında görebilirsiniz

   Veya manuel olarak:
   - Storage sayfasında **"Settings"** → **"Tokens"** bölümünden token'ı kopyalayın
   - Environment Variables'a ekleyin

4. **"Save"** butonuna tıklayın

### Adım 4: Yeniden Deploy Edin

1. Vercel Dashboard'da **Deployments** sekmesine gidin
2. En son deployment'ın yanındaki **"..."** butonuna tıklayın
3. **"Redeploy"** seçeneğini seçin
4. Veya kodda bir değişiklik yapıp push edin (otomatik deploy olur)

## ✅ Artık Hazır!

Fotoğraflar artık Vercel Blob Storage'da kalıcı olarak saklanıyor:

- ✅ Tüm cihazlardan erişilebilir
- ✅ Kalıcı (silinene kadar kaybolmaz)
- ✅ Hızlı CDN ile servis edilir
- ✅ Güvenli

## 🔍 Test Etmek İçin

1. Admin olarak giriş yapın (volkan31 / 2003)
2. Galeri sayfasına gidin
3. Fotoğraf yükleyin
4. Farklı bir cihaz/tarayıcıdan kontrol edin - fotoğraflar görünmeli!

## 📝 Notlar

- Vercel Blob Storage ücretsiz planında sınırlı depolama alanı var
- Ücretli planlarda daha fazla alan var
- Fotoğraflar silinene kadar kalıcıdır


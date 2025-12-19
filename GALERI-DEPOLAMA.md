# 📸 Galeri Depolama Sistemi

## 🎯 Mevcut Sistem: LocalStorage

Fotoğraflar şu anda **tarayıcınızın LocalStorage'ında** saklanıyor.

### ✅ Avantajlar:
- ✅ Anında çalışır, herhangi bir backend gerekmez
- ✅ Ücretsiz
- ✅ Sayfa yenilendiğinde fotoğraflar kaybolmaz
- ✅ Hızlı erişim

### ⚠️ Sınırlamalar:
- 📱 Sadece o tarayıcıda görünür (farklı cihazlarda göremezsiniz)
- 💾 Tarayıcı başına ~5-10MB limit (çoğu tarayıcı için)
- 🗑️ Tarayıcı verilerini temizlerseniz fotoğraflar silinir

---

## 🚀 Gelecekte: Vercel Blob Storage (Opsiyonel)

Eğer fotoğrafların **tüm cihazlardan erişilebilir** olmasını istiyorsanız, Vercel Blob Storage entegrasyonu ekleyebiliriz.

### ✅ Avantajlar:
- 🌐 Tüm cihazlardan erişilebilir
- 💾 Sınırsız depolama (ücretli plan ile)
- ⚡ Hızlı CDN ile servis edilir
- 🔒 Güvenli ve güvenilir

### 📋 Nasıl Eklenir:

1. **Vercel Blob Storage hesabı oluşturun**
2. **API endpoint ekleyeceğim** (`app/api/upload/route.ts`)
3. **Gallery komponentini güncelleyeceğim**

Şu an LocalStorage sistemi çalışıyor ve yeterli. İhtiyaç olursa Vercel Blob Storage'ı ekleyebiliriz!

---

## 📝 Kullanım

1. **Fotoğraf Ekle**: "📷 Fotoğraf Ekle" butonuna tıklayın
2. **Görüntüle**: Fotoğraflara tıklayarak tam ekran görüntüleyin
3. **Sil**: Fotoğrafın üzerine gelip 🗑️ butonuna tıklayın
4. **Tümünü Sil**: "🗑️ Tümünü Sil" butonuyla tüm fotoğrafları temizleyin

Fotoğraflar otomatik olarak kaydedilir ve sayfa yenilendiğinde korunur! 🎉




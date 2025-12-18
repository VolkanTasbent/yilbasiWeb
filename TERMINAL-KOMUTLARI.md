# 🔧 Terminal Komutları

## Sorun: "Operation not permitted" Hatası

Bu hata macOS'un güvenlik özelliklerinden kaynaklanıyor. Şu adımları takip edin:

### 1. Terminal'i Açın

Finder'da Applications → Utilities → Terminal'i açın.

### 2. Proje Klasörüne Gidin

```bash
cd /Users/volkantasbent/Desktop/yılbaşı
```

### 3. Gerekirse Bağımlılıkları Yükleyin

```bash
npm install
```

### 4. Sunucuyu Başlatın

```bash
npm run dev
```

### 5. Tarayıcıda Açın

Terminal'de şu mesajı göreceksiniz:
```
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
```

Tarayıcınızda **http://localhost:3000** adresini açın.

---

## Alternatif: Production Build

Eğer dev modu çalışmazsa, production build deneyin:

```bash
npm run build
npm start
```

---

## Vercel'e Deploy (En Kolay Çözüm!)

Vercel'de bu sorun olmaz çünkü cloud'da çalışır:

1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub ile giriş yapın
3. "Add New Project" tıklayın
4. Bu klasörü sürükle-bırak yapın
5. "Deploy" butonuna tıklayın
6. 2 dakika içinde siteniz canlı! 🎉

Vercel'de "Operation not permitted" hatası olmaz çünkü cloud ortamında çalışır.


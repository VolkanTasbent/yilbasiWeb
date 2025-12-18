# 🚀 Hızlı Başlatma Rehberi

## Seçenek 1: Vercel'e Deploy (EN KOLAY - ÖNERİLEN) ⭐

### Adım 1: Vercel CLI Yükleyin
```bash
npm install -g vercel
```

### Adım 2: Deploy Edin
```bash
cd /Users/volkantasbent/Desktop/yılbaşı
vercel
```

İlk soruda **"Y"** yazın (Link to existing project? No)
Diğer sorularda **Enter**'a basın (default değerleri kabul edin)

### Adım 3: Production Deploy
```bash
vercel --prod
```

2 dakika içinde siteniz canlı olacak! Link terminalde görünecek.

---

## Seçenek 2: Vercel Web Arayüzü

1. [vercel.com](https://vercel.com) açın
2. GitHub ile giriş yapın (ücretsiz)
3. "Add New Project" → "Upload" seçin
4. Bu klasörü sürükle-bırak yapın
5. "Deploy" butonuna tıklayın
6. 2 dakika içinde hazır!

---

## Seçenek 3: Yerel Çalıştırma (Sorun varsa)

Eğer yerel çalıştırmak istiyorsanız:

```bash
cd /Users/volkantasbent/Desktop/yılbaşı
npm install
npm run build
npm start
```

Sonra http://localhost:3000 adresini açın.

---

## ⚠️ Önemli Not

Eğer "Operation not permitted" hatası alıyorsanız:
- Bu macOS güvenlik özelliğidir
- **En kolay çözüm: Vercel'e deploy edin** (yukarıdaki Seçenek 1 veya 2)
- Vercel'de bu sorun olmaz çünkü cloud'da çalışır


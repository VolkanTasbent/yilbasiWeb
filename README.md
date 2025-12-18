# 🎄 Yılbaşı Hediyeleşme Web Sitesi

4 kişilik yılbaşı hediye çekilişi için özel olarak tasarlanmış, Christmas temalı web sitesi.

## ✨ Özellikler

- 🎄 **Christmas Temalı Tasarım**: Her yerde yılbaşı ağacı ve Christmas dekorasyonları
- 📸 **Galeri Bölümü**: Fotoğraflarınızı yükleyip görüntüleyebilirsiniz
- 🎲 **Çekiliş Sistemi**: 4 kişi arasında hediye eşleştirmesi yapabilirsiniz
- ❄️ **Kar Efekti**: Sayfada sürekli kar taneleri yağıyor
- 🎨 **Yüksek Kaliteli Görsel Tasarım**: Modern ve göz alıcı arayüz

## 🚀 Kurulum ve Çalıştırma

### Yerel Geliştirme

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

### Vercel'e Deploy (Tek Tıkla!)

**Yöntem 1: Vercel Web Arayüzü (En Kolay)**
1. [Vercel](https://vercel.com) hesabınıza giriş yapın (ücretsiz GitHub ile kayıt olabilirsiniz)
2. "Add New..." → "Project" butonuna tıklayın
3. Bu klasörü bir GitHub repository'sine yükleyin (opsiyonel ama önerilir)
4. Vercel'de "Import Git Repository" seçeneğini seçin ve repository'nizi bulun
5. **Ya da** "Upload" seçeneğini seçerek bu klasörü sürükle-bırak ile yükleyin
6. Vercel otomatik olarak Next.js projesini algılayacak - hiçbir ayar yapmanıza gerek yok!
7. **"Deploy" butonuna tıklayın** - Tek tuşla yayında! 🎉
8. Birkaç dakika içinde siteniz canlı olacak!

**Yöntem 2: Vercel CLI (Terminal)**
```bash
# Vercel CLI'ı global olarak yükleyin
npm i -g vercel

# Proje klasöründe
cd /Users/volkantasbent/Desktop/yılbaşı

# Deploy edin
vercel

# İlk seferinde birkaç soru soracak, "Y" diyerek ilerleyin
# Prodüksiyona deploy için
vercel --prod
```

**Önemli Notlar:**
- Vercel ücretsiz planı bu proje için yeterlidir
- Domain otomatik olarak verilir (örn: `yilbasi-xxx.vercel.app`)
- Her kod değişikliğinde otomatik olarak yeniden deploy edilir (GitHub ile bağlarsanız)

## 📁 Proje Yapısı

```
├── app/
│   ├── layout.tsx       # Ana layout
│   ├── page.tsx         # Ana sayfa
│   └── globals.css      # Global stiller
├── components/
│   ├── ChristmasTree.tsx # Yılbaşı ağacı komponenti
│   ├── Gallery.tsx      # Galeri komponenti
│   ├── GiftDraw.tsx     # Çekiliş komponenti
│   └── SnowEffect.tsx   # Kar efekti komponenti
└── package.json
```

## 🎁 Kullanım

1. **Ana Sayfa**: Karşılama ekranı ve navigasyon butonları
2. **Galeri**: Fotoğraf yükleyip görüntüleyebilirsiniz
3. **Çekiliş**: 4 kişinin isimlerini girip çekiliş yapabilirsiniz

## 🛠️ Teknolojiler

- **Next.js 14**: React framework
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Stil framework'ü
- **Framer Motion**: Animasyonlar
- **Vercel**: Deployment platformu

Mutlu yıllar! 🎄✨


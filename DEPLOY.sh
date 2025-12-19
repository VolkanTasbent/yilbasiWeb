#!/bin/bash

echo "🚀 Vercel'e deploy ediliyor..."
echo ""

# Vercel CLI kontrolü
if ! command -v vercel &> /dev/null
then
    echo "📦 Vercel CLI yükleniyor..."
    npm install -g vercel
fi

echo "🌐 Vercel'e bağlanılıyor..."
vercel --prod

echo ""
echo "✅ Deploy tamamlandı! Site linki yukarıda görünecek."




import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yılbaşı Hediyeleşme 🎄',
  description: 'Mutlu yıllar! Hediye çekilişi için hazır mısınız?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  )
}


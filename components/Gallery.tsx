'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'yilbasi-gallery-images'

interface ImageData {
  id: string
  url: string
  uploadedAt: number
}

interface GalleryProps {
  isAdmin?: boolean
}

export default function Gallery({ isAdmin = false }: GalleryProps) {
  const [images, setImages] = useState<ImageData[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [useVercelBlob, setUseVercelBlob] = useState(false)

  // Check if Vercel Blob is available
  useEffect(() => {
    const checkVercelBlob = async () => {
      try {
        const response = await fetch('/api/images/list')
        if (response.ok) {
          setUseVercelBlob(true)
          const data = await response.json()
          setImages(data)
          setIsLoading(false)
          return
        }
      } catch (error) {
        console.log('Vercel Blob not available, using LocalStorage')
      }
      // Fallback to LocalStorage
      setUseVercelBlob(false)
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          setImages(Array.isArray(parsed) ? parsed : [])
        }
      } catch (error) {
        console.error('Fotoğraflar yüklenirken hata:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkVercelBlob()
  }, [])

  // Save to LocalStorage if not using Vercel Blob
  useEffect(() => {
    if (!isLoading && !useVercelBlob) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images))
      } catch (error) {
        console.error('Fotoğraflar kaydedilirken hata:', error)
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          alert('❌ Tarayıcı depolama alanı dolu!\n\nFotoğraflar LocalStorage\'da saklanıyor (5-10MB limit). Lütfen bazı fotoğrafları silin.')
        }
      }
    }
  }, [images, isLoading, useVercelBlob])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (const file of Array.from(files)) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} dosyası çok büyük! Maksimum 5MB olabilir.`)
        continue
      }

      if (useVercelBlob) {
        // Upload to Vercel Blob
        try {
          const formData = new FormData()
          formData.append('file', file)

          const response = await fetch('/api/images/upload', {
            method: 'POST',
            body: formData,
          })

          if (response.ok) {
            const data = await response.json()
            const newImage: ImageData = {
              id: data.url,
              url: data.url,
              uploadedAt: data.uploadedAt,
            }
            setImages((prev) => [newImage, ...prev])
          } else {
            alert(`${file.name} yüklenirken hata oluştu.`)
          }
        } catch (error) {
          console.error('Upload error:', error)
          alert('Fotoğraf yüklenirken bir hata oluştu.')
        }
      } else {
        // Upload to LocalStorage
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result
          if (result) {
            const newImage: ImageData = {
              id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              url: result as string,
              uploadedAt: Date.now(),
            }
            setImages((prev) => [...prev, newImage])
          }
        }
        reader.onerror = () => {
          console.error('Dosya okuma hatası')
          alert('Fotoğraf yüklenirken bir hata oluştu.')
        }
        reader.readAsDataURL(file)
      }
    }
    e.target.value = ''
  }

  const handleDeleteImage = async (image: ImageData, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (!confirm('Bu fotoğrafı silmek istediğinize emin misiniz?')) {
      return
    }

    if (useVercelBlob) {
      try {
        const response = await fetch(`/api/images/delete?url=${encodeURIComponent(image.url)}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setImages((prev) => prev.filter((img) => img.id !== image.id))
          if (selectedImage === image.url) {
            setSelectedImage(null)
          }
        } else {
          alert('Fotoğraf silinirken hata oluştu.')
        }
      } catch (error) {
        console.error('Delete error:', error)
        alert('Fotoğraf silinirken bir hata oluştu.')
      }
    } else {
      setImages((prev) => prev.filter((img) => img.id !== image.id))
      if (selectedImage === image.url) {
        setSelectedImage(null)
      }
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-7xl font-black text-center mb-12 text-gradient"
        style={{ letterSpacing: '-0.02em' }}
      >
        Galeri
      </motion.h2>

      {/* Storage Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 text-center"
      >
        <div className="glass rounded-xl p-4 inline-block">
          <p className="text-white/80 text-sm">
            {useVercelBlob ? (
              <>
                ✅ <strong>Vercel Blob Storage</strong> kullanılıyor (kalıcı, tüm cihazlardan erişilebilir)
              </>
            ) : (
              <>
                💾 <strong>LocalStorage</strong> kullanılıyor (sadece bu tarayıcıda, ~5-10MB limit)
                <br />
                <span className="text-xs text-white/60">
                  Kalıcı saklama için Vercel'e deploy edin (VERCEL-DEPLOY.md dosyasına bakın)
                </span>
              </>
            )}
          </p>
        </div>
      </motion.div>

      {/* Upload Button - Only for Admin */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex justify-center gap-4 flex-wrap"
        >
          <label className="cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 glass-strong text-white text-lg font-semibold rounded-xl inline-block glow-hover"
            >
              👑 Fotoğraf Ekle (Admin)
            </motion.div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {images.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                if (confirm('Tüm fotoğrafları silmek istediğinize emin misiniz?')) {
                  if (useVercelBlob) {
                    try {
                      await Promise.all(
                        images.map((img) =>
                          fetch(`/api/images/delete?url=${encodeURIComponent(img.url)}`, {
                            method: 'DELETE',
                          })
                        )
                      )
                      setImages([])
                      setSelectedImage(null)
                    } catch (error) {
                      alert('Fotoğraflar silinirken hata oluştu.')
                    }
                  } else {
                    setImages([])
                    setSelectedImage(null)
                  }
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-red-500/50 transition-all"
            >
              Tümünü Sil
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Non-Admin Message */}
      {!isAdmin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 glass-strong rounded-xl p-6 text-center"
        >
          <p className="text-white/80 text-lg">
            👑 Fotoğraf yükleme yetkisi sadece admin'de. Fotoğrafları görüntüleyebilirsiniz.
          </p>
        </motion.div>
      )}

      {/* Image Count */}
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center text-white/70 text-sm"
        >
          {images.length} fotoğraf {useVercelBlob ? 'Vercel Blob Storage\'da' : 'LocalStorage\'da'} saklanıyor
        </motion.div>
      )}

      {/* Image Grid */}
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-white/60 text-xl"
        >
          Fotoğraflar yükleniyor...
        </motion.div>
      ) : images.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-white/60 text-xl"
        >
          {isAdmin
            ? 'Henüz fotoğraf eklenmedi. Yukarıdaki butona tıklayarak fotoğraf ekleyebilirsiniz!'
            : 'Henüz fotoğraf eklenmemiş.'}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(img.url)}
                className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-2xl group glass"
              >
                <img
                  src={img.url}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Büyüt
                  </span>
                </div>
                {isAdmin && (
                  <button
                    onClick={(e) => handleDeleteImage(img, e)}
                    className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-700 text-white rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10 text-sm font-medium"
                    title="Fotoğrafı Sil"
                  >
                    Sil
                  </button>
                )}
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatDate(img.uploadedAt)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal for full image view */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold hover:scale-110 transition-transform glass"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

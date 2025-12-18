'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import BeautifulTree from './BeautifulTree'
import JumpingReindeers from './JumpingReindeers'

export default function ModernHero({ onNavigate }: { onNavigate: (section: 'home' | 'gallery' | 'draw') => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      containerRef.current.style.setProperty('--mouse-x', `${x}%`)
      containerRef.current.style.setProperty('--mouse-y', `${y}%`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10">
      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.2))',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center mb-8"
      >
        <motion.h1
          className="text-7xl md:text-9xl font-black mb-4 text-gradient"
          style={{
            textShadow: '0 0 80px rgba(102, 126, 234, 0.5)',
            letterSpacing: '-0.02em',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          Mutlu Yıllar
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/70 font-light tracking-wide"
        >
          Hediyeleşme zamanı geldi
        </motion.p>
      </motion.div>

      {/* Beautiful Tree with Reindeers */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-16 w-full"
        style={{ minHeight: '400px' }}
      >
        <BeautifulTree />
        
        {/* Zıplayan Ren Geyikleri */}
        <JumpingReindeers />
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-col md:flex-row gap-6 z-10"
      >
        <motion.button
          onClick={() => onNavigate('gallery')}
          className="group relative px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
          }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 text-white">Galeri</span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>

        <motion.button
          onClick={() => onNavigate('draw')}
          className="group relative px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden glass-strong glow-hover"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 text-white">Çekiliş Yap</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </motion.div>
    </div>
  )
}


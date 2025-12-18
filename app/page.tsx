'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedBackground from '@/components/AnimatedBackground'
import ModernHero from '@/components/ModernHero'
import Gallery from '@/components/Gallery'
import SharedDraw from '@/components/SharedDraw'
import Login from '@/components/Login'

interface User {
  username: string
  isAdmin: boolean
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState<'home' | 'gallery' | 'draw'>('home')
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted (client-side only)
    setMounted(true)
    
    // Check localStorage after mount
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('yilbasi-user')
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser)
          // Only set user if it's valid
          if (parsedUser && parsedUser.username) {
            setUser(parsedUser)
          } else {
            localStorage.removeItem('yilbasi-user')
          }
        } catch (e) {
          // If parse fails, clear it
          localStorage.removeItem('yilbasi-user')
        }
      }
    }
  }, [])

  const handleLogin = (username: string, isAdmin: boolean) => {
    setUser({ username, isAdmin })
  }

  const handleLogout = () => {
    localStorage.removeItem('yilbasi-user')
    setUser(null)
  }

  // Show login screen until mounted and user is checked
  // This ensures login screen is always shown first if no user
  if (!mounted || !user) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <Login onLogin={handleLogin} />
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated particle background */}
      <AnimatedBackground />

      {/* Floating gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Hero Section */}
      <AnimatePresence mode="wait">
        {currentSection === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ModernHero onNavigate={setCurrentSection} />
          </motion.div>
        )}

        {/* Gallery Section */}
        {currentSection === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen px-4 py-20 relative z-10"
          >
            <motion.button
              onClick={() => setCurrentSection('home')}
              className="mb-8 px-6 py-3 glass rounded-xl text-white hover:bg-white/20 transition-all backdrop-blur-xl glow-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Ana Sayfaya Dön
            </motion.button>
            <Gallery isAdmin={user.isAdmin} />
          </motion.div>
        )}

        {/* Draw Section */}
        {currentSection === 'draw' && (
          <motion.div
            key="draw"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen px-4 py-20 relative z-10"
          >
            <motion.button
              onClick={() => setCurrentSection('home')}
              className="mb-8 px-6 py-3 glass rounded-xl text-white hover:bg-white/20 transition-all backdrop-blur-xl glow-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Ana Sayfaya Dön
            </motion.button>
            <SharedDraw currentUser={user.username} isAdmin={user.isAdmin} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 px-4 py-2 glass text-white rounded-xl hover:bg-white/20 transition-all text-sm z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Çıkış Yap ({user.username})
      </motion.button>
    </main>
  )
}

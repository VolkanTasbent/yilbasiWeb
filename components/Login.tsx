'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface LoginProps {
  onLogin: (username: string, isAdmin: boolean) => void
}

const USERS = [
  { username: 'volkan31', password: '2003', isAdmin: true },
  { username: 'rana28', password: '01102021', isAdmin: false },
  { username: 'naile29', password: '2929', isAdmin: false },
  { username: 'merve30', password: '3030', isAdmin: false },
]

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const user = USERS.find(u => u.username === username && u.password === password)
    
    if (user) {
      localStorage.setItem('yilbasi-user', JSON.stringify({ username: user.username, isAdmin: user.isAdmin }))
      onLogin(user.username, user.isAdmin)
    } else {
      setError('Kullanıcı adı veya şifre hatalı!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong rounded-3xl p-10 max-w-md w-full glow relative z-10"
      >
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black mb-3 text-gradient"
          >
            🎄 Yılbaşı
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            Hediye Çekilişi Sistemi
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-white/90 font-semibold mb-3 text-lg">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              className="w-full px-5 py-4 glass rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-white/40"
              placeholder="Kullanıcı adınızı girin"
              required
              autoComplete="username"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <label className="block text-white/90 font-semibold mb-3 text-lg">Şifre</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className="w-full px-5 py-4 glass rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-white/40 pr-12"
                placeholder="Şifrenizi girin"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border-2 border-red-500/50 text-red-200 px-5 py-4 rounded-xl text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white text-xl font-bold rounded-xl shadow-2xl glow-hover transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Giriş Yap</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-purple-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </form>

        {/* User info - only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-8 border-t border-white/20"
          >
            <p className="text-white/60 text-sm text-center mb-4">Giriş Bilgileri:</p>
            <div className="space-y-2 text-xs text-white/70">
              <div className="flex items-center justify-between">
                <span>👑 Admin:</span>
                <span className="font-semibold">volkan31 / 2003</span>
              </div>
              <div className="flex items-center justify-between">
                <span>👤 Kullanıcı 1:</span>
                <span className="font-semibold">rana28 / 01102021</span>
              </div>
              <div className="flex items-center justify-between">
                <span>👤 Kullanıcı 2:</span>
                <span className="font-semibold">naile29 / 2929</span>
              </div>
              <div className="flex items-center justify-between">
                <span>👤 Kullanıcı 3:</span>
                <span className="font-semibold">merve30 / 3030</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'yilbasi-draw-state'
const STORAGE_RESULTS = 'yilbasi-draw-results'
const STORAGE_ONLINE_USERS = 'yilbasi-online-users'
const STORAGE_COUNTDOWN = 'yilbasi-countdown'

interface DrawState {
  isDrawActive: boolean
  isDrawComplete: boolean
  countdown: number | null
  results: Array<{ giver: string; receiver: string }> | null
}

interface OnlineUser {
  username: string
  lastSeen: number
}

export default function SharedDraw({ currentUser, isAdmin }: { currentUser: string; isAdmin: boolean }) {
  const [drawState, setDrawState] = useState<DrawState>({
    isDrawActive: false,
    isDrawComplete: false,
    countdown: null,
    results: null,
  })
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Kişi 1' },
    { id: 2, name: 'Kişi 2' },
    { id: 3, name: 'Kişi 3' },
    { id: 4, name: 'Kişi 4' },
  ])
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Update online status using API
  useEffect(() => {
    let isMounted = true
    let updateInterval: NodeJS.Timeout
    let fetchInterval: NodeJS.Timeout

    const updateOnlineStatus = async () => {
      try {
        // Send heartbeat to server
        await fetch('/api/presence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: currentUser }),
        })
      } catch (error) {
        console.error('Failed to update presence:', error)
      }
    }

    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch('/api/presence')
        if (response.ok && isMounted) {
          const users = await response.json() as OnlineUser[]
          setOnlineUsers(users)
        }
      } catch (error) {
        console.error('Failed to fetch online users:', error)
        // Fallback to localStorage if API fails
        const users = JSON.parse(localStorage.getItem(STORAGE_ONLINE_USERS) || '[]') as OnlineUser[]
        const now = Date.now()
        const activeUsers = users.filter(u => now - u.lastSeen < 5000)
        setOnlineUsers(activeUsers)
      }
    }

    // Initial update and fetch
    updateOnlineStatus()
    fetchOnlineUsers()

    // Update presence every 2 seconds
    updateInterval = setInterval(updateOnlineStatus, 2000)
    
    // Fetch online users every 1 second
    fetchInterval = setInterval(fetchOnlineUsers, 1000)

    // Cleanup on unmount
    return () => {
      isMounted = false
      clearInterval(updateInterval)
      clearInterval(fetchInterval)
      
      // Remove user from server
      fetch('/api/presence?username=' + encodeURIComponent(currentUser), {
        method: 'DELETE',
      }).catch(console.error)
    }
  }, [currentUser])

  // Listen for storage changes and countdown (for draw state sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_COUNTDOWN) {
        const countdown = e.newValue ? parseInt(e.newValue) : null
        setDrawState(prev => ({ ...prev, countdown }))
      }
      if (e.key === STORAGE_RESULTS) {
        const results = e.newValue ? JSON.parse(e.newValue) : null
        if (results) {
          setDrawState(prev => ({ ...prev, results, isDrawComplete: true, isDrawActive: false, countdown: null }))
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current)
          }
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Poll for changes (for same-tab updates)
    const interval = setInterval(() => {
      const countdown = localStorage.getItem(STORAGE_COUNTDOWN)
      const results = localStorage.getItem(STORAGE_RESULTS)
      const state = localStorage.getItem(STORAGE_KEY)
      
      if (countdown) {
        const count = parseInt(countdown)
        setDrawState(prev => ({ ...prev, countdown: count }))
        
        if (count <= 0 && results) {
          const parsedResults = JSON.parse(results)
          setDrawState(prev => ({ 
            ...prev, 
            results: parsedResults, 
            isDrawComplete: true, 
            isDrawActive: false, 
            countdown: null 
          }))
        }
      }
      
      if (results && !drawState.results) {
        const parsedResults = JSON.parse(results)
        setDrawState(prev => ({ ...prev, results: parsedResults, isDrawComplete: true, isDrawActive: false }))
      }
    }, 500) // Poll every 500ms for better sync

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [drawState.results])

  // Countdown logic
  useEffect(() => {
    if (drawState.countdown !== null && drawState.countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        const currentCountdown = parseInt(localStorage.getItem(STORAGE_COUNTDOWN) || '0')
        if (currentCountdown > 0) {
          const newCount = currentCountdown - 1
          localStorage.setItem(STORAGE_COUNTDOWN, newCount.toString())
          setDrawState(prev => ({ ...prev, countdown: newCount }))
        } else {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current)
          }
        }
      }, 1000)
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [drawState.countdown])

  // Load initial state
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY)
    const savedResults = localStorage.getItem(STORAGE_RESULTS)
    const savedCountdown = localStorage.getItem(STORAGE_COUNTDOWN)
    
    if (savedState) {
      setDrawState(JSON.parse(savedState))
    }
    
    if (savedResults) {
      const results = JSON.parse(savedResults)
      setDrawState(prev => ({ ...prev, results, isDrawComplete: true }))
    }
    
    if (savedCountdown) {
      const count = parseInt(savedCountdown)
      setDrawState(prev => ({ ...prev, countdown: count }))
    }
    
    // Fetch initial online users from API
    fetch('/api/presence')
      .then(res => res.json())
      .then((users: OnlineUser[]) => setOnlineUsers(users))
      .catch(() => {
        // Fallback: do nothing, will be handled by updateOnlineStatus
      })
  }, [])

  const handleNameChange = (id: number, newName: string) => {
    const updated = participants.map(p => p.id === id ? { ...p, name: newName } : p)
    setParticipants(updated)
  }

  const performDraw = () => {
    if (!isAdmin) return

    // Start countdown
    localStorage.setItem(STORAGE_COUNTDOWN, '10')
    setDrawState(prev => ({ ...prev, isDrawActive: true, isDrawComplete: false, countdown: 10 }))

    // Perform draw after 10 seconds
    setTimeout(() => {
      const names = participants.map(p => p.name)
      let receivers = [...names]
      
      // Fisher-Yates shuffle
      let valid = false
      let attempts = 0
      
      while (!valid && attempts < 1000) {
        for (let i = receivers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [receivers[i], receivers[j]] = [receivers[j], receivers[i]]
        }
        valid = names.every((giver, idx) => giver !== receivers[idx])
        attempts++
      }
      
      if (!valid) {
        receivers = [...names]
        receivers.push(receivers.shift()!)
      }

      const results = names.map((giver, index) => ({
        giver,
        receiver: receivers[index],
      }))

      // Save results
      localStorage.setItem(STORAGE_RESULTS, JSON.stringify(results))
      localStorage.setItem(STORAGE_COUNTDOWN, '0')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        isDrawActive: false,
        isDrawComplete: true,
        results,
      }))
      
      setDrawState(prev => ({ ...prev, results, isDrawComplete: true, isDrawActive: false, countdown: 0 }))
    }, 10000)
  }

  const resetDraw = () => {
    if (!isAdmin) return
    localStorage.removeItem(STORAGE_RESULTS)
    localStorage.removeItem(STORAGE_COUNTDOWN)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      isDrawActive: false,
      isDrawComplete: false,
      results: null,
    }))
    setDrawState({
      isDrawActive: false,
      isDrawComplete: false,
      countdown: null,
      results: null,
    })
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Online Users Counter - Top Green Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 glass-strong rounded-xl p-5 text-center glow border-2 border-green-500/30"
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
          <span className="text-green-400 font-black text-2xl">
            🟢 Sistemde {onlineUsers.length} kişi var
          </span>
          {onlineUsers.length > 0 && (
            <div className="text-white/70 text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
              {onlineUsers.map(u => u.username).join(', ')}
            </div>
          )}
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-7xl font-black text-center mb-12 text-gradient"
        style={{ letterSpacing: '-0.02em' }}
      >
        Hediye Çekilişi
      </motion.h2>

      {/* Countdown Display */}
      {drawState.countdown !== null && drawState.countdown > 0 && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            key={drawState.countdown}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="inline-block"
          >
            <div className="text-9xl font-black text-gradient" style={{ textShadow: '0 0 50px rgba(102, 126, 234, 0.8)' }}>
              {drawState.countdown}
            </div>
          </motion.div>
          <p className="text-2xl text-white/80 mt-4 font-semibold">Çekiliş başlıyor...</p>
        </motion.div>
      )}

      {/* Edit Names - Only visible if not drawn */}
      {!drawState.isDrawComplete && drawState.countdown === null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 glass-strong rounded-3xl p-8 glow"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Katılımcı İsimleri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {participants.map((person) => (
              <div key={person.id} className="flex items-center gap-4">
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handleNameChange(person.id, e.target.value)}
                  className="flex-1 px-4 py-3 glass rounded-xl text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="İsim girin..."
                  disabled={drawState.isDrawActive || drawState.countdown !== null}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Admin Draw Button */}
      {isAdmin && !drawState.isDrawActive && !drawState.isDrawComplete && drawState.countdown === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={performDraw}
            disabled={participants.some(p => !p.name.trim())}
            className="px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white text-2xl font-bold rounded-2xl shadow-2xl glow-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            🎲 Çekilişi Başlat
          </motion.button>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {drawState.isDrawComplete && drawState.results && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-black text-center text-white mb-8 text-gradient"
            >
              🎉 Çekiliş Sonuçları 🎉
            </motion.h3>

            {drawState.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass rounded-xl p-6 glow-hover"
              >
                <div className="flex items-center justify-between text-white">
                  <div className="flex-1">
                    <p className="text-2xl font-bold mb-1">{result.giver}</p>
                    <p className="text-sm opacity-70">hediye verecek</p>
                  </div>
                  <div className="mx-8 text-3xl opacity-50">→</div>
                  <div className="flex-1 text-right">
                    <p className="text-2xl font-bold mb-1">{result.receiver}</p>
                    <p className="text-sm opacity-70">hediye alacak</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isAdmin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetDraw}
                  className="px-8 py-4 glass-strong text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                >
                  🔄 Yeni Çekiliş Yap
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current User Info */}
      <div className="mt-8 text-center text-white/60 text-sm">
        Giriş yapan: <span className="font-semibold text-white">{currentUser}</span>
        {isAdmin && <span className="ml-2">👑</span>}
      </div>
    </div>
  )
}

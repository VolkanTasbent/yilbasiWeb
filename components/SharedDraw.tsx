'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
  countdownStartTime?: number | null
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
    countdownStartTime: null,
  })
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Kişi 1' },
    { id: 2, name: 'Kişi 2' },
    { id: 3, name: 'Kişi 3' },
    { id: 4, name: 'Kişi 4' },
  ])
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Optimized online status updates
  useEffect(() => {
    let isMounted = true
    let updateInterval: NodeJS.Timeout
    let fetchInterval: NodeJS.Timeout
    let lastUsersHash = ''

    const updateOnlineStatus = async () => {
      if (!isMounted) return
      try {
        await fetch('/api/presence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: currentUser }),
        })
      } catch (error) {
        // Silent error
      }
    }

    const fetchOnlineUsers = async () => {
      if (!isMounted) return
      try {
        const response = await fetch('/api/presence', { cache: 'no-store' })
        if (response.ok) {
          const users = await response.json() as OnlineUser[]
          const usersHash = JSON.stringify(users.map(u => u.username).sort())
          
          // Only update if users changed
          if (usersHash !== lastUsersHash) {
            lastUsersHash = usersHash
            setOnlineUsers(users)
          }
        }
      } catch (error) {
        // Silent error
      }
    }

    // Initial update and fetch
    updateOnlineStatus()
    fetchOnlineUsers()

    // Optimized intervals
    updateInterval = setInterval(updateOnlineStatus, 3000) // Every 3 seconds
    fetchInterval = setInterval(fetchOnlineUsers, 2000) // Every 2 seconds

    // Cleanup on unmount
    return () => {
      isMounted = false
      clearInterval(updateInterval)
      clearInterval(fetchInterval)
      
      // Remove user from server
      fetch('/api/presence?username=' + encodeURIComponent(currentUser), {
        method: 'DELETE',
      }).catch(() => {})
    }
  }, [currentUser])

  // Poll server for draw state changes (real-time sync across all devices)
  useEffect(() => {
    let isMounted = true
    let localCountdownInterval: NodeJS.Timeout | null = null

    const fetchDrawState = async () => {
      try {
        const response = await fetch('/api/draw/state', {
          cache: 'no-store',
        })
        
        if (response.ok && isMounted) {
          const serverState = await response.json()
          
          // Calculate countdown locally if we have start time (for smoother updates)
          let calculatedCountdown = serverState.countdown
          if (serverState.countdownStartTime && serverState.isDrawActive && !serverState.isDrawComplete) {
            const now = Date.now()
            const elapsed = Math.floor((now - serverState.countdownStartTime) / 1000)
            calculatedCountdown = Math.max(0, 10 - elapsed)
          }
          
          // Update state from server
          setDrawState(prev => {
            // Only update if there's a meaningful change to avoid unnecessary re-renders
            if (
              prev.countdown !== calculatedCountdown ||
              prev.isDrawComplete !== serverState.isDrawComplete ||
              prev.isDrawActive !== serverState.isDrawActive ||
              (prev.results === null && serverState.results !== null) ||
              (prev.results !== null && JSON.stringify(prev.results) !== JSON.stringify(serverState.results)) ||
              prev.countdownStartTime !== serverState.countdownStartTime
            ) {
              return {
                isDrawActive: serverState.isDrawActive,
                isDrawComplete: serverState.isDrawComplete,
                countdown: calculatedCountdown,
                results: serverState.results,
                countdownStartTime: serverState.countdownStartTime,
              }
            }
            return prev
          })

          // Update participants if they changed
          if (serverState.participants && JSON.stringify(serverState.participants) !== JSON.stringify(participants)) {
            setParticipants(serverState.participants)
          }

          // Update countdown locally for smoother animation
          if (serverState.countdownStartTime && serverState.isDrawActive && !serverState.isDrawComplete) {
            if (localCountdownInterval) {
              clearInterval(localCountdownInterval)
            }
            localCountdownInterval = setInterval(() => {
              const now = Date.now()
              const elapsed = Math.floor((now - serverState.countdownStartTime) / 1000)
              const remaining = Math.max(0, 10 - elapsed)
              setDrawState(prev => ({ ...prev, countdown: remaining }))
            }, 100) // Update every 100ms for smooth countdown
          } else {
            if (localCountdownInterval) {
              clearInterval(localCountdownInterval)
              localCountdownInterval = null
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch draw state:', error)
        // Fallback to localStorage on error
        const countdown = localStorage.getItem(STORAGE_COUNTDOWN)
        const results = localStorage.getItem(STORAGE_RESULTS)
        if (countdown) {
          const count = parseInt(countdown)
          setDrawState(prev => ({ ...prev, countdown: count }))
        }
        if (results) {
          const parsedResults = JSON.parse(results)
          setDrawState(prev => ({ ...prev, results: parsedResults, isDrawComplete: true }))
        }
      }
    }

    // Fetch immediately
    fetchDrawState()

    // Poll every 500ms for real-time updates
    const interval = setInterval(fetchDrawState, 500)

    // Also listen for storage events (fallback)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_COUNTDOWN) {
        const countdown = e.newValue ? parseInt(e.newValue) : null
        setDrawState(prev => ({ ...prev, countdown }))
      }
      if (e.key === STORAGE_RESULTS) {
        const results = e.newValue ? JSON.parse(e.newValue) : null
        if (results) {
          setDrawState(prev => ({ ...prev, results, isDrawComplete: true, isDrawActive: false, countdown: null }))
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      isMounted = false
      clearInterval(interval)
      if (localCountdownInterval) {
        clearInterval(localCountdownInterval)
      }
      window.removeEventListener('storage', handleStorageChange)
    }
  }, []) // Only run once on mount - polling handles updates

  // Countdown is now handled by server polling (removed local countdown logic)
  // Server calculates countdown based on target time, clients poll every 500ms

  // Load initial state from server
  useEffect(() => {
    // Fetch initial draw state from API
    fetch('/api/draw/state', { cache: 'no-store' })
      .then(res => res.json())
      .then((serverState) => {
        setDrawState({
          isDrawActive: serverState.isDrawActive || false,
          isDrawComplete: serverState.isDrawComplete || false,
          countdown: serverState.countdown,
          results: serverState.results,
        })
        if (serverState.participants) {
          setParticipants(serverState.participants)
        }
      })
      .catch(() => {
        // Fallback to localStorage on error
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
      })
    
    // Fetch initial online users from API
    fetch('/api/presence')
      .then(res => res.json())
      .then((users: OnlineUser[]) => setOnlineUsers(users))
      .catch(() => {
        // Fallback: do nothing, will be handled by updateOnlineStatus
      })
  }, [])

  const handleNameChange = useCallback((id: number, newName: string) => {
    setParticipants(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, name: newName } : p)
      
      // Debounced server update (only if admin)
      if (isAdmin) {
        // Use timeout to debounce
        setTimeout(() => {
          fetch('/api/draw/state', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'updateParticipants',
              participants: updated,
            }),
          }).catch(() => {})
        }, 500)
      }
      
      return updated
    })
  }, [isAdmin])

  const performDraw = useCallback(async () => {
    if (!isAdmin) return

    try {
      // Start countdown on server
      const startResponse = await fetch('/api/draw/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' }),
      })

      if (!startResponse.ok) {
        alert('Çekiliş başlatılırken hata oluştu.')
        return
      }

      // Optimistic update
      setDrawState(prev => ({
        ...prev,
        isDrawActive: true,
        isDrawComplete: false,
        countdown: 10,
        results: null,
      }))

      // Perform draw after 10 seconds
      setTimeout(async () => {
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

        // Save results to server
        try {
          await fetch('/api/draw/state', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'complete',
              results,
            }),
          })

          // Optimistic update
          setDrawState(prev => ({
            ...prev,
            results,
            isDrawComplete: true,
            isDrawActive: false,
            countdown: 0,
          }))
        } catch (error) {
          console.error('Complete draw error:', error)
        }
      }, 10000)
    } catch (error) {
      console.error('Draw error:', error)
      alert('Çekiliş başlatılırken hata oluştu.')
    }
  }, [isAdmin, participants])

  const resetDraw = useCallback(async () => {
    if (!isAdmin) return

    // Optimistic update
    setDrawState({
      isDrawActive: false,
      isDrawComplete: false,
      countdown: null,
      results: null,
      countdownStartTime: null,
    })

    try {
      await fetch('/api/draw/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset',
          participants,
        }),
      })
    } catch (error) {
      console.error('Reset error:', error)
    }
  }, [isAdmin, participants])

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

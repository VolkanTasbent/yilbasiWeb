'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PEOPLE = [
  { id: 1, name: 'Kişi 1' },
  { id: 2, name: 'Kişi 2' },
  { id: 3, name: 'Kişi 3' },
  { id: 4, name: 'Kişi 4' },
]

export default function GiftDraw() {
  const [people, setPeople] = useState(PEOPLE)
  const [drawResults, setDrawResults] = useState<Array<{ giver: string; receiver: string }>>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  const handleNameChange = (id: number, newName: string) => {
    setPeople(people.map(p => p.id === id ? { ...p, name: newName } : p))
  }

  const performDraw = () => {
    setIsDrawing(true)
    setHasDrawn(false)
    
    setTimeout(() => {
      // Create a circular gift exchange (everyone gives to someone, everyone receives from someone)
      // Algorithm: Create a random permutation where no one gives to themselves
      const names = people.map(p => p.name)
      let receivers = [...names]
      
      // Fisher-Yates shuffle with constraint: no one gives to themselves
      let valid = false
      let attempts = 0
      
      while (!valid && attempts < 1000) {
        // Shuffle receivers
        for (let i = receivers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [receivers[i], receivers[j]] = [receivers[j], receivers[i]]
        }
        
        // Check if valid (no one gives to themselves)
        valid = names.every((giver, idx) => giver !== receivers[idx])
        attempts++
      }
      
      // If still not valid after attempts, manually fix it
      if (!valid) {
        receivers = [...names]
        // Simple circular shift: each person gives to the next one
        receivers.push(receivers.shift()!)
      }

      const results = names.map((giver, index) => ({
        giver,
        receiver: receivers[index],
      }))

      setDrawResults(results)
      setIsDrawing(false)
      setHasDrawn(true)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-7xl font-black text-center mb-12 text-gradient"
        style={{ letterSpacing: '-0.02em' }}
      >
        Hediye Çekilişi
      </motion.h2>

      {/* Edit Names */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 glass-strong rounded-3xl p-8 glow"
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">İsimleri Düzenle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {people.map((person) => (
            <div key={person.id} className="flex items-center gap-4">
              <input
                type="text"
                value={person.name}
                onChange={(e) => handleNameChange(person.id, e.target.value)}
                className="flex-1 px-4 py-3 bg-white/20 border-2 border-white/30 rounded-xl text-white text-lg font-semibold focus:outline-none focus:border-christmas-gold transition-all"
                placeholder="İsim girin..."
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Draw Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center mb-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={performDraw}
          disabled={isDrawing || people.some(p => !p.name.trim())}
          className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDrawing ? 'Çekiliş Yapılıyor...' : 'Çekilişi Yap'}
        </motion.button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {isDrawing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 mx-auto mb-4 border-4 border-white/30 border-t-white rounded-full"
            />
            <p className="text-xl text-white font-medium">Çekiliş yapılıyor...</p>
          </motion.div>
        )}

        {hasDrawn && !isDrawing && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-center text-white mb-8"
            >
              Çekiliş Sonuçları
            </motion.h3>

            {drawResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass rounded-xl p-6 glow-hover"
              >
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xl font-semibold">{result.giver}</p>
                      <p className="text-sm opacity-80">hediye verecek</p>
                    </div>
                  </div>
                  <div className="text-2xl opacity-50">→</div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl font-semibold">{result.receiver}</p>
                      <p className="text-sm opacity-80">hediye alacak</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-8"
            >
              <p className="text-white text-xl mb-4 opacity-80">Herkes mutlu olsun!</p>
              <button
                onClick={() => {
                  setHasDrawn(false)
                  setDrawResults([])
                }}
                className="px-6 py-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all"
              >
                Yeniden Çek
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


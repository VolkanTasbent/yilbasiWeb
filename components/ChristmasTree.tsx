'use client'

import { motion } from 'framer-motion'

const ORNAMENTS = ['🔴', '🟡', '🔵', '🟣', '⭐', '💎']

export default function ChristmasTree() {
  return (
    <div className="relative mt-8 mb-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: 'spring', delay: 0.5 }}
        className="relative"
      >
        {/* Star on top */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-6xl z-20"
        >
          ⭐
        </motion.div>

        {/* Tree body */}
        <div className="relative flex flex-col items-center">
          {/* Top layer */}
          <div className="relative mb-[-20px] z-10">
            <div className="w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-b-[100px] border-b-green-500 shadow-lg"></div>
            {/* Ornaments on top layer */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${25 + i * 25}%`,
                  top: `${40}%`,
                }}
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              >
                <span className="text-2xl">{ORNAMENTS[i]}</span>
              </motion.div>
            ))}
          </div>

          {/* Middle layer */}
          <div className="relative mb-[-20px] z-10">
            <div className="w-0 h-0 border-l-[110px] border-l-transparent border-r-[110px] border-r-transparent border-b-[140px] border-b-green-600 shadow-lg"></div>
            {/* Ornaments on middle layer */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${18 + i * 22}%`,
                  top: `${35}%`,
                }}
                animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.3 }}
              >
                <span className="text-2xl">{ORNAMENTS[i + 1]}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom layer */}
          <div className="relative z-10">
            <div className="w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[180px] border-b-green-700 shadow-lg"></div>
            {/* Ornaments on bottom layer */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${12 + i * 19}%`,
                  top: `${30}%`,
                }}
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
              >
                <span className="text-2xl">{ORNAMENTS[i % ORNAMENTS.length]}</span>
              </motion.div>
            ))}
          </div>

          {/* Tree trunk */}
          <div className="w-20 h-32 bg-gradient-to-b from-amber-800 to-amber-900 mt-[-20px] rounded-b-xl shadow-xl border-2 border-amber-950"></div>
        </div>

        {/* Gifts under tree */}
        <div className="flex justify-center gap-6 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ y: 100, opacity: 0, rotate: -180 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 1 + i * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="text-5xl cursor-pointer"
            >
              🎁
            </motion.div>
          ))}
        </div>

        {/* Twinkling lights effect */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `${15 + (i % 4) * 25}%`,
              top: `${30 + Math.floor(i / 4) * 30}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  )
}


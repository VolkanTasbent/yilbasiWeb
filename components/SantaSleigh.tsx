'use client'

import { motion } from 'framer-motion'

export default function SantaSleigh() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Santa's Sleigh with Reindeers - BIGGER AND MORE VISIBLE */}
      <motion.div
        initial={{ x: '-200px', y: '15vh' }}
        animate={{ 
          x: ['-200px', 'calc(100vw + 200px)'],
          y: ['15vh', '10vh', '20vh', '15vh'],
        }}
        transition={{
          x: {
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="absolute z-10"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
        }}
      >
        {/* Reindeers - MUCH BIGGER */}
        <div className="flex items-center gap-3">
          {/* Reindeer 1 */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-6xl md:text-7xl"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
          >
            🦌
          </motion.div>
          {/* Reindeer 2 */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.15,
            }}
            className="text-6xl md:text-7xl"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
          >
            🦌
          </motion.div>
          {/* Reindeer 3 */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
            className="text-6xl md:text-7xl"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
          >
            🦌
          </motion.div>
          {/* Santa's Sleigh - MUCH BIGGER */}
          <motion.div
            animate={{ 
              y: [0, -12, 0],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
          >
            <span className="text-7xl md:text-8xl">🎅</span>
            <span className="text-5xl md:text-6xl absolute -bottom-3 left-1/2 transform -translate-x-1/2">🛷</span>
          </motion.div>
          {/* Reindeer 4 */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.45,
            }}
            className="text-6xl md:text-7xl"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
          >
            🦌
          </motion.div>
        </div>
      </motion.div>

      {/* Snowflakes falling - MORE VISIBLE */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: `${(i * 2) % 100}%`,
            y: '-10%',
            opacity: 0.8 + Math.random() * 0.2,
          }}
          animate={{
            y: '110%',
            x: `${((i * 2) % 100) + (Math.random() - 0.5) * 15}%`,
          }}
          transition={{
            duration: 4 + Math.random() * 8,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 3,
          }}
          className="absolute text-white"
          style={{
            fontSize: `${15 + Math.random() * 25}px`,
            textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
          }}
        >
          ❄
        </motion.div>
      ))}

      {/* Floating Christmas decorations */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`decoration-${i}`}
          initial={{
            x: `${(i * 12.5) % 100}%`,
            y: `${20 + (i * 10) % 60}%`,
          }}
          animate={{
            y: [`${20 + (i * 10) % 60}%`, `${25 + (i * 10) % 60}%`, `${20 + (i * 10) % 60}%`],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
          className="absolute text-3xl"
          style={{
            opacity: 0.7,
          }}
        >
          {['🎄', '🎁', '⭐', '🔔', '❄️', '🎄', '🎁', '⭐'][i]}
        </motion.div>
      ))}
    </div>
  )
}


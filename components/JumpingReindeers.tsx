'use client'

import { motion } from 'framer-motion'

export default function JumpingReindeers() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-end justify-center" style={{ bottom: '10%' }}>
      {/* Zıplayan Ren Geyikleri */}
      <div className="relative w-full max-w-6xl h-full">
        {[
          { x: '15%', delay: 0, size: 0.8 },
          { x: '35%', delay: 0.4, size: 0.85 },
          { x: '65%', delay: 0.8, size: 0.9 },
          { x: '85%', delay: 1.2, size: 0.75 },
        ].map((reindeer, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: reindeer.x,
              bottom: '0',
              transform: 'translateX(-50%)',
            }}
            animate={{
              y: [0, -150, 0],
              rotate: [0, -8, 8, 0],
            }}
            transition={{
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: [0.33, 1, 0.68, 1],
                delay: reindeer.delay,
              },
              rotate: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: reindeer.delay,
              },
            }}
          >
            {/* Modern Ren Geyiği SVG */}
            <svg
              width={120 * reindeer.size}
              height={140 * reindeer.size}
              viewBox="0 0 120 140"
              style={{ filter: 'drop-shadow(0 10px 20px rgba(139, 69, 19, 0.3))' }}
            >
              {/* Gövde */}
              <ellipse
                cx="60"
                cy="85"
                rx="35"
                ry="45"
                fill="#8B4513"
                opacity="0.9"
              />
              
              {/* Boyun */}
              <ellipse
                cx="55"
                cy="50"
                rx="18"
                ry="28"
                fill="#A0522D"
                opacity="0.9"
              />
              
              {/* Kafa */}
              <ellipse
                cx="50"
                cy="30"
                rx="20"
                ry="22"
                fill="#8B4513"
              />
              
              {/* Gözler */}
              <circle cx="45" cy="28" r="3" fill="#000" />
              <circle cx="45" cy="28" r="1.5" fill="#fff" />
              
              {/* Burun */}
              <circle cx="38" cy="35" r="3" fill="#FF6B6B" />
              
              {/* Boynuzlar */}
              <path
                d="M 30 20 Q 20 10 15 5 Q 25 12 30 18"
                stroke="#654321"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M 70 18 Q 80 10 85 5 Q 75 12 70 18"
                stroke="#654321"
                strokeWidth="2.5"
                fill="none"
              />
              
              {/* Kulaklar */}
              <ellipse cx="42" cy="22" rx="5" ry="8" fill="#A0522D" />
              <ellipse cx="58" cy="22" rx="5" ry="8" fill="#A0522D" />
              
              {/* Ayaklar */}
              {/* Ön ayaklar */}
              <ellipse
                cx="45"
                cy="115"
                rx="8"
                ry="25"
                fill="#654321"
                opacity="0.8"
              />
              <ellipse
                cx="75"
                cy="115"
                rx="8"
                ry="25"
                fill="#654321"
                opacity="0.8"
              />
              
              {/* Arka ayaklar */}
              <ellipse
                cx="42"
                cy="125"
                rx="8"
                ry="20"
                fill="#654321"
                opacity="0.8"
              />
              <ellipse
                cx="78"
                cy="125"
                rx="8"
                ry="20"
                fill="#654321"
                opacity="0.8"
              />
              
              {/* Kuyruk */}
              <ellipse
                cx="85"
                cy="90"
                rx="12"
                ry="18"
                fill="#A0522D"
                opacity="0.7"
              />
              
              {/* Işık efekti (burunda) */}
              <circle cx="38" cy="35" r="5" fill="#FFD93D" opacity="0.3" />
            </svg>
          </motion.div>
        ))}
      </div>
      
      {/* Zıplama efektleri (toz) */}
      {[
        { x: '15%', delay: 0 },
        { x: '35%', delay: 0.4 },
        { x: '65%', delay: 0.8 },
        { x: '85%', delay: 1.2 },
      ].map((dust, index) => (
        <motion.div
          key={`dust-${index}`}
          className="absolute"
          style={{
            left: dust.x,
            bottom: '0',
            transform: 'translateX(-50%)',
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.5, 0],
            y: [0, -40, -80],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
            delay: dust.delay,
          }}
        >
          <div className="w-24 h-12 bg-white/30 rounded-full blur-xl" />
        </motion.div>
      ))}
    </div>
  )
}


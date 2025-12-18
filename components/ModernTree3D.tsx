'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

export default function ModernTree3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative"
        initial={{ rotateY: -10, scale: 0.9, opacity: 0 }}
        animate={{ rotateY: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotateY: 5, scale: 1.02 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Modern 3D Christmas Tree */}
        <svg 
          width="280" 
          height="340" 
          viewBox="0 0 280 340" 
          className="drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(102, 126, 234, 0.3))' }}
        >
          <defs>
            {/* Gradient definitions */}
            <linearGradient id="treeGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="50%" stopColor="#059669" stopOpacity="1" />
              <stop offset="100%" stopColor="#047857" stopOpacity="1" />
            </linearGradient>
            
            <linearGradient id="treeGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="100%" stopColor="#059669" stopOpacity="1" />
            </linearGradient>
            
            <linearGradient id="treeGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
              <stop offset="50%" stopColor="#16a34a" stopOpacity="1" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="1" />
            </linearGradient>

            <radialGradient id="starGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Shadow filter */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="rgba(0,0,0,0.3)"/>
            </filter>
          </defs>

          {/* Star on top with animation */}
          <motion.g
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
            transform="translate(140, 20)"
          >
            <polygon
              points="-15,-10 0,-25 15,-10 5,0 10,15 0,5 -10,15 -5,0"
              fill="url(#starGradient)"
              filter="url(#glow)"
            />
            <circle cx="0" cy="0" r="4" fill="#fef3c7" />
          </motion.g>

          {/* Tree layer 1 - Top (smallest) */}
          <motion.polygon
            points="140,50 100,110 180,110"
            fill="url(#treeGradient1)"
            filter="url(#shadow)"
            animate={{ opacity: [1, 0.95, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Tree layer 2 - Middle */}
          <motion.polygon
            points="140,80 70,160 210,160"
            fill="url(#treeGradient2)"
            filter="url(#shadow)"
            animate={{ opacity: [1, 0.97, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* Tree layer 3 - Bottom (largest) */}
          <motion.polygon
            points="140,110 50,210 230,210"
            fill="url(#treeGradient3)"
            filter="url(#shadow)"
            animate={{ opacity: [1, 0.98, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />

          {/* Modern ornaments - circular, gradient */}
          <motion.circle
            cx="110" cy="85"
            r="6"
            fill="#ef4444"
            filter="url(#glow)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          />
          <motion.circle
            cx="170" cy="95"
            r="6"
            fill="#3b82f6"
            filter="url(#glow)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <motion.circle
            cx="95" cy="130"
            r="6"
            fill="#f59e0b"
            filter="url(#glow)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
          <motion.circle
            cx="185" cy="140"
            r="6"
            fill="#8b5cf6"
            filter="url(#glow)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          />
          <motion.circle
            cx="120" cy="165"
            r="6"
            fill="#ec4899"
            filter="url(#glow)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          />
          <motion.circle
            cx="160" cy="175"
            r="6"
            fill="#06b6d4"
            filter="url(#glow)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
          <motion.circle
            cx="80" cy="185"
            r="6"
            fill="#fbbf24"
            filter="url(#glow)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          />
          <motion.circle
            cx="200" cy="195"
            r="6"
            fill="#10b981"
            filter="url(#glow)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
          />

          {/* Modern tree trunk with gradient */}
          <defs>
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="50%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>
          </defs>
          
          <rect 
            x="120" 
            y="210" 
            width="40" 
            height="50" 
            rx="4" 
            fill="url(#trunkGradient)"
            filter="url(#shadow)"
          />

          {/* Decorative lights on the tree */}
          {[
            { x: 100, y: 90, delay: 0 },
            { x: 180, y: 100, delay: 0.5 },
            { x: 85, y: 135, delay: 1 },
            { x: 195, y: 145, delay: 1.5 },
            { x: 110, y: 170, delay: 2 },
            { x: 170, y: 180, delay: 2.5 },
          ].map((light, i) => (
            <motion.circle
              key={i}
              cx={light.x}
              cy={light.y}
              r="3"
              fill="#fef3c7"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: light.delay
              }}
            />
          ))}
        </svg>

        {/* Glow effect around tree */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}


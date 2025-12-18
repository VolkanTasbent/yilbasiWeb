'use client'

import { motion } from 'framer-motion'

export default function BeautifulTree() {
  return (
    <div className="relative flex items-center justify-center py-8">
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Premium SVG Tree with better design */}
        <svg 
          width="320" 
          height="420" 
          viewBox="0 0 320 420"
          className="drop-shadow-2xl"
          style={{ 
            filter: 'drop-shadow(0 40px 80px rgba(16, 185, 129, 0.3))',
          }}
        >
          <defs>
            {/* Premium gradients - more depth */}
            <linearGradient id="treeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
              <stop offset="50%" stopColor="#16a34a" stopOpacity="1" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="1" />
            </linearGradient>
            
            <linearGradient id="treeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
              <stop offset="40%" stopColor="#22c55e" stopOpacity="1" />
              <stop offset="100%" stopColor="#059669" stopOpacity="1" />
            </linearGradient>
            
            <linearGradient id="treeGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="50%" stopColor="#059669" stopOpacity="1" />
              <stop offset="100%" stopColor="#047857" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="treeGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="1" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="1" />
            </linearGradient>

            {/* Premium star gradient */}
            <radialGradient id="starGrad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="40%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>

            {/* Enhanced glow filters */}
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="ornamentGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="deepShadow">
              <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="rgba(0,0,0,0.25)"/>
            </filter>

            {/* Ornament gradients */}
            <radialGradient id="ornamentRed" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#ef4444" stopOpacity="1" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="1" />
            </radialGradient>
            
            <radialGradient id="ornamentBlue" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
            </radialGradient>
            
            <radialGradient id="ornamentGold" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="1" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="1" />
            </radialGradient>
            
            <radialGradient id="ornamentPurple" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="1" />
            </radialGradient>
            
            <radialGradient id="ornamentPink" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#ec4899" stopOpacity="1" />
              <stop offset="100%" stopColor="#db2777" stopOpacity="1" />
            </radialGradient>
            
            <radialGradient id="ornamentCyan" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Premium star with better design */}
          <motion.g
            transform="translate(160, 35)"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
              scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <polygon
              points="-14,-9 -4,-16 0,-25 4,-16 14,-9 8,0 10,14 0,6 -10,14 -8,0"
              fill="url(#starGrad)"
              filter="url(#strongGlow)"
            />
            <circle cx="0" cy="0" r="4" fill="#fef3c7" />
          </motion.g>

          {/* Tree Layer 1 - Top (smallest) */}
          <motion.path
            d="M 160,70 L 125,145 L 195,145 Z"
            fill="url(#treeGrad1)"
            filter="url(#deepShadow)"
            animate={{ opacity: [1, 0.96, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />

          {/* Tree Layer 2 */}
          <motion.path
            d="M 160,110 L 105,210 L 215,210 Z"
            fill="url(#treeGrad2)"
            filter="url(#deepShadow)"
            animate={{ opacity: [1, 0.97, 1] }}
            transition={{ duration: 2.7, repeat: Infinity, delay: 0.2 }}
          />

          {/* Tree Layer 3 */}
          <motion.path
            d="M 160,150 L 85,270 L 235,270 Z"
            fill="url(#treeGrad3)"
            filter="url(#deepShadow)"
            animate={{ opacity: [1, 0.98, 1] }}
            transition={{ duration: 2.9, repeat: Infinity, delay: 0.4 }}
          />

          {/* Tree Layer 4 - Bottom (largest) */}
          <motion.path
            d="M 160,190 L 65,330 L 255,330 Z"
            fill="url(#treeGrad4)"
            filter="url(#deepShadow)"
            animate={{ opacity: [1, 0.99, 1] }}
            transition={{ duration: 3.1, repeat: Infinity, delay: 0.6 }}
          />

          {/* Premium ornaments with 3D effect */}
          {[
            { x: 135, y: 115, grad: 'ornamentRed', delay: 0 },
            { x: 185, y: 125, grad: 'ornamentBlue', delay: 0.4 },
            { x: 120, y: 170, grad: 'ornamentGold', delay: 0.8 },
            { x: 200, y: 180, grad: 'ornamentPurple', delay: 1.2 },
            { x: 130, y: 225, grad: 'ornamentPink', delay: 1.6 },
            { x: 190, y: 235, grad: 'ornamentCyan', delay: 2.0 },
            { x: 110, y: 260, grad: 'ornamentGold', delay: 2.4 },
            { x: 210, y: 270, grad: 'ornamentRed', delay: 2.8 },
            { x: 140, y: 285, grad: 'ornamentBlue', delay: 3.2 },
            { x: 180, y: 295, grad: 'ornamentPurple', delay: 3.6 },
          ].map((ornament, i) => (
            <motion.g
              key={i}
              transform={`translate(${ornament.x}, ${ornament.y})`}
              animate={{ 
                scale: [1, 1.2, 1],
                y: [0, -3, 0],
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: ornament.delay 
              }}
            >
              <circle
                r="9"
                fill={`url(#${ornament.grad})`}
                filter="url(#ornamentGlow)"
              />
              {/* Highlight for 3D effect */}
              <circle
                r="4"
                fill="rgba(255,255,255,0.6)"
                cx="-2"
                cy="-2"
              />
            </motion.g>
          ))}

          {/* Twinkling lights - more and better */}
          {[
            { x: 150, y: 120, delay: 0 },
            { x: 170, y: 125, delay: 0.5 },
            { x: 145, y: 175, delay: 1.0 },
            { x: 175, y: 180, delay: 1.5 },
            { x: 140, y: 230, delay: 2.0 },
            { x: 180, y: 240, delay: 2.5 },
            { x: 130, y: 275, delay: 3.0 },
            { x: 190, y: 285, delay: 3.5 },
          ].map((light, i) => (
            <motion.circle
              key={`light-${i}`}
              cx={light.x}
              cy={light.y}
              r="5"
              fill="#ffffff"
              filter="url(#strongGlow)"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1.5, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: light.delay,
              }}
            />
          ))}

          {/* Premium tree trunk with better design */}
          <defs>
            <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a16207" />
              <stop offset="30%" stopColor="#92400e" />
              <stop offset="70%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>
          </defs>
          
          <rect 
            x="145" 
            y="330" 
            width="30" 
            height="55" 
            rx="6" 
            fill="#78350f"
            filter="url(#deepShadow)"
          />
          <rect 
            x="147" 
            y="330" 
            width="26" 
            height="53" 
            rx="5" 
            fill="url(#trunkGrad)"
          />
          
          {/* Trunk details */}
          <line x1="152" y1="335" x2="152" y2="380" stroke="#92400e" strokeWidth="1.5" opacity="0.5" />
          <line x1="158" y1="335" x2="158" y2="380" stroke="#92400e" strokeWidth="1.5" opacity="0.5" />
        </svg>

        {/* Enhanced ambient glow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(34, 211, 153, 0.25) 35%, rgba(22, 163, 74, 0.15) 60%, transparent 75%)',
            width: '400px',
            height: '500px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}

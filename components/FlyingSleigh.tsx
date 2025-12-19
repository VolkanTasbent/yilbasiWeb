'use client'

import { motion } from 'framer-motion'

export default function FlyingSleigh() {
  return (
    <div className="fixed top-20 left-0 w-full pointer-events-none z-5 overflow-hidden">
      <motion.div
        initial={{ x: '-300px' }}
        animate={{ x: 'calc(100vw + 300px)' }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 5,
        }}
        className="relative"
      >
        {/* Modern sleigh design - SVG */}
        <svg width="280" height="120" viewBox="0 0 280 120" className="opacity-80">
          {/* Reindeers - simplified modern design */}
          <g>
            {/* Reindeer 1 */}
            <ellipse cx="50" cy="60" rx="12" ry="15" fill="#8b4513" />
            <circle cx="45" cy="55" r="3" fill="#000" />
            <circle cx="55" cy="55" r="3" fill="#000" />
            <path d="M 40 60 Q 35 50 40 45" stroke="#8b4513" strokeWidth="2" fill="none" />
            <path d="M 60 60 Q 65 50 60 45" stroke="#8b4513" strokeWidth="2" fill="none" />
            
            {/* Reindeer 2 */}
            <ellipse cx="90" cy="60" rx="12" ry="15" fill="#8b4513" />
            <circle cx="85" cy="55" r="3" fill="#000" />
            <circle cx="95" cy="55" r="3" fill="#000" />
            <path d="M 80 60 Q 75 50 80 45" stroke="#8b4513" strokeWidth="2" fill="none" />
            <path d="M 100 60 Q 105 50 100 45" stroke="#8b4513" strokeWidth="2" fill="none" />
            
            {/* Reindeer 3 */}
            <ellipse cx="130" cy="60" rx="12" ry="15" fill="#8b4513" />
            <circle cx="125" cy="55" r="3" fill="#000" />
            <circle cx="135" cy="55" r="3" fill="#000" />
            <path d="M 120 60 Q 115 50 120 45" stroke="#8b4513" strokeWidth="2" fill="none" />
            <path d="M 140 60 Q 145 50 140 45" stroke="#8b4513" strokeWidth="2" fill="none" />
          </g>
          
          {/* Sleigh */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M 150 80 Q 180 60 210 80 L 230 90 L 230 100 L 150 100 Z"
              fill="#dc2626"
            />
            <ellipse cx="165" cy="95" rx="8" ry="12" fill="#1f2937" />
            <ellipse cx="215" cy="95" rx="8" ry="12" fill="#1f2937" />
            
            {/* Santa figure - simplified */}
            <circle cx="180" cy="70" r="8" fill="#fef3c7" />
            <rect x="175" y="78" width="10" height="12" fill="#dc2626" rx="2" />
          </motion.g>
          
          {/* Reindeer 4 */}
          <ellipse cx="230" cy="60" rx="12" ry="15" fill="#8b4513" />
          <circle cx="225" cy="55" r="3" fill="#000" />
          <circle cx="235" cy="55" r="3" fill="#000" />
          <path d="M 220 60 Q 215 50 220 45" stroke="#8b4513" strokeWidth="2" fill="none" />
          <path d="M 240 60 Q 245 50 240 45" stroke="#8b4513" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
    </div>
  )
}




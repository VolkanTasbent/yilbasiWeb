'use client'

import { motion } from 'framer-motion'

export default function ModernTree() {
  return (
    <div className="relative">
      {/* Modern Christmas Tree - SVG based */}
      <motion.svg
        width="200"
        height="240"
        viewBox="0 0 200 240"
        className="relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Tree layers */}
        <motion.polygon
          points="100,20 60,80 140,80"
          fill="#16a34a"
          animate={{ opacity: [1, 0.9, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.polygon
          points="100,50 40,120 160,120"
          fill="#22c55e"
          animate={{ opacity: [1, 0.9, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.polygon
          points="100,80 30,160 170,160"
          fill="#15803d"
          animate={{ opacity: [1, 0.9, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
        
        {/* Star on top */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <polygon
            points="100,10 105,25 120,25 110,35 115,50 100,40 85,50 90,35 80,25 95,25"
            fill="#fbbf24"
          />
        </motion.g>

        {/* Modern ornaments - simple circles */}
        <circle cx="75" cy="60" r="4" fill="#dc2626" />
        <circle cx="125" cy="70" r="4" fill="#2563eb" />
        <circle cx="85" cy="100" r="4" fill="#fbbf24" />
        <circle cx="115" cy="110" r="4" fill="#dc2626" />
        <circle cx="70" cy="130" r="4" fill="#8b5cf6" />
        <circle cx="130" cy="140" r="4" fill="#fbbf24" />

        {/* Tree trunk */}
        <rect x="90" y="160" width="20" height="40" fill="#92400e" rx="2" />
      </motion.svg>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-green-500/10 blur-2xl -z-10 rounded-full" />
    </div>
  )
}




'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const MapBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
      {/* Background Image from public/bg.webp */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 filter brightness-95 contrast-110 transition-opacity duration-1000"
        style={{ backgroundImage: `url('/bg.webp')` }}
      />
      
      {/* Subtle Vignette Overlay & Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/50 to-[#050505]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(5,5,5,0.85)_100%)]" />

      {/* Tactical Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-35" />

      {/* Subtle Scanlines overlay */}
      <div className="absolute inset-0 scanlines opacity-25" />

      {/* Radar sweep effect top right */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-[#4B6F44]/20 opacity-25">
        <div className="w-full h-full rounded-full border border-[#4B6F44]/10 animate-radar origin-center bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(75,111,68,0.2)_360deg)]" />
      </div>

      {/* Radar sweep effect bottom left */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-[#4B6F44]/15 opacity-20">
        <div className="w-full h-full rounded-full border border-[#4B6F44]/10 animate-radar origin-center bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(107,142,35,0.2)_360deg)]" />
      </div>

      {/* Corner Coordinate Crosshairs */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-[#4B6F44]/50 flex flex-col gap-1 z-10">
        <span>GRID: 43R UN 8912 4321</span>
        <span>LAT: 34°09&apos;12&quot;N | LON: 77°34&apos;45&quot;E</span>
      </div>

      <div className="absolute top-4 right-4 text-[10px] font-mono text-[#4B6F44]/50 flex flex-col items-end gap-1 z-10">
        <span>SYS.STATUS: OPERATIONAL</span>
        <span>ENCRYPTION: AES-256-MIL</span>
      </div>

      {/* Animated Flow Lines for logistics vectors */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.line
          x1="15%"
          y1="25%"
          x2="85%"
          y2="75%"
          stroke="#4B6F44"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          animate={{ strokeDashoffset: [-120, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.line
          x1="80%"
          y1="15%"
          x2="20%"
          y2="85%"
          stroke="#6B8E23"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          animate={{ strokeDashoffset: [120, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Radio, Navigation, AlertTriangle, CloudSnow, Sun, Zap } from 'lucide-react'

export interface CommandPost {
  id: string
  name: string
  command: 'Northern' | 'Eastern' | 'Western' | 'Central'
  type: 'Depot' | 'FOB' | 'Airbase' | 'HQ'
  coords: { x: number; y: number } // percentages
  supplyHealth: number
  fuelReserve: number
  status: 'optimal' | 'warning' | 'critical'
}

export const MILITARY_POSTS: CommandPost[] = [
  { id: 'HQ-DELHI', name: 'Army HQ New Delhi', command: 'Central', type: 'HQ', coords: { x: 44, y: 38 }, supplyHealth: 99, fuelReserve: 98, status: 'optimal' },
  { id: 'DEP-LEH', name: 'Leh Main Logistics Depot', command: 'Northern', type: 'Depot', coords: { x: 38, y: 18 }, supplyHealth: 88, fuelReserve: 72, status: 'warning' },
  { id: 'FOB-SIACHEN', name: 'Siachen Forward Post Alpha', command: 'Northern', type: 'FOB', coords: { x: 39, y: 12 }, supplyHealth: 64, fuelReserve: 42, status: 'critical' },
  { id: 'AIR-[#1]', name: 'Udhampur Airbase', command: 'Northern', type: 'Airbase', coords: { x: 34, y: 22 }, supplyHealth: 94, fuelReserve: 91, status: 'optimal' },
  { id: 'DEP-SILIGURI', name: 'Siliguri Logistics Hub', command: 'Eastern', type: 'Depot', coords: { x: 74, y: 44 }, supplyHealth: 92, fuelReserve: 89, status: 'optimal' },
  { id: 'FOB-TAWANG', name: 'Tawang Forward Operating Base', command: 'Eastern', type: 'FOB', coords: { x: 86, y: 41 }, supplyHealth: 78, fuelReserve: 68, status: 'warning' },
  { id: 'DEP-JODHPUR', name: 'Jodhpur Logistics Depot', command: 'Western', type: 'Depot', coords: { x: 30, y: 46 }, supplyHealth: 96, fuelReserve: 95, status: 'optimal' },
  { id: 'FOB-JAISALMER', name: 'Jaisalmer Outpost Echo', command: 'Western', type: 'FOB', coords: { x: 24, y: 48 }, supplyHealth: 90, fuelReserve: 84, status: 'optimal' }
]

export const SUPPLY_ROUTES = [
  { from: 'HQ-DELHI', to: 'DEP-LEH', status: 'active', risk: 14 },
  { from: 'DEP-LEH', to: 'FOB-SIACHEN', status: 'restricted', risk: 88 },
  { from: 'HQ-DELHI', to: 'DEP-SILIGURI', status: 'active', risk: 10 },
  { from: 'DEP-SILIGURI', to: 'FOB-TAWANG', status: 'warning', risk: 62 },
  { from: 'HQ-DELHI', to: 'DEP-JODHPUR', status: 'active', risk: 8 },
  { from: 'DEP-JODHPUR', to: 'FOB-JAISALMER', status: 'active', risk: 12 }
]

export const MilitaryMap: React.FC<{ interactive?: boolean }> = ({ interactive = true }) => {
  const [selectedPost, setSelectedPost] = useState<CommandPost>(MILITARY_POSTS[1])

  return (
    <div className="relative w-full h-[480px] md:h-[540px] bg-[#050505] border border-[#4B6F44]/40 overflow-hidden mil-panel font-mono text-xs">
      {/* Top Map HUD Overlay */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-[#0A0A0A]/90 border-b border-[#4B6F44]/30 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2A9D8F] animate-ping" />
          <span className="text-[#F5F5F5] font-semibold tracking-wider text-xs">
            LIVE THEATER GIS FEED // NORTHERN & EASTERN COMMANDS
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px] text-[#A0A0A0]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#2A9D8F]" /> DEPOT (OPTIMAL)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#D4A017]" /> WARNING</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#D62828]" /> SHORTAGE RISK</span>
        </div>
      </div>

      {/* Background Grid & Radar Circle Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-[#4B6F44]/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-[#4B6F44]/15 pointer-events-none" />

      {/* SVG Map Canvas with India Outline & Supply Vectors */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Simplified India Border Outline */}
        <path
          d="M 38 10 L 44 8 L 48 12 L 46 20 L 52 24 L 64 30 L 78 35 L 88 38 L 92 46 L 85 50 L 76 48 L 70 54 L 62 50 L 54 55 L 50 62 L 48 76 L 42 88 L 38 94 L 34 82 L 32 68 L 24 58 L 18 48 L 22 38 L 30 32 Z"
          fill="rgba(75, 111, 68, 0.04)"
          stroke="#4B6F44"
          strokeWidth="0.4"
          strokeDasharray="1 1"
        />

        {/* Route Vectors */}
        {SUPPLY_ROUTES.map((route, i) => {
          const fromP = MILITARY_POSTS.find((p) => p.id === route.from)
          const toP = MILITARY_POSTS.find((p) => p.id === route.to)
          if (!fromP || !toP) return null

          const isCritical = route.status === 'restricted' || route.risk > 70
          const isWarning = route.status === 'warning'
          const strokeColor = isCritical ? '#D62828' : isWarning ? '#D4A017' : '#4B6F44'

          return (
            <g key={i}>
              <line
                x1={fromP.coords.x}
                y1={fromP.coords.y}
                x2={toP.coords.x}
                y2={toP.coords.y}
                stroke={strokeColor}
                strokeWidth={isCritical ? '0.8' : '0.5'}
                strokeOpacity={isCritical ? '0.9' : '0.6'}
                strokeDasharray={isCritical ? '1 1' : '2 1'}
              />
              <motion.circle
                r="0.8"
                fill={strokeColor}
                initial={{ cx: fromP.coords.x, cy: fromP.coords.y }}
                animate={{ cx: [fromP.coords.x, toP.coords.x], cy: [fromP.coords.y, toP.coords.y] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
              />
            </g>
          )
        })}

        {/* Nodes / Posts */}
        {MILITARY_POSTS.map((post) => {
          const isSelected = selectedPost.id === post.id
          const color = post.status === 'critical' ? '#D62828' : post.status === 'warning' ? '#D4A017' : '#2A9D8F'

          return (
            <g key={post.id} className="cursor-pointer" onClick={() => interactive && setSelectedPost(post)}>
              <circle
                cx={post.coords.x}
                cy={post.coords.y}
                r={isSelected ? '2.5' : '1.8'}
                fill={color}
                stroke="#050505"
                strokeWidth="0.4"
              />
              <circle
                cx={post.coords.x}
                cy={post.coords.y}
                r="3.5"
                fill="none"
                stroke={color}
                strokeWidth="0.2"
                className="animate-ping"
              />
            </g>
          )
        })}
      </svg>

      {/* Selected Post Detail Overlay */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-80 bg-[#0A0A0A]/95 border border-[#4B6F44] p-3 shadow-xl z-20 space-y-2">
        <div className="flex items-center justify-between border-b border-[#4B6F44]/30 pb-1.5">
          <span className="text-[#F5F5F5] font-semibold text-xs uppercase flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#6B8E23]" />
            {selectedPost.name}
          </span>
          <span
            className={`text-[9px] px-1.5 py-0.5 border ${
              selectedPost.status === 'critical'
                ? 'bg-[#4A0E0E] border-[#D62828] text-[#D62828]'
                : selectedPost.status === 'warning'
                ? 'bg-[#3D2E07] border-[#D4A017] text-[#D4A017]'
                : 'bg-[#1E2E1B] border-[#4B6F44] text-[#2A9D8F]'
            }`}
          >
            {selectedPost.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-[#A0A0A0] block text-[10px]">COMMAND:</span>
            <span className="text-[#F5F5F5] font-semibold">{selectedPost.command} Command</span>
          </div>
          <div>
            <span className="text-[#A0A0A0] block text-[10px]">POST TYPE:</span>
            <span className="text-[#F5F5F5] font-semibold">{selectedPost.type}</span>
          </div>
          <div>
            <span className="text-[#A0A0A0] block text-[10px]">SUPPLY HEALTH:</span>
            <span className="text-[#2A9D8F] font-semibold">{selectedPost.supplyHealth}%</span>
          </div>
          <div>
            <span className="text-[#A0A0A0] block text-[10px]">FUEL RESERVES:</span>
            <span
              className={selectedPost.fuelReserve < 50 ? 'text-[#D62828] font-semibold' : 'text-[#6B8E23] font-semibold'}
            >
              {selectedPost.fuelReserve}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

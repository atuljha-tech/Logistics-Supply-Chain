'use client'

import React, { useState, useEffect } from 'react'
import {
  ShieldAlert,
  Bot,
  Bell,
  Clock,
  Radio,
  Globe,
  Terminal,
  Activity
} from 'lucide-react'
import { AICopilot } from '@/components/ai-copilot'

interface TopBarProps {
  title?: string
}

export const TopBar: React.FC<TopBarProps> = ({ title = 'Command Center' }) => {
  const [copilotOpen, setCopilotOpen] = useState(false)
  const [zuluTime, setZuluTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getUTCHours()).padStart(2, '0')
      const mins = String(now.getUTCMinutes()).padStart(2, '0')
      const secs = String(now.getUTCSeconds()).padStart(2, '0')
      setZuluTime(`${hours}:${mins}:${secs} ZULU`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#4B6F44]/40 z-30 flex items-center justify-between px-4 md:px-6 md:ml-64">
        {/* Left Section: Page Title & System Status */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold tracking-widest text-[#F5F5F5] uppercase">
                {title}
              </h1>
              <span className="px-2 py-0.5 bg-[#4B6F44]/20 border border-[#4B6F44] text-[10px] font-mono text-[#6B8E23]">
                DEFCON 2
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#A0A0A0] hidden sm:flex items-center gap-2 mt-0.5">
              <span className="text-[#4B6F44]">OPERATIONAL COMMAND</span>
              <span>|</span>
              <span>GRID 43R UN 8912</span>
            </p>
          </div>
        </div>

        {/* Center: Live UTC Ticker */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1 bg-[#111111] border border-[#4B6F44]/30 font-mono text-xs text-[#F5F5F5]">
          <Clock className="w-3.5 h-3.5 text-[#D4A017] animate-pulse" />
          <span>{zuluTime || '00:00:00 ZULU'}</span>
          <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-ping" />
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3">
          {/* Logistics Copilot Button */}
          <button
            onClick={() => setCopilotOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#1E2E1B] border border-[#4B6F44] hover:border-[#6B8E23] text-[#F5F5F5] font-mono text-xs uppercase tracking-wider transition-all hover:bg-[#4B6F44]/30"
          >
            <Bot className="w-4 h-4 text-[#2A9D8F] animate-pulse" />
            <span className="hidden sm:inline">Logistics Copilot</span>
          </button>

          {/* Alert Counter */}
          <button className="relative p-2 bg-[#111111] border border-[#4B6F44]/30 hover:border-[#4B6F44] text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D62828] border border-[#050505] text-[10px] font-mono font-bold text-[#F5F5F5] flex items-center justify-center">
              4
            </span>
          </button>
        </div>
      </header>

      {/* AI Copilot Drawer */}
      <AICopilot isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />
    </>
  )
}

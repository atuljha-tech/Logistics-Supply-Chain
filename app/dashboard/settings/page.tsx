'use client'

import React from 'react'
import {
  Settings,
  Shield,
  Lock,
  Radio,
  Terminal,
  Database,
  CheckCircle2
} from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6 font-sans text-xs text-[#F5F5F5]">
      {/* Header Banner */}
      <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel font-mono">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider">
            SYSTEM CONFIGURATION & CLASSIFIED ACCESS
          </h1>
          <span className="px-2 py-0.5 bg-[#1E2E1B] border border-[#4B6F44] text-[10px] text-[#6B8E23]">
            AES-256 ENCRYPTED
          </span>
        </div>
        <p className="text-[11px] text-[#A0A0A0] mt-0.5">
          Configure military telemetry integration, satellite ping frequencies, DEFCON alert thresholds, and security access controls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
        <div className="mil-panel p-5 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4">
          <span className="text-xs font-bold text-[#F5F5F5] uppercase border-b border-[#4B6F44]/30 pb-2 block">
            TELEMETRY & SATCOM LINK PARAMETERS
          </span>
          <div className="space-y-3">
            <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
              <span className="text-[10px] text-[#A0A0A0] block">SATCOM PING FREQUENCY</span>
              <span className="text-xs font-bold text-[#2A9D8F]">30 Seconds (High Density Track)</span>
            </div>
            <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
              <span className="text-[10px] text-[#A0A0A0] block">ENCRYPTION PROTOCOL</span>
              <span className="text-xs font-bold text-[#2A9D8F]">MIL-STD-188-185 AES-256</span>
            </div>
          </div>
        </div>

        <div className="mil-panel p-5 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4">
          <span className="text-xs font-bold text-[#F5F5F5] uppercase border-b border-[#4B6F44]/30 pb-2 block">
            AI MODEL PREDICTIVE THRESHOLDS
          </span>
          <div className="space-y-3">
            <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
              <span className="text-[10px] text-[#A0A0A0] block">SHORTAGE EARLY ALERT HORIZON</span>
              <span className="text-xs font-bold text-[#D4A017]">72 Hours (Default Operational Window)</span>
            </div>
            <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
              <span className="text-[10px] text-[#A0A0A0] block">MINIMUM CONFIDENCE THRESHOLD</span>
              <span className="text-xs font-bold text-[#2A9D8F]">90.0% Confidence Index</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

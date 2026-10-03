'use client'

import React, { useState } from 'react'
import {
  AlertTriangle,
  ShieldAlert,
  Bell,
  CheckCircle2,
  Filter,
  Search,
  Clock,
  Radio,
  MapPin,
  Bot
} from 'lucide-react'

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Critical' | 'Warning'>('All')

  const alertsList = [
    {
      id: 'ALT-109',
      title: 'Fuel shortage predicted in Sector Alpha',
      time: '10 mins ago',
      sector: 'Northern Command (FOB Siachen)',
      severity: 'Critical',
      category: 'Inventory Deficit',
      desc: 'JP-8 Aviation Fuel stock projected to drop below 20% operational threshold within T+72 hours due to rotor deployment surge.',
      mitigation: 'Pre-stage 40,000L air-drop payload from Leh Main Depot.'
    },
    {
      id: 'ALT-108',
      title: 'Medical stock critical in Northern Base',
      time: '32 mins ago',
      sector: 'Northern Base Garrison',
      severity: 'Critical',
      category: 'Medical Supply',
      desc: 'Field Trauma Kit & Blood Plasma reserves require immediate top-up after emergency exercise.',
      mitigation: 'Dispatch emergency medical convoy via Udhampur Airbase.'
    },
    {
      id: 'ALT-107',
      title: 'Convoy delay due to weather disruption',
      time: '1 hour ago',
      sector: 'Route Red-3 Pass Marker 88',
      severity: 'Warning',
      category: 'Weather Hazard',
      desc: 'Convoy Bravo-4 holding at pass marker due to zero-visibility blizzard and freezing black ice.',
      mitigation: 'Order snow-plow escort from BRO detachment.'
    },
    {
      id: 'ALT-106',
      title: 'Road accessibility reduced by landslide',
      time: '2 hours ago',
      sector: 'Zoji La Mountain Pass',
      severity: 'Warning',
      category: 'Infrastructure Risk',
      desc: 'Mudslide blocked dual-lane access. Single lane bypass operating at 30% capacity.',
      mitigation: 'Reroute heavy logistics freight to Ridge Pass Route Bravo.'
    }
  ]

  const filteredAlerts = alertsList.filter((a) => {
    if (severityFilter !== 'All' && a.severity !== severityFilter) return false
    return true
  })

  return (
    <div className="space-y-6 font-sans text-xs text-[#F5F5F5]">
      {/* Header Banner */}
      <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider">
              SUPPLY RISK & THREAT ALERT CENTER
            </h1>
            <span className="px-2 py-0.5 bg-[#4A0E0E] border border-[#D62828] text-[10px] text-[#D62828]">
              4 ACTIVE ALERTS
            </span>
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">
            Real-time shortage warnings, weather disruptions, route hazards, and AI-driven mitigation recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#A0A0A0]">SEVERITY:</span>
          {(['All', 'Critical', 'Warning'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 text-xs font-semibold uppercase border ${
                severityFilter === sev
                  ? 'bg-[#4B6F44] border-[#6B8E23] text-[#F5F5F5]'
                  : 'bg-[#111111] border-[#4B6F44]/30 text-[#A0A0A0]'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* ALERT FEED CARDS */}
      <div className="space-y-4 font-mono">
        {filteredAlerts.map((alt) => {
          const isCrit = alt.severity === 'Critical'
          const borderClass = isCrit ? 'border-[#D62828] bg-[#0E0505]' : 'border-[#D4A017] bg-[#0D0B05]'
          const textClass = isCrit ? 'text-[#D62828]' : 'text-[#D4A017]'

          return (
            <div key={alt.id} className={`mil-panel p-5 border ${borderClass} space-y-3`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#4B6F44]/20 pb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${textClass}`}>{alt.id}: {alt.title}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 border ${isCrit ? 'bg-[#4A0E0E] text-[#D62828] border-[#D62828]' : 'bg-[#3D2E07] text-[#D4A017] border-[#D4A017]'}`}>
                    {alt.severity.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#A0A0A0]">
                  <span>SECTOR: {alt.sector}</span>
                  <span>{alt.time}</span>
                </div>
              </div>

              <p className="text-xs text-[#F5F5F5] leading-relaxed">{alt.desc}</p>

              <div className="p-3 bg-[#111111] border border-[#4B6F44]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#2A9D8F]" />
                  <span className="text-[#A0A0A0]">AI MITIGATION PLAN:</span>
                  <span className="text-[#2A9D8F] font-bold">{alt.mitigation}</span>
                </div>
                <button className="px-3 py-1 bg-[#4B6F44] hover:bg-[#5B8652] text-[#F5F5F5] font-bold uppercase tracking-wider text-[10px] border border-[#6B8E23]">
                  Execute Action
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

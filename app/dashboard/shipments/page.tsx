'use client'

import React, { useState } from 'react'
import {
  Truck,
  Shield,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Bot,
  Zap,
  Download
} from 'lucide-react'

interface MilitaryConvoyMission {
  id: string
  convoyName: string
  origin: string
  destination: string
  status: 'In Transit' | 'Staged' | 'Delayed' | 'Completed'
  cargo: string
  riskScore: number
  eta: string
  commander: string
}

const CONVOY_MISSIONS: MilitaryConvoyMission[] = [
  { id: 'MIS-ALPHA-01', convoyName: 'Convoy Alpha-1', origin: 'Leh Main Depot', destination: 'Siachen Outpost Alpha', status: 'In Transit', cargo: 'JP-8 Aviation Fuel Bladders', riskScore: 78, eta: '0830 ZULU', commander: 'Maj. Vikram Singh' },
  { id: 'MIS-BRAVO-04', convoyName: 'Convoy Bravo-4', origin: 'Siliguri Logistics Hub', destination: 'Tawang Forward Base', status: 'In Transit', cargo: '155mm Ammunition & MREs', riskScore: 42, eta: '1200 ZULU', commander: 'Capt. R. Sharma' },
  { id: 'MIS-CHARLIE-08', convoyName: 'Convoy Charlie-8', origin: 'Jodhpur Supply Hub', destination: 'Jaisalmer Outpost Echo', status: 'Staged', cargo: 'Tracked Heavy Spares', riskScore: 12, eta: '1645 ZULU', commander: 'Lt. Col. A. Verma' },
  { id: 'MIS-DELTA-12', convoyName: 'Convoy Delta-12', origin: 'Udhampur Airbase Depot', destination: 'Uri Forward Formation', status: 'Delayed', cargo: 'Field Trauma Medical Kits', riskScore: 88, eta: 'Delayed (+4h)', commander: 'Maj. S. Nair' }
]

export default function ShipmentsPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')

  const filteredMissions = CONVOY_MISSIONS.filter((m) => {
    if (filterStatus !== 'All' && m.status !== filterStatus) return false
    if (search && !m.convoyName.toLowerCase().includes(search.toLowerCase()) && !m.id.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6 font-sans text-xs text-[#F5F5F5]">
      {/* Header */}
      <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider">
              MILITARY CONVOY SORTIES & RESUPPLY MISSIONS
            </h1>
            <span className="px-2 py-0.5 bg-[#1E2E1B] border border-[#4B6F44] text-[10px] text-[#6B8E23]">
              38 CONVOYS ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">
            Active resupply mission sorties, convoy escort readiness, and route risk scores.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <button className="px-3 py-1.5 bg-[#111111] hover:bg-[#1E2E1B] border border-[#4B6F44]/40 text-[#F5F5F5] flex items-center gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5 text-[#6B8E23]" />
            Export Mission Manifest
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel space-y-3 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#4B6F44]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search convoy name, ID..."
              className="bg-[#050505] border border-[#4B6F44]/40 px-3 py-1.5 text-xs text-[#F5F5F5] placeholder-[#A0A0A0]/60 focus:outline-none focus:border-[#6B8E23] w-64"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[10px] text-[#A0A0A0]">STATUS:</span>
            {(['All', 'In Transit', 'Staged', 'Delayed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 text-xs border uppercase ${
                  filterStatus === st
                    ? 'bg-[#4B6F44] border-[#6B8E23] text-[#F5F5F5]'
                    : 'bg-[#111111] border-[#4B6F44]/30 text-[#A0A0A0]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Missions Table */}
      <div className="mil-panel p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4 font-mono">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#4B6F44]/30 bg-[#111111] text-[#A0A0A0] text-[10px] uppercase">
                <th className="p-2.5">Mission ID</th>
                <th className="p-2.5">Convoy Unit</th>
                <th className="p-2.5">Origin → Destination</th>
                <th className="p-2.5">Cargo Manifest</th>
                <th className="p-2.5">Route Risk Score</th>
                <th className="p-2.5">ETA</th>
                <th className="p-2.5">Commander</th>
                <th className="p-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4B6F44]/20 text-[11px]">
              {filteredMissions.map((m) => (
                <tr key={m.id} className="hover:bg-[#1E2E1B]/30 transition-colors">
                  <td className="p-2.5 text-[#6B8E23] font-bold">{m.id}</td>
                  <td className="p-2.5 text-[#F5F5F5] font-semibold">{m.convoyName}</td>
                  <td className="p-2.5 text-[#A0A0A0]">{m.origin} → {m.destination}</td>
                  <td className="p-2.5 text-[#F5F5F5]">{m.cargo}</td>
                  <td className="p-2.5">
                    <span className={`font-bold ${m.riskScore > 70 ? 'text-[#D62828]' : m.riskScore > 30 ? 'text-[#D4A017]' : 'text-[#2A9D8F]'}`}>
                      {m.riskScore} / 100
                    </span>
                  </td>
                  <td className="p-2.5 text-[#F5F5F5]">{m.eta}</td>
                  <td className="p-2.5 text-[#A0A0A0]">{m.commander}</td>
                  <td className="p-2.5">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 border ${
                        m.status === 'Delayed'
                          ? 'bg-[#4A0E0E] text-[#D62828] border-[#D62828]'
                          : m.status === 'In Transit'
                          ? 'bg-[#1E2E1B] text-[#2A9D8F] border-[#4B6F44]'
                          : 'bg-[#3D2E07] text-[#D4A017] border-[#D4A017]'
                      }`}
                    >
                      {m.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

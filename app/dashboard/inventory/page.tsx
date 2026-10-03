'use client'

import React, { useState } from 'react'
import {
  Boxes,
  Shield,
  Search,
  Filter,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Layers,
  ArrowUpRight
} from 'lucide-react'

interface DepotStock {
  id: string
  name: string
  command: 'Northern' | 'Eastern' | 'Western' | 'Central'
  category: 'Fuel' | 'Ammunition' | 'Medical' | 'Food' | 'Spares'
  quantity: string
  capacityPercent: number
  shelfLifeDays: number
  depletionDate: string
  status: 'optimal' | 'warning' | 'critical'
}

const DEPOT_DATA: DepotStock[] = [
  { id: 'DEP-LEH-01', name: 'Leh Central Depot', command: 'Northern', category: 'Fuel', quantity: '420,000 Liters', capacityPercent: 88, shelfLifeDays: 365, depletionDate: '14 Days (Oct 17)', status: 'warning' },
  { id: 'FOB-SIA-02', name: 'Siachen Outpost Alpha', command: 'Northern', category: 'Fuel', quantity: '18,400 Liters', capacityPercent: 42, shelfLifeDays: 180, depletionDate: '72 Hours (Oct 06)', status: 'critical' },
  { id: 'DEP-SIL-03', name: 'Siliguri Logistics Base', command: 'Eastern', category: 'Ammunition', quantity: '12,500 Rounds', capacityPercent: 94, shelfLifeDays: 720, depletionDate: '90 Days (Dec 30)', status: 'optimal' },
  { id: 'FOB-TAW-04', name: 'Tawang Forward Post', command: 'Eastern', category: 'Food', quantity: '8,200 Field Rations', capacityPercent: 68, shelfLifeDays: 120, depletionDate: '21 Days (Oct 24)', status: 'warning' },
  { id: 'DEP-JOD-05', name: 'Jodhpur Supply Hub', command: 'Western', category: 'Spares', quantity: '4,800 Tracked Parts', capacityPercent: 96, shelfLifeDays: 999, depletionDate: '180 Days (Mar 26)', status: 'optimal' },
  { id: 'AIR-[#1]-06', name: 'Udhampur Airbase Depot', command: 'Northern', category: 'Medical', quantity: '3,400 Trauma Kits', capacityPercent: 91, shelfLifeDays: 300, depletionDate: '60 Days (Dec 02)', status: 'optimal' }
]

export default function InventoryIntelligencePage() {
  const [filterCommand, setFilterCommand] = useState<string>('All')
  const [filterCategory, setFilterCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredDepots = DEPOT_DATA.filter((item) => {
    if (filterCommand !== 'All' && item.command !== filterCommand) return false
    if (filterCategory !== 'All' && item.category !== filterCategory) return false
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6 font-sans text-xs text-[#F5F5F5]">
      {/* Header Banner */}
      <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider">
              INVENTORY INTELLIGENCE NETWORK
            </h1>
            <span className="px-2 py-0.5 bg-[#1E2E1B] border border-[#4B6F44] text-[10px] text-[#6B8E23]">
              14 THEATER DEPOTS LIVE
            </span>
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">
            Depot inventory monitoring, supply aging, warehouse analytics, and predicted depletion dates across bases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#111111] border border-[#4B6F44]/30 text-center">
            <span className="text-[10px] text-[#A0A0A0] block">AVERAGE DEPOT HEALTH</span>
            <span className="text-base font-bold text-[#2A9D8F]">88.7% FOC</span>
          </div>
        </div>
      </div>

      {/* HEATMAP & READINESS INDICATORS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Panel */}
        <div className="lg:col-span-2 mil-panel p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-[#4B6F44]/30 pb-2">
            <span className="font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
              <Boxes className="w-4 h-4 text-[#6B8E23]" />
              THEATER DEPOT STOCK HEATMAP
            </span>
            <span className="text-[10px] text-[#A0A0A0]">COLOR: CAPACITY PERCENTAGE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {DEPOT_DATA.map((depot) => {
              const bg = depot.status === 'critical' ? 'bg-[#0E0505] border-[#D62828]' : depot.status === 'warning' ? 'bg-[#0D0B05] border-[#D4A017]' : 'bg-[#111111] border-[#4B6F44]/30'
              const color = depot.status === 'critical' ? 'text-[#D62828]' : depot.status === 'warning' ? 'text-[#D4A017]' : 'text-[#2A9D8F]'

              return (
                <div key={depot.id} className={`p-3 border ${bg} space-y-1.5`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#A0A0A0] font-bold">{depot.command}</span>
                    <span className={`text-[9px] px-1 py-0.2 border ${depot.status === 'critical' ? 'bg-[#4A0E0E] text-[#D62828] border-[#D62828]' : depot.status === 'warning' ? 'bg-[#3D2E07] text-[#D4A017] border-[#D4A017]' : 'bg-[#1E2E1B] text-[#2A9D8F] border-[#4B6F44]'}`}>
                      {depot.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#F5F5F5] block truncate">{depot.name}</span>
                  <div className="flex items-center justify-between pt-1 border-t border-[#4B6F44]/20 text-[11px]">
                    <span className="text-[#A0A0A0]">Stock:</span>
                    <span className={`font-bold ${color}`}>{depot.capacityPercent}%</span>
                  </div>
                  <span className="text-[9px] text-[#A0A0A0] block truncate">Depletion: {depot.depletionDate}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category Reserves Breakdown */}
        <div className="mil-panel p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4 font-mono">
          <div className="border-b border-[#4B6F44]/30 pb-2">
            <span className="font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2A9D8F]" />
              CRITICAL RESERVES BREAKDOWN
            </span>
          </div>

          <div className="space-y-3 text-[11px]">
            {[
              { label: 'JP-8 Aviation Fuel', val: '438,400 L', status: 'Warning (72h Deficit)', color: 'text-[#D4A017]' },
              { label: '155mm Artillery Shells', val: '28,400 Rds', status: 'Optimal', color: 'text-[#2A9D8F]' },
              { label: 'High Altitude MRE Rations', val: '84,000 Units', status: 'Optimal', color: 'text-[#2A9D8F]' },
              { label: 'Field Medical Trauma Kits', val: '12,200 Kits', status: 'Optimal', color: 'text-[#2A9D8F]' },
              { label: 'Tracked Heavy Spares', val: '6,400 Parts', status: 'Warning', color: 'text-[#D4A017]' }
            ].map((res, i) => (
              <div key={i} className="p-2.5 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
                <div className="flex items-center justify-between text-[#F5F5F5]">
                  <span>{res.label}</span>
                  <span className="font-bold">{res.val}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#A0A0A0]">Status:</span>
                  <span className={`font-bold ${res.color}`}>{res.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTERABLE DEPOT NETWORK TABLE */}
      <div className="mil-panel p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#4B6F44]/30 pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#4B6F44]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search depot name or ID..."
              className="bg-[#050505] border border-[#4B6F44]/40 px-3 py-1.5 text-xs text-[#F5F5F5] placeholder-[#A0A0A0]/60 focus:outline-none focus:border-[#6B8E23] w-64"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#A0A0A0]">COMMAND:</span>
            <select
              value={filterCommand}
              onChange={(e) => setFilterCommand(e.target.value)}
              className="bg-[#111111] border border-[#4B6F44]/40 px-2 py-1 text-xs text-[#F5F5F5] focus:outline-none"
            >
              <option value="All">All Commands</option>
              <option value="Northern">Northern Command</option>
              <option value="Eastern">Eastern Command</option>
              <option value="Western">Western Command</option>
            </select>

            <span className="text-[10px] text-[#A0A0A0] ml-2">CATEGORY:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#111111] border border-[#4B6F44]/40 px-2 py-1 text-xs text-[#F5F5F5] focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Fuel">Fuel</option>
              <option value="Ammunition">Ammunition</option>
              <option value="Medical">Medical</option>
              <option value="Food">Food</option>
              <option value="Spares">Spares</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#4B6F44]/30 bg-[#111111] text-[#A0A0A0] text-[10px] uppercase">
                <th className="p-2.5">Depot ID</th>
                <th className="p-2.5">Name</th>
                <th className="p-2.5">Command Sector</th>
                <th className="p-2.5">Supply Category</th>
                <th className="p-2.5">Current Stock</th>
                <th className="p-2.5">Capacity %</th>
                <th className="p-2.5">Predicted Depletion</th>
                <th className="p-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4B6F44]/20 text-[11px]">
              {filteredDepots.map((row) => (
                <tr key={row.id} className="hover:bg-[#1E2E1B]/30 transition-colors">
                  <td className="p-2.5 text-[#6B8E23] font-bold">{row.id}</td>
                  <td className="p-2.5 text-[#F5F5F5] font-semibold">{row.name}</td>
                  <td className="p-2.5 text-[#A0A0A0]">{row.command} Command</td>
                  <td className="p-2.5 text-[#F5F5F5]">{row.category}</td>
                  <td className="p-2.5 text-[#F5F5F5]">{row.quantity}</td>
                  <td className="p-2.5 font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#050505] border border-[#4B6F44]/30">
                        <div
                          className={`h-full ${row.status === 'critical' ? 'bg-[#D62828]' : row.status === 'warning' ? 'bg-[#D4A017]' : 'bg-[#2A9D8F]'}`}
                          style={{ width: `${row.capacityPercent}%` }}
                        />
                      </div>
                      <span>{row.capacityPercent}%</span>
                    </div>
                  </td>
                  <td className="p-2.5 text-[#A0A0A0]">{row.depletionDate}</td>
                  <td className="p-2.5">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 border ${
                        row.status === 'critical'
                          ? 'bg-[#4A0E0E] text-[#D62828] border-[#D62828]'
                          : row.status === 'warning'
                          ? 'bg-[#3D2E07] text-[#D4A017] border-[#D4A017]'
                          : 'bg-[#1E2E1B] text-[#2A9D8F] border-[#4B6F44]'
                      }`}
                    >
                      {row.status.toUpperCase()}
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

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Shield,
  Activity,
  Boxes,
  TrendingUp,
  MapPin,
  Truck,
  AlertTriangle,
  Bot,
  RefreshCw,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Radio,
  Filter,
  Layers,
  CheckCircle2,
  Calendar
} from 'lucide-react'
import { MilitaryMap } from '@/components/military-map'

export default function DashboardPage() {
  const [selectedHorizon, setSelectedHorizon] = useState<'7d' | '14d' | '30d'>('30d')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const topKPIs = [
    { label: 'Operational Readiness', value: '94.2%', sub: 'DEFCON 2 Status', trend: '+1.4%', status: 'ok' },
    { label: 'Supply Health Index', value: '88.7%', sub: 'Theater Average', trend: '+0.8%', status: 'ok' },
    { label: 'Forward Inventory Status', value: '14 Depots', sub: 'Active Storage Points', trend: '100% Online', status: 'ok' },
    { label: 'Active Convoys', value: '38 Convoys', sub: 'En-Route Heavy Freight', trend: '3 Delayed', status: 'warning' },
    { label: 'High Risk Zones', value: '3 Passes', sub: 'Weather / Landslide Alert', trend: 'High Hazard', status: 'critical' },
    { label: 'Pending Resupply Missions', value: '12 Missions', sub: 'Air & Ground Sorties', trend: '6 Expedited', status: 'warning' }
  ]

  const supplyHealthItems = [
    { category: 'Fuel (JP-8 & Diesel)', health: 82, daysLeft: 14, status: 'warning', detail: 'Critical reserve depletion projected in Sector Alpha' },
    { category: 'Medical & Trauma Kits', health: 94, daysLeft: 28, status: 'ok', detail: 'Stock optimal across all forward surgical centers' },
    { category: 'Food & Field Rations (MREs)', health: 91, daysLeft: 21, status: 'ok', detail: 'High-altitude emergency rations fully staged' },
    { category: 'Ammunition & Shells (155mm)', health: 76, daysLeft: 10, status: 'critical', detail: 'Shortage warning flagged for Sector Echo artillery units' },
    { category: 'Engineering & Heavy Spares', health: 88, daysLeft: 19, status: 'ok', detail: 'Bridge repair kits and tracked spares in reserve' }
  ]

  const alerts = [
    { title: 'Fuel shortage predicted in Sector Alpha', time: '10m ago', sector: 'Northern Command', severity: 'critical', desc: 'JP-8 Aviation stock drops below 20% threshold at T+72h.' },
    { title: 'Medical stock critical in Northern Base', time: '32m ago', sector: 'Northern Base', severity: 'critical', desc: 'Trauma Kit & Blood Plasma reserves require immediate top-up.' },
    { title: 'Convoy delay due to weather disruption', time: '1h ago', sector: 'Route Red-3', severity: 'warning', desc: 'Convoy Bravo-4 holding at Pass Marker 88 due to blizzard.' },
    { title: 'Road accessibility reduced by landslide', time: '2h ago', sector: 'Zoji La Sector', severity: 'warning', desc: 'BRO units clearing debris; alternate ridge route activated.' }
  ]

  return (
    <div className="space-y-6 font-sans text-xs text-[#F5F5F5]">
      {/* Dashboard Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold font-mono tracking-wider text-[#F5F5F5] uppercase">
              MILITARY COMMAND CENTER // THEATER LOGISTICS OVERVIEW
            </h1>
            <span className="px-2 py-0.5 bg-[#1E2E1B] border border-[#4B6F44] text-[10px] font-mono text-[#6B8E23]">
              LIVE TELEMETRY
            </span>
          </div>
          <p className="text-[11px] font-mono text-[#A0A0A0] mt-0.5">
            Real-time supply health, GIS route tracking, AI demand projections, and risk advisories.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <Link
            href="/dashboard/gis"
            className="px-3 py-1.5 bg-[#111111] hover:bg-[#1E2E1B] border border-[#4B6F44]/40 text-[#F5F5F5] transition-colors flex items-center gap-1.5 text-xs"
          >
            <MapPin className="w-3.5 h-3.5 text-[#6B8E23]" />
            <span>GIS Operations</span>
          </Link>
          <Link
            href="/dashboard/forecasting"
            className="px-3 py-1.5 bg-[#4B6F44] hover:bg-[#5B8652] text-[#F5F5F5] border border-[#6B8E23] transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>AI Forecasting</span>
          </Link>
        </div>
      </div>

      {/* TOP KPIs GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {topKPIs.map((kpi, idx) => (
          <div
            key={idx}
            className={`mil-panel p-3.5 bg-[#0A0A0A] border space-y-1 font-mono ${
              kpi.status === 'critical'
                ? 'border-[#D62828]/50 bg-[#0E0505]'
                : kpi.status === 'warning'
                ? 'border-[#D4A017]/40 bg-[#0D0B05]'
                : 'border-[#4B6F44]/30'
            }`}
          >
            <span className="text-[10px] text-[#A0A0A0] block truncate uppercase">
              {kpi.label}
            </span>
            <span
              className={`text-xl font-extrabold block tracking-tight ${
                kpi.status === 'critical'
                  ? 'text-[#D62828]'
                  : kpi.status === 'warning'
                  ? 'text-[#D4A017]'
                  : 'text-[#F5F5F5]'
              }`}
            >
              {kpi.value}
            </span>
            <div className="flex items-center justify-between text-[9px] pt-1 border-t border-[#4B6F44]/20">
              <span className="text-[#A0A0A0] truncate">{kpi.sub}</span>
              <span
                className={
                  kpi.status === 'critical'
                    ? 'text-[#D62828]'
                    : kpi.status === 'warning'
                    ? 'text-[#D4A017]'
                    : 'text-[#2A9D8F]'
                }
              >
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID: GIS MAP (Left) & ALERT + SUPPLY HEALTH (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GIS MAP PANEL - Takes 2 Columns on large screens */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[#F5F5F5] font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#6B8E23]" />
              THEATER GIS MAP // CONVOY & DEPOT INTELLIGENCE
            </span>
            <Link href="/dashboard/gis" className="text-[#6B8E23] hover:underline flex items-center gap-1 text-[11px]">
              Full GIS Suite <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <MilitaryMap interactive={true} />
        </div>

        {/* ALERT PANEL & QUICK STATUS - Takes 1 Column */}
        <div className="space-y-6">
          {/* ALERT PANEL */}
          <div className="mil-panel p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-3">
            <div className="flex items-center justify-between border-b border-[#4B6F44]/30 pb-2">
              <span className="font-mono text-xs text-[#D62828] font-bold uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#D62828] animate-pulse" />
                CRITICAL THREAT & SHORTAGE ALERTS
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 bg-[#4A0E0E] text-[#D62828] border border-[#D62828]">
                4 ACTIVE
              </span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {alerts.map((alt, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 border font-mono space-y-1 transition-all ${
                    alt.severity === 'critical'
                      ? 'bg-[#0E0505] border-[#D62828]/60 text-[#F5F5F5]'
                      : 'bg-[#0D0B05] border-[#D4A017]/50 text-[#F5F5F5]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span
                      className={`font-bold ${
                        alt.severity === 'critical' ? 'text-[#D62828]' : 'text-[#D4A017]'
                      }`}
                    >
                      {alt.title}
                    </span>
                    <span className="text-[9px] text-[#A0A0A0]">{alt.time}</span>
                  </div>
                  <p className="text-[10px] text-[#A0A0A0] leading-snug">{alt.desc}</p>
                  <div className="text-[9px] text-[#6B8E23] pt-0.5 flex items-center justify-between">
                    <span>SECTOR: {alt.sector}</span>
                    <span className="underline cursor-pointer hover:text-[#F5F5F5]">Mitigate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECONDARY GRID: SUPPLY HEALTH PANEL & DEMAND FORECAST PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SUPPLY HEALTH PANEL */}
        <div className="mil-panel p-5 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#4B6F44]/30 pb-2.5">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-[#6B8E23]" />
              <h2 className="text-sm font-bold text-[#F5F5F5] uppercase">
                SUPPLY HEALTH & DEPOT RESERVES
              </h2>
            </div>
            <Link
              href="/dashboard/inventory"
              className="text-[11px] text-[#6B8E23] hover:underline flex items-center gap-1"
            >
              Inventory Network <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {supplyHealthItems.map((item, idx) => (
              <div key={idx} className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#F5F5F5]">{item.category}</span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-[#A0A0A0]">{item.daysLeft} Days Stock</span>
                    <span
                      className={
                        item.status === 'critical'
                          ? 'text-[#D62828] font-bold'
                          : item.status === 'warning'
                          ? 'text-[#D4A017] font-bold'
                          : 'text-[#2A9D8F] font-bold'
                      }
                    >
                      {item.health}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-[#050505] border border-[#4B6F44]/30">
                  <div
                    className={`h-full transition-all ${
                      item.status === 'critical'
                        ? 'bg-[#D62828]'
                        : item.status === 'warning'
                        ? 'bg-[#D4A017]'
                        : 'bg-[#2A9D8F]'
                    }`}
                    style={{ width: `${item.health}%` }}
                  />
                </div>

                <p className="text-[10px] text-[#A0A0A0] flex items-center justify-between">
                  <span>{item.detail}</span>
                  <span className="text-[#6B8E23] uppercase">FOC Status: Active</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DEMAND FORECAST PANEL */}
        <div className="mil-panel p-5 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#4B6F44]/30 pb-2.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#D4A017]" />
              <h2 className="text-sm font-bold text-[#F5F5F5] uppercase">
                DEMAND FORECAST & GAP DETECTION
              </h2>
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              {(['7d', '14d', '30d'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setSelectedHorizon(h)}
                  className={`px-2 py-0.5 border ${
                    selectedHorizon === h
                      ? 'bg-[#4B6F44] border-[#6B8E23] text-[#F5F5F5]'
                      : 'bg-[#111111] border-[#4B6F44]/30 text-[#A0A0A0]'
                  }`}
                >
                  {h.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {/* Visual Forecast Chart Representation */}
            <div className="p-3 bg-[#050505] border border-[#4B6F44]/30 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#A0A0A0]">
                <span>HISTORICAL VS PREDICTED CONSUMPTION ({selectedHorizon.toUpperCase()})</span>
                <span className="text-[#2A9D8F]">CONFIDENCE 97.8%</span>
              </div>
              <div className="h-32 flex items-end gap-2 pt-4 border-b border-[#4B6F44]/20 pb-2">
                {[35, 42, 50, 48, 56, 64, 72, 80, 88, 96, 110, 125, 118, 130].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full ${i >= 8 ? 'bg-[#D4A017] animate-pulse' : 'bg-[#4B6F44]'}`}
                      style={{ height: `${val * 0.7}px` }}
                    />
                    <span className="text-[8px] text-[#A0A0A0]">
                      {i < 8 ? `T-${8 - i}` : `T+${i - 7}`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#A0A0A0]">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-[#4B6F44]" /> Actual Consumption
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-[#D4A017]" /> Projected Demand Surge
                </span>
              </div>
            </div>

            {/* Gap Alerts */}
            <div className="p-3 bg-[#0E0505] border border-[#D62828]/50 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-[#D62828]">
                <span>CRITICAL SUPPLY GAP DETECTED</span>
                <span>T+72 HOURS</span>
              </div>
              <p className="text-[11px] text-[#F5F5F5]">
                Sector Alpha requires <span className="text-[#D4A017] font-bold">1,500L JP-8 Aviation Fuel</span> deficit top-up to prevent rotor fleet grounding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

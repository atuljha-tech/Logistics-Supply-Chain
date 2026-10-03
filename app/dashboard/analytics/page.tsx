'use client'

import React from 'react'
import {
  BarChart3,
  TrendingUp,
  Shield,
  Boxes,
  Truck,
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 font-sans text-xs text-[#F5F5F5]">
      {/* Header Banner */}
      <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider">
              COMMAND LOGISTICS ANALYTICS & THEATER PERFORMANCE
            </h1>
            <span className="px-2 py-0.5 bg-[#1E2E1B] border border-[#4B6F44] text-[10px] text-[#6B8E23]">
              MONTHLY HISTORICAL PERFORMANCE
            </span>
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">
            Theater supply availability metrics, route efficiency ratios, depot turnover, and fuel burn reduction reports.
          </p>
        </div>
      </div>

      {/* METRIC HIGHLIGHTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block uppercase">Supply Availability Rate</span>
          <span className="text-2xl font-extrabold text-[#2A9D8F]">98.4%</span>
          <span className="text-[10px] text-[#2A9D8F] block">+2.1% YoY Target Met</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block uppercase">Resupply Delay Reduction</span>
          <span className="text-2xl font-extrabold text-[#2A9D8F]">34%</span>
          <span className="text-[10px] text-[#2A9D8F] block">Via GIS Route Engine</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block uppercase">Depot Stock Accuracy</span>
          <span className="text-2xl font-extrabold text-[#F5F5F5]">99.2%</span>
          <span className="text-[10px] text-[#2A9D8F] block">Telemetry Sensors Active</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block uppercase">Convoy Fuel Efficiency</span>
          <span className="text-2xl font-extrabold text-[#D4A017]">+14.6%</span>
          <span className="text-[10px] text-[#D4A017] block">Terrain Elevation Mode</span>
        </div>
      </div>

      {/* ANALYTICS CHARTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
        <div className="mil-panel p-5 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4">
          <div className="border-b border-[#4B6F44]/30 pb-2">
            <span className="text-xs font-bold text-[#F5F5F5] uppercase">
              THEATER SUPPLY AVAILABILITY BY SECTOR
            </span>
          </div>
          <div className="space-y-3 text-[11px]">
            {[
              { sector: 'Northern Command (Leh/Siachen)', availability: '94.2%', bar: 'w-[94%]', color: 'bg-[#4B6F44]' },
              { sector: 'Eastern Command (Siliguri/Tawang)', availability: '98.1%', bar: 'w-[98%]', color: 'bg-[#2A9D8F]' },
              { sector: 'Western Command (Jodhpur/Desert)', availability: '99.4%', bar: 'w-[99%]', color: 'bg-[#2A9D8F]' },
              { sector: 'Central Air Command', availability: '97.8%', bar: 'w-[97%]', color: 'bg-[#4B6F44]' }
            ].map((sec, i) => (
              <div key={i} className="p-2.5 bg-[#111111] border border-[#4B6F44]/20 space-y-1.5">
                <div className="flex justify-between text-[#F5F5F5]">
                  <span>{sec.sector}</span>
                  <span className="font-bold">{sec.availability}</span>
                </div>
                <div className="h-1.5 w-full bg-[#050505] border border-[#4B6F44]/30">
                  <div className={`h-full ${sec.bar} ${sec.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mil-panel p-5 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4">
          <div className="border-b border-[#4B6F44]/30 pb-2">
            <span className="text-xs font-bold text-[#F5F5F5] uppercase">
              AI SHORTAGE PREDICTION ACCURACY (HISTORICAL VALIDATION)
            </span>
          </div>
          <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-3 text-[11px]">
            <div className="flex justify-between text-[#A0A0A0]">
              <span>72-HOUR SHORTAGE PREDICTION ACCURACY</span>
              <span className="text-[#2A9D8F] font-bold">98.4% MATCH</span>
            </div>
            <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1 text-[#F5F5F5]">
              <span className="text-[#6B8E23] font-bold">MODEL AUDIT STATUS: PASSED</span>
              <p className="text-[#A0A0A0] text-[10px]">
                Out of 142 simulated supply friction events over the past 90 days, 139 were predicted with over 48h early warning, enabling zero mission stoppage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import {
  MapPin,
  Shield,
  CloudSnow,
  Sun,
  AlertTriangle,
  Play,
  Navigation,
  CheckCircle2,
  Sliders,
  TrendingDown,
  Clock,
  Zap
} from 'lucide-react'
import { MilitaryMap } from '@/components/military-map'

export default function GISOperationsPage() {
  const [activeTerrainLayer, setActiveTerrainLayer] = useState<'elevation' | 'weather' | 'risk'>('elevation')
  const [selectedRoute, setSelectedRoute] = useState<'route1' | 'route2'>('route2') // route2 is optimized

  return (
    <div className="space-y-6 font-sans text-xs text-[#F5F5F5]">
      {/* Header */}
      <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider">
              GIS OPERATIONS & ROUTE OPTIMIZATION
            </h1>
            <span className="px-2 py-0.5 bg-[#1E2E1B] border border-[#4B6F44] text-[10px] text-[#6B8E23]">
              TACTICAL MAP SUITE
            </span>
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">
            Optimize convoy routes using weather forecasts, terrain elevation, road accessibility, and avalanche risk scoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#A0A0A0]">LAYER:</span>
          {(['elevation', 'weather', 'risk'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveTerrainLayer(layer)}
              className={`px-2.5 py-1 text-xs font-semibold uppercase border ${
                activeTerrainLayer === layer
                  ? 'bg-[#4B6F44] border-[#6B8E23] text-[#F5F5F5]'
                  : 'bg-[#111111] border-[#4B6F44]/30 text-[#A0A0A0]'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN GIS VISUALIZATION & ROUTE COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Military Map Component - 2 Cols */}
        <div className="lg:col-span-2 space-y-3">
          <MilitaryMap interactive={true} />
        </div>

        {/* Route Comparison Panel - 1 Col */}
        <div className="mil-panel p-5 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-5 font-mono">
          <div className="border-b border-[#4B6F44]/30 pb-2.5">
            <span className="text-sm font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#6B8E23]" />
              CONVOY ROUTE COMPARISON ENGINE
            </span>
          </div>

          {/* Route Options Selection */}
          <div className="space-y-3">
            <div
              onClick={() => setSelectedRoute('route1')}
              className={`p-3 border cursor-pointer transition-all ${
                selectedRoute === 'route1'
                  ? 'bg-[#4A0E0E]/40 border-[#D62828] text-[#F5F5F5]'
                  : 'bg-[#111111] border-[#4B6F44]/30 text-[#A0A0A0]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#D62828]">CURRENT ROUTE (Standard Highway Pass)</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#4A0E0E] text-[#D62828]">HIGH RISK (88/100)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] mt-2">
                <div>Transit Time: <span className="font-bold text-[#F5F5F5]">9.8 Hours</span></div>
                <div>Fuel Usage: <span className="font-bold text-[#F5F5F5]">820 Liters</span></div>
              </div>
              <div className="text-[10px] text-[#D62828] mt-1">
                Hazard: Avalanche Alert & Active Landslide at Marker 142
              </div>
            </div>

            <div
              onClick={() => setSelectedRoute('route2')}
              className={`p-3 border cursor-pointer transition-all ${
                selectedRoute === 'route2'
                  ? 'bg-[#1E2E1B] border-[#4B6F44] text-[#F5F5F5] ring-1 ring-[#6B8E23]'
                  : 'bg-[#111111] border-[#4B6F44]/30 text-[#A0A0A0]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#2A9D8F]">OPTIMIZED ROUTE (Eastern Ridge Bypass)</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#1E2E1B] text-[#2A9D8F] border border-[#4B6F44]">LOW RISK (22/100)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] mt-2">
                <div>Transit Time: <span className="font-bold text-[#2A9D8F]">5.6 Hours</span></div>
                <div>Fuel Usage: <span className="font-bold text-[#2A9D8F]">480 Liters</span></div>
              </div>
              <div className="text-[10px] text-[#2A9D8F] mt-1">
                Optimized by AI Terrain Engine: Cleared for All 6x6 Heavy Transports
              </div>
            </div>
          </div>

          {/* DELTA SAVINGS SUMMARY CARDS */}
          <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-3">
            <span className="text-xs font-bold text-[#6B8E23] uppercase block">
              OPTIMIZATION DELTA SAVINGS:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2 bg-[#111111] border border-[#4B6F44]/20">
                <span className="text-[#A0A0A0] text-[9px] block">TIME SAVED</span>
                <span className="text-sm font-extrabold text-[#2A9D8F]">-4.2 Hours</span>
              </div>
              <div className="p-2 bg-[#111111] border border-[#4B6F44]/20">
                <span className="text-[#A0A0A0] text-[9px] block">RISK REDUCED</span>
                <span className="text-sm font-extrabold text-[#2A9D8F]">-66 Hazard</span>
              </div>
              <div className="p-2 bg-[#111111] border border-[#4B6F44]/20">
                <span className="text-[#A0A0A0] text-[9px] block">FUEL SAVED</span>
                <span className="text-sm font-extrabold text-[#2A9D8F]">-340 Liters</span>
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-[#4B6F44] hover:bg-[#5B8652] text-[#F5F5F5] font-bold uppercase tracking-wider border border-[#6B8E23] flex items-center justify-center gap-2">
            <Play className="w-4 h-4 text-[#2A9D8F]" />
            Dispatch Convoy on Optimized Route
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import {
  TrendingUp,
  Bot,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Filter,
  BarChart3,
  Layers,
  Zap
} from 'lucide-react'

export default function ForecastingPage() {
  const [horizon, setHorizon] = useState<'7d' | '14d' | '30d' | '90d'>('30d')
  const [selectedCategory, setSelectedCategory] = useState<string>('Fuel')

  const categories = ['Fuel', 'Food', 'Medical', 'Ammunition', 'Equipment']

  const forecastData: Record<string, { current: string; predicted: string; surge: string; gap: string; confidence: number }> = {
    Fuel: { current: '420,000 Liters', predicted: '680,000 Liters', surge: '+61.9%', gap: '160,000 Liters Deficit in Sector Alpha', confidence: 98.4 },
    Food: { current: '84,000 MRE Rations', predicted: '110,000 MRE Rations', surge: '+30.9%', gap: 'Balanced across all garrisons', confidence: 96.2 },
    Medical: { current: '12,200 Kits', predicted: '14,800 Kits', surge: '+21.3%', gap: 'Northern Base surgical top-up needed', confidence: 97.5 },
    Ammunition: { current: '28,400 Rounds', predicted: '42,000 Rounds', surge: '+47.8%', gap: 'Sector Echo 155mm reserve gap at T+14d', confidence: 94.8 },
    Equipment: { current: '6,400 Parts', predicted: '8,200 Parts', surge: '+28.1%', gap: 'Tracked vehicle spares pre-staging required', confidence: 95.9 }
  }

  const activeData = forecastData[selectedCategory]

  return (
    <div className="space-y-6 font-sans text-xs text-[#F5F5F5]">
      {/* Header Banner */}
      <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider">
              AI DEMAND FORECASTING ENGINE
            </h1>
            <span className="px-2 py-0.5 bg-[#3D2E07] border border-[#D4A017] text-[10px] text-[#D4A017]">
              MIL-GPT v4.2 PREDICTIVE ENGINE
            </span>
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">
            Predict fuel, food, medical supplies and ammunition requirements before shortages occur using historical consumption & confidence interval models.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#A0A0A0]">FORECAST HORIZON:</span>
          {(['7d', '14d', '30d', '90d'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-2.5 py-1 text-xs border font-semibold ${
                horizon === h
                  ? 'bg-[#4B6F44] border-[#6B8E23] text-[#F5F5F5]'
                  : 'bg-[#111111] border-[#4B6F44]/30 text-[#A0A0A0]'
              }`}
            >
              {h.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORY SELECTOR TABS */}
      <div className="flex flex-wrap gap-2 font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 border text-xs font-bold uppercase transition-all ${
              selectedCategory === cat
                ? 'bg-[#1E2E1B] border-[#4B6F44] text-[#F5F5F5] shadow-md'
                : 'bg-[#0A0A0A] border-[#4B6F44]/30 text-[#A0A0A0] hover:bg-[#111111]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FORECAST METRICS SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block">CURRENT RESERVES</span>
          <span className="text-xl font-extrabold text-[#F5F5F5]">{activeData.current}</span>
          <span className="text-[10px] text-[#2A9D8F] block">Depot Stage 1 Active</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block">PROJECTED DEMAND ({horizon.toUpperCase()})</span>
          <span className="text-xl font-extrabold text-[#D4A017]">{activeData.predicted}</span>
          <span className="text-[10px] text-[#D4A017] block">Surge Rate: {activeData.surge}</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block">AI CONFIDENCE INTERVAL</span>
          <span className="text-xl font-extrabold text-[#2A9D8F]">{activeData.confidence}%</span>
          <span className="text-[10px] text-[#A0A0A0] block">± 1.2% Standard Deviation</span>
        </div>

        <div className="p-4 bg-[#0E0505] border border-[#D62828]/50 space-y-1">
          <span className="text-[10px] text-[#D62828] block font-bold">SUPPLY GAP ADVISORY</span>
          <span className="text-xs font-bold text-[#F5F5F5] leading-tight block">{activeData.gap}</span>
          <span className="text-[10px] text-[#D62828] block">Pre-staging order queued</span>
        </div>
      </div>

      {/* DETAILED CONSUMPTION GRAPH & CONFIDENCE INTERVAL VISUAL */}
      <div className="mil-panel p-6 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-[#4B6F44]/30 pb-3">
          <div>
            <span className="text-sm font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#D4A017]" />
              {selectedCategory.toUpperCase()} CONSUMPTION CURVE & CONFIDENCE BAND
            </span>
            <span className="text-[10px] text-[#A0A0A0]">
              Showing historical baseline vs predicted trajectory for next {horizon.toUpperCase()}
            </span>
          </div>
          <span className="text-[11px] text-[#2A9D8F] font-bold">
            CONFIDENCE BAND: 95% - 99.2%
          </span>
        </div>

        {/* High visual density bar graph with confidence range */}
        <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-3">
          <div className="h-48 flex items-end gap-3 pt-6 border-b border-[#4B6F44]/30 pb-4">
            {[42, 48, 52, 58, 64, 70, 82, 95, 110, 128, 142, 160].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Confidence Interval Upper Bound Line */}
                {i >= 6 && (
                  <div
                    className="w-full bg-[#D4A017]/30 border-t border-[#D4A017] mb-1"
                    style={{ height: '8px' }}
                  />
                )}
                {/* Bar */}
                <div
                  className={`w-full ${i >= 6 ? 'bg-[#D4A017] animate-pulse' : 'bg-[#4B6F44]'}`}
                  style={{ height: `${v * 0.9}px` }}
                />
                <span className="text-[9px] text-[#A0A0A0]">
                  {i < 6 ? `Hist-${6 - i}` : `Fwd+${i - 5}`}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#A0A0A0] pt-1">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#4B6F44]" /> Historical Verified Baseline
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#D4A017]" /> Predicted Consumption Trajectory
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#D4A017]/30 border border-[#D4A017]" /> Upper/Lower Confidence Interval
            </span>
          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div className="p-4 bg-[#1E2E1B] border border-[#4B6F44] space-y-2">
          <span className="text-xs font-bold text-[#6B8E23] uppercase flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#2A9D8F]" />
            AI FORECAST INTELLIGENCE RECOMMENDATION:
          </span>
          <p className="text-xs text-[#F5F5F5] leading-relaxed">
            Based on forecasted {selectedCategory.toLowerCase()} consumption surge during upcoming high-altitude troop movements, authorize a <span className="text-[#2A9D8F] font-bold">25% buffer increase</span> at Leh Central Depot by 0800 ZULU tomorrow.
          </p>
        </div>
      </div>
    </div>
  )
}

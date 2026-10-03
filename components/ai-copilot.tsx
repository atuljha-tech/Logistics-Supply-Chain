'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Send,
  X,
  Sparkles,
  AlertTriangle,
  Shield,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Terminal,
  Activity,
  Layers
} from 'lucide-react'

interface CopilotResponse {
  query: string
  confidence: number
  classification: string
  summary: string
  recommendations: string[]
  metrics?: { label: string; value: string; status: 'ok' | 'warning' | 'critical' }[]
}

const PRESET_QUERIES = [
  'Which sector will face shortages next week?',
  'Show highest-risk supply routes.',
  'Predict fuel demand for Northern Command.',
  'Recommend optimal convoy schedule.',
]

const QUERY_RESPONSES: Record<string, CopilotResponse> = {
  'Which sector will face shortages next week?': {
    query: 'Which sector will face shortages next week?',
    confidence: 96.4,
    classification: 'SECRET // FORWARD OPS',
    summary: 'Predictive intelligence indicates critical JP-8 Aviation & Diesel fuel depletion in Sector Alpha (FOB Siachen Sector) at T+72h due to heavy high-altitude rotor activity and landslide blockages along NH-1D.',
    recommendations: [
      'Pre-stage 40,000L JP-8 at Leh Main Depot for tactical air-drop payload.',
      'Reroute heavy ground convoy via Zoji La Alternate Route Bravo to avoid active mudslide zone.',
      'Deploy 3x Heavy Lift Helicopters from Chandigarh Airbase for high-altitude emergency drop by 0600 ZULU.'
    ],
    metrics: [
      { label: 'Sector Alpha Fuel Reserve', value: '18.4% (Critical)', status: 'critical' },
      { label: 'Projected Depletion Window', value: '72 Hours', status: 'warning' },
      { label: 'Resupply Viability Index', value: '84.2%', status: 'ok' }
    ]
  },
  'Show highest-risk supply routes.': {
    query: 'Show highest-risk supply routes.',
    confidence: 94.8,
    classification: 'RESTRICTED // MIL-LOGS',
    summary: 'Terrain elevation analysis and weather intelligence flag Route Red-3 (Leh to Kargil Pass) as HIGH RISK (Risk Index 88/100). Threat factors: heavy snowfall, -24°C icing, rockfall risk at Marker 142.',
    recommendations: [
      'Enforce snow-chain mandatory protocol for all Class III 6x6 All-Terrain Trucks.',
      'Deploy BRO Heavy Machinery unit to clear Marker 142 ahead of Convoy Bravo-4 departure.',
      'Implement real-time IoT convoy telemetry tracking with 5-min ping frequency.'
    ],
    metrics: [
      { label: 'Route Red-3 Hazard Rating', value: '88 / 100', status: 'critical' },
      { label: 'Estimated Transit Delay', value: '+4.5 Hours', status: 'warning' },
      { label: 'Escort Escalate Status', value: 'Level 2 Active', status: 'ok' }
    ]
  },
  'Predict fuel demand for Northern Command.': {
    query: 'Predict fuel demand for Northern Command.',
    confidence: 98.1,
    classification: 'SECRET // NORTHERN CMD',
    summary: 'Northern Command fuel consumption will surge by +34.2% over the next 14 days due to scheduled high-altitude logistics mobility exercises and winter reserve stock buildup.',
    recommendations: [
      'Authorize emergency release of 120,000L POL from Pathankot Strategic Reserve.',
      'Initiate rail freight bulk shipment to Udhampur Freight Terminal.',
      'Increase depot buffer capacity at Srinagar Base to 95% full operational capability.'
    ],
    metrics: [
      { label: '14-Day Fuel Demand', value: '480,000 Liters', status: 'warning' },
      { label: 'Current Depot Stock', value: '310,000 Liters', status: 'warning' },
      { label: 'Supply Surplus/Deficit', value: '-170,000L Deficit', status: 'critical' }
    ]
  },
  'Recommend optimal convoy schedule.': {
    query: 'Recommend optimal convoy schedule.',
    confidence: 97.5,
    classification: 'CONFIDENTIAL // OPS PLANNING',
    summary: 'Optimized dispatch schedule computed using micro-weather forecasts and road pass clear-windows. Staggered departure recommended to prevent pass bottleneck at Khardung La.',
    recommendations: [
      'Convoy Alpha-1 (12 Trucks): Departure 0430 ZULU via Eastern Ridge.',
      'Convoy Bravo-2 (18 Trucks): Departure 0615 ZULU via Central Route.',
      'Convoy Charlie-3 (Heavy Transport): Departure 0800 ZULU after BRO pass maintenance.'
    ],
    metrics: [
      { label: 'Total Time Saved', value: '3.8 Hours', status: 'ok' },
      { label: 'Fuel Efficiency Boost', value: '+14.6%', status: 'ok' },
      { label: 'Route Safety Index', value: '92.4%', status: 'ok' }
    ]
  }
}

interface AICopilotProps {
  isOpen: boolean
  onClose: () => void
}

export const AICopilot: React.FC<AICopilotProps> = ({ isOpen, onClose }) => {
  const [inputText, setInputText] = useState('')
  const [history, setHistory] = useState<CopilotResponse[]>([
    QUERY_RESPONSES['Which sector will face shortages next week?']
  ])
  const [loading, setLoading] = useState(false)

  const handleSelectQuery = (query: string) => {
    setLoading(true)
    setTimeout(() => {
      const resp = QUERY_RESPONSES[query] || {
        query,
        confidence: 92.5,
        classification: 'CONFIDENTIAL // AI SYNTHESIS',
        summary: `Strategic logistics analysis for "${query}": Synthesizing current telemetry, stock health, and route weather forecasts...`,
        recommendations: [
          'Verify depot buffer reserves at nearest forward supply point.',
          'Issue convoy warning order for upcoming shift in demand.',
          'Re-evaluate risk matrix at 0800 ZULU synchronization meeting.'
        ],
        metrics: [
          { label: 'AI Synthesis Confidence', value: '92.5%', status: 'ok' },
          { label: 'Operational Readiness Impact', value: 'MODERATE', status: 'warning' }
        ]
      }
      setHistory((prev) => [resp, ...prev])
      setLoading(false)
    }, 600)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    const text = inputText.trim()
    setInputText('')
    handleSelectQuery(text)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-[#0A0A0A] border-l border-[#4B6F44]/40 z-50 flex flex-col shadow-2xl"
          >
            {/* Panel Header */}
            <div className="p-4 border-b border-[#4B6F44]/30 bg-[#111111] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#4B6F44]/20 border border-[#4B6F44] flex items-center justify-center text-[#4B6F44]">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-[#F5F5F5] uppercase">
                    Logistics Copilot
                  </h3>
                  <p className="text-[11px] font-mono text-[#6B8E23] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] animate-ping" />
                    AI DECISION SUPPORT ENGINE // MIL-GPT v4.2
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1A1D1A] transition-colors border border-transparent hover:border-[#4B6F44]/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Queries Bar */}
            <div className="p-3 border-b border-[#4B6F44]/20 bg-[#050505]">
              <div className="text-[10px] font-mono text-[#A0A0A0] uppercase mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4A017]" />
                Command Quick Queries
              </div>
              <div className="flex flex-col gap-1.5">
                {PRESET_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuery(q)}
                    className="text-left text-xs font-mono px-2.5 py-1.5 bg-[#111111] border border-[#4B6F44]/30 hover:border-[#6B8E23] text-[#F5F5F5] hover:bg-[#1E2E1B] transition-all flex items-center justify-between group"
                  >
                    <span className="truncate">&quot;{q}&quot;</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#4B6F44] group-hover:text-[#6B8E23] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Chat/Intelligence Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
              {loading && (
                <div className="p-4 border border-[#4B6F44]/40 bg-[#111111] flex items-center gap-3 animate-pulse">
                  <RefreshCw className="w-4 h-4 text-[#6B8E23] animate-spin" />
                  <span className="font-mono text-[#A0A0A0]">Running tactical logistics simulation model...</span>
                </div>
              )}

              {history.map((item, index) => (
                <div
                  key={index}
                  className="mil-panel p-4 space-y-3 bg-[#0A0A0A] border border-[#4B6F44]/30"
                >
                  {/* Query Header */}
                  <div className="flex items-center justify-between border-b border-[#4B6F44]/20 pb-2">
                    <span className="font-mono text-[10px] text-[#D4A017] uppercase tracking-wider flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      QUERY: {item.query}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#1E2E1B] border border-[#4B6F44] text-[#6B8E23]">
                      {item.classification}
                    </span>
                  </div>

                  {/* Confidence rating */}
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#A0A0A0]">
                    <span>AI Confidence Level:</span>
                    <span className="text-[#2A9D8F] font-semibold">{item.confidence}%</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-[#F5F5F5] leading-relaxed border-l-2 border-[#4B6F44] pl-2 bg-[#111111]/50 py-1">
                    {item.summary}
                  </p>

                  {/* Metrics grid if present */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="grid grid-cols-1 gap-1.5 pt-1">
                      {item.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-[#111111] border border-[#4B6F44]/20 font-mono text-[11px]"
                        >
                          <span className="text-[#A0A0A0]">{m.label}:</span>
                          <span
                            className={
                              m.status === 'critical'
                                ? 'text-[#D62828] font-bold'
                                : m.status === 'warning'
                                ? 'text-[#D4A017] font-bold'
                                : 'text-[#2A9D8F] font-bold'
                            }
                          >
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono text-[#6B8E23] uppercase font-semibold flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      Recommended Mission Actions:
                    </div>
                    <ul className="space-y-1.5">
                      {item.recommendations.map((rec, rIdx) => (
                        <li
                          key={rIdx}
                          className="flex items-start gap-2 text-[11px] text-[#F5F5F5] bg-[#111111] p-2 border border-[#4B6F44]/20"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6F44] shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-[#4B6F44]/30 bg-[#111111]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask Logistics Copilot (e.g., sector fuel status)..."
                  className="flex-1 bg-[#050505] border border-[#4B6F44]/40 px-3 py-2 text-xs font-mono text-[#F5F5F5] placeholder-[#A0A0A0]/60 focus:outline-none focus:border-[#6B8E23]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#4B6F44] hover:bg-[#5B8652] text-[#F5F5F5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#6B8E23] transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  Ask
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

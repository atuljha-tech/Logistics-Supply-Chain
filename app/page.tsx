'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  TrendingUp,
  Boxes,
  MapPin,
  Truck,
  AlertTriangle,
  Bot,
  ArrowRight,
  ChevronRight,
  Activity,
  Layers,
  Radio,
  Clock,
  Terminal,
  Play,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react'
import { MilitaryMap } from '@/components/military-map'

export default function LandingPage() {
  const [activeArchStep, setActiveArchStep] = useState(0)
  const [simulationModal, setSimulationModal] = useState(false)

  const architectureSteps = [
    {
      title: 'IoT Sensors',
      desc: 'Telemetry nodes on heavy transports, depot fuel bladders, and ammo bunkers streaming real-time status.',
      icon: <Radio className="w-5 h-5 text-[#6B8E23]" />
    },
    {
      title: 'Data Ingestion',
      desc: 'Encrypted tactical data pipeline consolidating weather, terrain, and unit consumption streams.',
      icon: <Layers className="w-5 h-5 text-[#4B6F44]" />
    },
    {
      title: 'AI Intelligence Layer',
      desc: 'Machine learning algorithms evaluating theater readiness, supply friction, and threat risk matrices.',
      icon: <Bot className="w-5 h-5 text-[#2A9D8F]" />
    },
    {
      title: 'Forecasting Engine',
      desc: '72-hour to 30-day predictive demand models projecting fuel, ammo, food, and medical depletion.',
      icon: <TrendingUp className="w-5 h-5 text-[#D4A017]" />
    },
    {
      title: 'GIS Route Optimization',
      desc: 'Terrain-aware pathfinding accounting for mountain pass weather, avalanche risks, and convoy constraints.',
      icon: <MapPin className="w-5 h-5 text-[#6B8E23]" />
    },
    {
      title: 'Command Dashboard',
      desc: 'Centralized military command room display empowering commanders with instant actionable intelligence.',
      icon: <Shield className="w-5 h-5 text-[#4B6F44]" />
    }
  ]

  const features = [
    {
      title: '1. Predictive Demand Forecasting',
      icon: <TrendingUp className="w-6 h-6 text-[#D4A017]" />,
      desc: 'Forecast fuel, food, medical supplies and ammunition requirements before shortages occur.',
      visual: (
        <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[#A0A0A0]">
            <span>30-DAY CONSUMPTION PROJECTION</span>
            <span className="text-[#D4A017]">+18.4% SURGE</span>
          </div>
          <div className="h-28 flex items-end gap-1.5 pt-4">
            {[40, 55, 48, 62, 75, 82, 90, 85, 78, 95, 110, 105, 120].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full ${i >= 8 ? 'bg-[#D4A017] animate-pulse' : 'bg-[#4B6F44]'}`}
                  style={{ height: `${v * 0.7}px` }}
                />
                <span className="text-[8px] text-[#A0A0A0]">D+{i * 2}</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-[#2A9D8F] flex items-center gap-1.5 pt-2 border-t border-[#4B6F44]/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F]" />
            CONFIDENCE: 98.4% // 72H SHORTAGE WINDOW PRE-STAGED
          </div>
        </div>
      )
    },
    {
      title: '2. Inventory Intelligence',
      icon: <Boxes className="w-6 h-6 text-[#6B8E23]" />,
      desc: 'Monitor supply levels across bases, depots and forward operating locations in real time.',
      visual: (
        <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#A0A0A0]">
            <span>THEATER DEPOT HEATMAP</span>
            <span className="text-[#6B8E23]">14 DEPOTS LIVE</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'LEH HUB', status: '88%', c: 'bg-[#4B6F44]' },
              { name: 'SIACHEN', status: '42%', c: 'bg-[#D62828] animate-pulse' },
              { name: 'SILIGURI', status: '94%', c: 'bg-[#2A9D8F]' },
              { name: 'TAWANG', status: '68%', c: 'bg-[#D4A017]' },
              { name: 'JODHPUR', status: '96%', c: 'bg-[#2A9D8F]' },
              { name: 'PATHANKOT', status: '91%', c: 'bg-[#4B6F44]' },
              { name: 'TEZPUR', status: '82%', c: 'bg-[#4B6F44]' },
              { name: 'CHUSHUL', status: '52%', c: 'bg-[#D4A017]' }
            ].map((d, i) => (
              <div key={i} className="p-2 bg-[#111111] border border-[#4B6F44]/20 text-[10px] space-y-1">
                <span className="text-[#F5F5F5] block truncate font-bold">{d.name}</span>
                <span className={`block h-1 w-full ${d.c}`} />
                <span className="text-[#A0A0A0]">{d.status}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: '3. Terrain-Aware Route Optimization',
      icon: <MapPin className="w-6 h-6 text-[#4B6F44]" />,
      desc: 'Optimize convoy routes using weather, terrain elevation, road conditions and risk factors.',
      visual: (
        <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[#A0A0A0]">
            <span>GIS CONVOY ROUTE OPTIMIZER</span>
            <span className="text-[#2A9D8F]">-4.2 HOURS SAVED</span>
          </div>
          <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#D62828] line-through">Standard Mountain Pass Route (Risk 88)</span>
              <span className="text-[#A0A0A0]">9.8 Hrs</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold text-[#2A9D8F]">
              <span>Optimized Alternate Ridge Pass (Risk 22)</span>
              <span>5.6 Hrs</span>
            </div>
            <div className="text-[10px] text-[#A0A0A0] border-t border-[#4B6F44]/20 pt-1">
              Weather Hazard Mitigated: Avalanche Alert at Marker 142
            </div>
          </div>
        </div>
      )
    },
    {
      title: '4. Real-Time Asset Tracking',
      icon: <Truck className="w-6 h-6 text-[#2A9D8F]" />,
      desc: 'Track vehicles, supplies and critical assets through IoT-enabled telemetry systems.',
      visual: (
        <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#A0A0A0]">
            <span>TELEMETRY STREAM: CONVOY BRAVO-4</span>
            <span className="text-[#2A9D8F]">SATCOM ACTIVE</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-[#111111] border border-[#4B6F44]/20">
              <span className="text-[#A0A0A0] block text-[10px]">VEHICLE COUNT</span>
              <span className="text-[#F5F5F5] font-bold">18 Armored 6x6</span>
            </div>
            <div className="p-2 bg-[#111111] border border-[#4B6F44]/20">
              <span className="text-[#A0A0A0] block text-[10px]">SPEED / ELEV</span>
              <span className="text-[#F5F5F5] font-bold">42 km/h | 14,200ft</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '5. Supply Risk Prediction',
      icon: <AlertTriangle className="w-6 h-6 text-[#D62828]" />,
      desc: 'Identify shortages, bottlenecks and mission risks before they impact operations.',
      visual: (
        <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[#A0A0A0]">
            <span>THEATER RISK RADAR</span>
            <span className="text-[#D62828] font-bold">HIGH RISK: SECTOR ALPHA</span>
          </div>
          <div className="p-2.5 bg-[#4A0E0E]/40 border border-[#D62828] space-y-1 text-[11px]">
            <div className="flex items-center gap-2 text-[#D62828] font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>CRITICAL DEFICIT PREDICTED AT T+72H</span>
            </div>
            <p className="text-[#F5F5F5] text-[10px]">
              JP-8 Aviation Fuel stock in Northern Base projected below 20% FOC threshold.
            </p>
          </div>
        </div>
      )
    },
    {
      title: '6. Command Decision Support',
      icon: <Bot className="w-6 h-6 text-[#2A9D8F]" />,
      desc: 'AI-generated logistics recommendations for commanders and planners.',
      visual: (
        <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[#A0A0A0]">
            <span>LOGISTICS COPILOT ADVISORY</span>
            <span className="text-[#2A9D8F]">AI CONFIDENCE 96.4%</span>
          </div>
          <div className="p-2.5 bg-[#1E2E1B] border border-[#4B6F44] space-y-1.5 text-[11px]">
            <span className="text-[#6B8E23] font-bold block text-[10px]">ACTION PLAN #42:</span>
            <span className="text-[#F5F5F5] block">
              Pre-stage 40,000L JP-8 via air-drop from Leh Depot to FOB Siachen by 0600 ZULU.
            </span>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#4B6F44]/30">
      {/* Top Command Navbar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#4B6F44]/40 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4B6F44] flex items-center justify-center text-[#F5F5F5] font-mono font-bold text-sm border border-[#6B8E23]">
            S
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-widest text-[#F5F5F5] uppercase">
              SENTINEL SUPPLY
            </h1>
            <p className="text-[10px] font-mono text-[#6B8E23]">
              AI-POWERED PREDICTIVE LOGISTICS COMMAND SYSTEM
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#A0A0A0]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-ping" />
            THEATER READINESS: DEFCON 2
          </span>
          <span>ZULU TIME ACTIVE</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-[#4B6F44] hover:bg-[#5B8652] text-[#F5F5F5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#6B8E23] transition-colors flex items-center gap-2"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-20">
        {/* HERO SECTION */}
        <section className="space-y-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E2E1B] border border-[#4B6F44] font-mono text-xs text-[#6B8E23]">
              <Shield className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>PROJECT RAKSHAK // BHARAT SUPPLY INTELLIGENCE</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight text-[#F5F5F5] font-mono">
              Predict Tomorrow&apos;s Supply Needs Before They Become Mission Risks
            </h1>

            <p className="text-base md:text-lg text-[#A0A0A0] leading-relaxed max-w-3xl">
              Transforming reactive military logistics into an intelligent predictive supply chain capable of forecasting demand, preventing shortages, optimizing resupply missions and maintaining operational readiness across forward formations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="px-6 py-3.5 bg-[#4B6F44] hover:bg-[#5B8652] text-[#F5F5F5] font-mono text-xs font-bold uppercase tracking-widest border border-[#6B8E23] transition-all flex items-center gap-2.5 shadow-lg shadow-[#4B6F44]/20"
              >
                <span>Launch Command Center</span>
                <ChevronRight className="w-4 h-4 text-[#2A9D8F]" />
              </Link>

              <button
                onClick={() => setSimulationModal(true)}
                className="px-6 py-3.5 bg-[#111111] hover:bg-[#1E2E1B] text-[#F5F5F5] font-mono text-xs font-bold uppercase tracking-widest border border-[#4B6F44]/50 hover:border-[#6B8E23] transition-all flex items-center gap-2.5"
              >
                <Play className="w-4 h-4 text-[#D4A017]" />
                <span>View Live Simulation</span>
              </button>
            </div>
          </div>

          {/* Key Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[
              { label: 'Supply Availability', value: '98.4%', sub: 'Across Northern & Eastern Commands' },
              { label: 'Reduction In Delays', value: '34%', sub: 'Via Terrain-Aware Route Planning' },
              { label: 'Shortage Prediction Window', value: '72 Hours', sub: 'Early Alert Horizon' },
              { label: 'Assets Tracked', value: '5000+', sub: 'Vehicles, Depots & Outposts' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="mil-panel p-4 space-y-1 bg-[#0A0A0A] border border-[#4B6F44]/30 font-mono"
              >
                <span className="text-2xl md:text-3xl font-extrabold text-[#F5F5F5] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-[#6B8E23] font-semibold block uppercase">
                  {stat.label}
                </span>
                <span className="text-[10px] text-[#A0A0A0] block">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Military Operations Interactive Map Visualization */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-[#A0A0A0] px-1">
              <span className="flex items-center gap-2 text-[#F5F5F5] font-semibold">
                <Activity className="w-4 h-4 text-[#4B6F44]" />
                FORWARD THEATER OPERATIONAL SUPPLY MAP
              </span>
              <span>COMMAND SECTORS: NORTHERN // EASTERN // WESTERN</span>
            </div>
            <MilitaryMap interactive={true} />
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="space-y-8 pt-6 border-t border-[#4B6F44]/30">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#D4A017] uppercase tracking-widest flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              OPERATIONAL FRICTION FACTORS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F5F5] tracking-tight uppercase font-mono">
              Modern Military Logistics Faces Three Critical Challenges
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="mil-panel p-6 bg-[#0A0A0A] border border-[#4B6F44]/30 space-y-3">
              <div className="w-10 h-10 bg-[#3D2E07] border border-[#D4A017] flex items-center justify-center text-[#D4A017]">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5] font-mono">
                Supply Uncertainty
              </h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                Difficulty predicting future resource requirements across forward formations due to volatile operational demands, changing weather, and high-altitude consumption patterns.
              </p>
            </div>

            <div className="mil-panel p-6 bg-[#0A0A0A] border border-[#4B6F44]/30 space-y-3">
              <div className="w-10 h-10 bg-[#4A0E0E] border border-[#D62828] flex items-center justify-center text-[#D62828]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5] font-mono">
                Terrain Complexity
              </h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                High-altitude mountain passes, extreme winter freezes, weather disruptions, avalanches, and infrastructure constraints impact convoy movement speed and vulnerability.
              </p>
            </div>

            <div className="mil-panel p-6 bg-[#0A0A0A] border border-[#4B6F44]/30 space-y-3">
              <div className="w-10 h-10 bg-[#1E2E1B] border border-[#4B6F44] flex items-center justify-center text-[#6B8E23]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5] font-mono">
                Fragmented Information
              </h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                Depot inventory levels, vehicle telemetry, meteorological feeds, and operational mission intelligence exist across isolated, non-interoperable legacy systems.
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION */}
        <section className="space-y-8 pt-6 border-t border-[#4B6F44]/30">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono text-[#2A9D8F] uppercase tracking-widest">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F5F5] tracking-tight uppercase font-mono">
              One Unified Predictive Logistics Operating System
            </h2>
            <p className="text-xs text-[#A0A0A0]">
              From telemetry collection to real-time command decisions — seamless end-to-end intelligence pipeline.
            </p>
          </div>

          {/* Interactive Architecture Flow */}
          <div className="mil-panel p-6 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {architectureSteps.map((step, idx) => {
                const isActive = activeArchStep === idx
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveArchStep(idx)}
                    className={`p-3 text-left font-mono border transition-all ${
                      isActive
                        ? 'bg-[#1E2E1B] border-[#4B6F44] text-[#F5F5F5]'
                        : 'bg-[#111111] border-[#4B6F44]/20 text-[#A0A0A0] hover:bg-[#1E2E1B]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-[#A0A0A0]">0{idx + 1}</span>
                      {step.icon}
                    </div>
                    <span className="text-xs font-bold block truncate">{step.title}</span>
                  </button>
                )
              })}
            </div>

            <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs border-b border-[#4B6F44]/20 pb-2">
                <span className="text-[#6B8E23] font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#2A9D8F]" />
                  STAGE 0{activeArchStep + 1}: {architectureSteps[activeArchStep].title.toUpperCase()}
                </span>
                <span className="text-[10px] text-[#A0A0A0]">LATENCY: &lt; 40MS</span>
              </div>
              <p className="text-xs text-[#F5F5F5] leading-relaxed pt-1">
                {architectureSteps[activeArchStep].desc}
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="space-y-8 pt-6 border-t border-[#4B6F44]/30">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#6B8E23] uppercase tracking-widest">
              CAPABILITY MATRIX
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F5F5F5] tracking-tight uppercase font-mono">
              Six Core Pillars of Military Logistics Superiority
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="mil-panel p-6 bg-[#0A0A0A] border border-[#4B6F44]/30 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#111111] border border-[#4B6F44]/30">
                      {feat.icon}
                    </div>
                    <h3 className="text-base font-bold text-[#F5F5F5] font-mono">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                {feat.visual}
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="mil-panel p-8 md:p-12 bg-[#0A0A0A] border border-[#4B6F44] text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E2E1B] border border-[#4B6F44] font-mono text-xs text-[#2A9D8F]">
              <Lock className="w-3.5 h-3.5" />
              <span>DEFENSE INTEGRATION READY // MIL-SPEC AES-256</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-[#F5F5F5] uppercase tracking-tight font-mono">
              Maintain Operational Readiness Across All Forward Formations
            </h2>

            <p className="text-xs md:text-sm text-[#A0A0A0] leading-relaxed">
              Deploy Sentinel Supply across command headquarters, logistics depots, and forward operating bases.
            </p>

            <div className="pt-4 flex justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-[#4B6F44] hover:bg-[#5B8652] text-[#F5F5F5] font-mono text-xs font-bold uppercase tracking-widest border border-[#6B8E23] transition-all flex items-center gap-3 shadow-xl"
              >
                <span>Enter Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-[#4B6F44]/30 bg-[#050505] py-8 px-4 md:px-8 font-mono text-xs text-[#A0A0A0]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#4B6F44]" />
            <span className="text-[#F5F5F5] font-bold">SENTINEL SUPPLY</span>
            <span>|</span>
            <span className="text-[11px]">DEFENSE LOGISTICS INTELLIGENCE OS</span>
          </div>

          <div className="text-[11px] text-center md:text-right">
            <span>BHARAT SUPPLY INTELLIGENCE // RESTRICTED ACCESS</span>
          </div>
        </div>
      </footer>

      {/* Live Simulation Modal */}
      <AnimatePresence>
        {simulationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="mil-panel max-w-2xl w-full bg-[#0A0A0A] border border-[#4B6F44] p-6 space-y-4 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-[#4B6F44]/30 pb-3">
                <span className="text-[#F5F5F5] font-bold uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#D4A017]" />
                  LIVE THEATER LOGISTICS SIMULATION RUNNER
                </span>
                <button
                  onClick={() => setSimulationModal(false)}
                  className="text-[#A0A0A0] hover:text-[#F5F5F5]"
                >
                  [CLOSE]
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
                  <span className="text-[#6B8E23] font-bold block">SCENARIO: WINTER MONSOON RESUPPLY SURGE</span>
                  <p className="text-[#A0A0A0] text-[11px]">
                    Simulating 72-hour forecast depletion for 14 Forward Operating Bases in Leh & Tawang sectors under heavy snowstorm conditions.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-[#050505] border border-[#4B6F44]/20">
                    <span className="text-[#A0A0A0] block">JP-8 FUEL REALLOCATION</span>
                    <span className="text-[#2A9D8F] font-bold">+42,000L PRE-STAGED</span>
                  </div>
                  <div className="p-2 bg-[#050505] border border-[#4B6F44]/20">
                    <span className="text-[#A0A0A0] block">CONVOY DELAY MITIGATION</span>
                    <span className="text-[#2A9D8F] font-bold">88.4% RISK REDUCTION</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSimulationModal(false)}
                  className="px-4 py-2 bg-[#111111] text-[#A0A0A0] hover:text-[#F5F5F5] border border-[#4B6F44]/30"
                >
                  Dismiss
                </button>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-[#4B6F44] text-[#F5F5F5] font-bold uppercase tracking-wider border border-[#6B8E23]"
                >
                  Open Full Command View
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

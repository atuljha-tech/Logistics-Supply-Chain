'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, ArrowRight } from 'lucide-react'

export default function SupplyChainRedirectPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans p-8 space-y-6">
      <div className="max-w-4xl mx-auto mil-panel p-8 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-6 font-mono">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4B6F44] flex items-center justify-center font-bold text-sm text-[#F5F5F5]">
            S
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wider text-[#F5F5F5]">
              SENTINEL SUPPLY // FORWARD SUPPLY CHAIN OPERATING SYSTEM
            </h1>
            <p className="text-xs text-[#6B8E23]">
              PREDICTIVE DEMAND & TERRAIN-AWARE ROUTE ENGINE
            </p>
          </div>
        </div>

        <p className="text-xs text-[#A0A0A0] leading-relaxed">
          Forward supply chain operating modules are integrated into Sentinel Supply. Select a module below to launch command tools.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard"
            className="p-4 bg-[#111111] hover:bg-[#1E2E1B] border border-[#4B6F44]/40 flex items-center justify-between text-xs transition-colors"
          >
            <span className="font-bold text-[#F5F5F5]">Command Center Dashboard</span>
            <ArrowRight className="w-4 h-4 text-[#2A9D8F]" />
          </Link>

          <Link
            href="/dashboard/forecasting"
            className="p-4 bg-[#111111] hover:bg-[#1E2E1B] border border-[#4B6F44]/40 flex items-center justify-between text-xs transition-colors"
          >
            <span className="font-bold text-[#F5F5F5]">AI Demand Forecasting Engine</span>
            <ArrowRight className="w-4 h-4 text-[#2A9D8F]" />
          </Link>

          <Link
            href="/dashboard/assets"
            className="p-4 bg-[#111111] hover:bg-[#1E2E1B] border border-[#4B6F44]/40 flex items-center justify-between text-xs transition-colors"
          >
            <span className="font-bold text-[#F5F5F5]">Real-Time Asset Telemetry</span>
            <ArrowRight className="w-4 h-4 text-[#2A9D8F]" />
          </Link>

          <Link
            href="/dashboard/alerts"
            className="p-4 bg-[#111111] hover:bg-[#1E2E1B] border border-[#4B6F44]/40 flex items-center justify-between text-xs transition-colors"
          >
            <span className="font-bold text-[#F5F5F5]">Risk & Shortage Alerts</span>
            <ArrowRight className="w-4 h-4 text-[#2A9D8F]" />
          </Link>
        </div>
      </div>
    </div>
  )
}

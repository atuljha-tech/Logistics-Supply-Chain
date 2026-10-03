'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Boxes,
  TrendingUp,
  MapPin,
  Truck,
  AlertTriangle,
  BarChart3,
  Settings,
  Shield,
  Menu,
  X,
  ExternalLink,
  Radio,
  Activity,
  Terminal
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string
}

const navItems: NavItem[] = [
  {
    label: 'Command Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: 'Inventory Intelligence',
    href: '/dashboard/inventory',
    icon: <Boxes className="w-4 h-4" />,
    badge: 'NET',
  },
  {
    label: 'Demand Forecasting',
    href: '/dashboard/forecasting',
    icon: <TrendingUp className="w-4 h-4" />,
    badge: 'AI',
  },
  {
    label: 'GIS Route Operations',
    href: '/dashboard/gis',
    icon: <MapPin className="w-4 h-4" />,
    badge: 'MAP',
  },
  {
    label: 'Asset Tracking',
    href: '/dashboard/assets',
    icon: <Truck className="w-4 h-4" />,
    badge: 'LIVE',
  },
  {
    label: 'Risk & Shortage Alerts',
    href: '/dashboard/alerts',
    icon: <AlertTriangle className="w-4 h-4" />,
    badge: '4',
  },
  {
    label: 'Command Analytics',
    href: '/dashboard/analytics',
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    label: 'System Settings',
    href: '/dashboard/settings',
    icon: <Settings className="w-4 h-4" />,
  },
]

export const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-3 left-4 z-50 md:hidden bg-[#0A0A0A] p-2 border border-[#4B6F44] hover:bg-[#1E2E1B] text-[#F5F5F5] transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Military Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#0A0A0A] border-r border-[#4B6F44]/40 flex flex-col transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#4B6F44]/30 bg-[#050505]">
          <Link href="/" className="block group">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#4B6F44] flex items-center justify-center text-[#F5F5F5] font-mono font-bold text-xs">
                S
              </div>
              <h1 className="text-base font-semibold tracking-wider text-[#F5F5F5] group-hover:text-[#6B8E23] transition-colors">
                SENTINEL SUPPLY
              </h1>
            </div>
            <p className="text-[10px] font-mono text-[#6B8E23] mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] animate-pulse" />
              PREDICTIVE LOGISTICS OS
            </p>
          </Link>
        </div>

        {/* Command Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto font-mono text-xs">
          <div className="text-[10px] text-[#A0A0A0] uppercase tracking-widest px-3 mb-2 font-bold flex items-center justify-between">
            <span>COMMAND MODULES</span>
            <Activity className="w-3 h-3 text-[#4B6F44]" />
          </div>

          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 transition-all border ${
                  active
                    ? 'bg-[#1E2E1B] border-[#4B6F44] text-[#F5F5F5] font-semibold'
                    : 'bg-transparent border-transparent text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#111111] hover:border-[#4B6F44]/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={active ? 'text-[#6B8E23]' : 'text-[#4B6F44]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 border ${
                      item.badge === '4'
                        ? 'bg-[#4A0E0E] border-[#D62828] text-[#D62828]'
                        : item.badge === 'AI'
                        ? 'bg-[#3D2E07] border-[#D4A017] text-[#D4A017]'
                        : 'bg-[#1E2E1B] border-[#4B6F44] text-[#6B8E23]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Tactical Footer Widget */}
        <div className="p-4 border-t border-[#4B6F44]/30 bg-[#050505] space-y-3 font-mono text-[11px]">
          <div className="p-2.5 bg-[#111111] border border-[#4B6F44]/30 space-y-1">
            <div className="flex items-center justify-between text-[#A0A0A0] text-[10px]">
              <span>ENCRYPTION LINK</span>
              <span className="text-[#2A9D8F]">SECURE</span>
            </div>
            <div className="flex items-center justify-between text-[#F5F5F5] font-bold">
              <span>SATCOM FEED</span>
              <span className="text-[#6B8E23] flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" /> 99.8%
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2 bg-[#111111] hover:bg-[#1E2E1B] border border-[#4B6F44]/40 text-[#A0A0A0] hover:text-[#F5F5F5] transition-all text-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </Link>
        </div>
      </aside>

      {/* Desktop Spacer */}
      <div className="hidden md:block w-64 shrink-0" />
    </>
  )
}

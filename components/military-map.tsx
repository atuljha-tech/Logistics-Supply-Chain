'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Shield } from 'lucide-react'

// Export types and constants for backwards compatibility across pages
export type { CommandPost } from './leaflet-military-map'
export { MILITARY_POSTS, SUPPLY_ROUTES } from './leaflet-military-map'

// Dynamically import Leaflet map with SSR disabled for Next.js App Router compatibility
const LeafletMilitaryMap = dynamic(
  () => import('./leaflet-military-map').then((mod) => mod.LeafletMilitaryMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] md:h-[580px] bg-[#030712] border border-emerald-500/30 rounded-xl flex flex-col items-center justify-center text-emerald-400 font-mono text-xs gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <span className="tracking-widest flex items-center gap-2">
          <Shield className="w-4 h-4 animate-pulse" />
          INITIALIZING LEAFLET GIS ENGINE...
        </span>
      </div>
    )
  }
)

export const MilitaryMap: React.FC<{ interactive?: boolean }> = ({ interactive = true }) => {
  return <LeafletMilitaryMap interactive={interactive} />
}

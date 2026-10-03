'use client'

import React, { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { Shield, Navigation, Layers, Maximize2, MapPin, Wind, Zap } from 'lucide-react'

export interface CommandPost {
  id: string
  name: string
  command: 'Northern' | 'Eastern' | 'Western' | 'Central'
  type: 'Depot' | 'FOB' | 'Airbase' | 'HQ'
  lat: number
  lng: number
  supplyHealth: number
  fuelReserve: number
  status: 'optimal' | 'warning' | 'critical'
  altitude?: string
  temp?: string
}

export const MILITARY_POSTS: CommandPost[] = [
  { id: 'HQ-DELHI', name: 'Army HQ New Delhi', command: 'Central', type: 'HQ', lat: 28.6139, lng: 77.2090, supplyHealth: 99, fuelReserve: 98, status: 'optimal', altitude: '216m', temp: '28°C' },
  { id: 'DEP-LEH', name: 'Leh Main Logistics Depot', command: 'Northern', type: 'Depot', lat: 34.1526, lng: 77.5771, supplyHealth: 88, fuelReserve: 72, status: 'warning', altitude: '3,500m', temp: '-4°C' },
  { id: 'FOB-SIACHEN', name: 'Siachen Glacier Base Alpha', command: 'Northern', type: 'FOB', lat: 35.4212, lng: 77.1095, supplyHealth: 64, fuelReserve: 42, status: 'critical', altitude: '5,400m', temp: '-18°C' },
  { id: 'AIR-UDHAMPUR', name: 'Udhampur Tactical Airbase', command: 'Northern', type: 'Airbase', lat: 32.9248, lng: 75.1432, supplyHealth: 94, fuelReserve: 91, status: 'optimal', altitude: '750m', temp: '16°C' },
  { id: 'FOB-KARGIL', name: 'Kargil Forward Operating Base', command: 'Northern', type: 'FOB', lat: 34.5539, lng: 76.1349, supplyHealth: 71, fuelReserve: 58, status: 'warning', altitude: '2,676m', temp: '-2°C' },
  { id: 'DEP-SILIGURI', name: 'Siliguri Strategic Logistics Hub', command: 'Eastern', type: 'Depot', lat: 26.7271, lng: 88.3953, supplyHealth: 92, fuelReserve: 89, status: 'optimal', altitude: '122m', temp: '24°C' },
  { id: 'FOB-TAWANG', name: 'Tawang Forward Outpost', command: 'Eastern', type: 'FOB', lat: 27.5861, lng: 91.8594, supplyHealth: 78, fuelReserve: 68, status: 'warning', altitude: '3,048m', temp: '4°C' },
  { id: 'DEP-JODHPUR', name: 'Jodhpur Logistics Command', command: 'Western', type: 'Depot', lat: 26.2389, lng: 73.0243, supplyHealth: 96, fuelReserve: 95, status: 'optimal', altitude: '231m', temp: '32°C' },
  { id: 'FOB-JAISALMER', name: 'Jaisalmer Desert Outpost Echo', command: 'Western', type: 'FOB', lat: 26.9157, lng: 70.9083, supplyHealth: 90, fuelReserve: 84, status: 'optimal', altitude: '225m', temp: '35°C' }
]

export const SUPPLY_ROUTES = [
  { from: 'HQ-DELHI', to: 'AIR-UDHAMPUR', status: 'active', risk: 8 },
  { from: 'AIR-UDHAMPUR', to: 'DEP-LEH', status: 'warning', risk: 42 },
  { from: 'DEP-LEH', to: 'FOB-KARGIL', status: 'active', risk: 28 },
  { from: 'FOB-KARGIL', to: 'FOB-SIACHEN', status: 'restricted', risk: 88 },
  { from: 'HQ-DELHI', to: 'DEP-SILIGURI', status: 'active', risk: 10 },
  { from: 'DEP-SILIGURI', to: 'FOB-TAWANG', status: 'warning', risk: 62 },
  { from: 'HQ-DELHI', to: 'DEP-JODHPUR', status: 'active', risk: 8 },
  { from: 'DEP-JODHPUR', to: 'FOB-JAISALMER', status: 'active', risk: 12 }
]

const HAZARD_ZONES = [
  { center: [34.8, 76.8], radius: 65000, label: 'BLIZZARD & AVALANCHE RISK', type: 'avalanche' },
  { center: [27.4, 91.2], radius: 45000, label: 'LANDSLIDE ADVISORY', type: 'landslide' }
]

export const LeafletMilitaryMap: React.FC<{ interactive?: boolean }> = ({ interactive = true }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [selectedPost, setSelectedPost] = useState<CommandPost>(MILITARY_POSTS[1])
  const [tileMode, setTileMode] = useState<'dark' | 'satellite'>('dark')
  const [showWeather, setShowWeather] = useState<boolean>(true)
  const [showVectors, setShowVectors] = useState<boolean>(true)
  const tileLayerRef = useRef<any>(null)
  const overlaysGroupRef = useRef<any>(null)
  const leafletModuleRef = useRef<any>(null)

  // Map Initialization & Dynamic Import of Leaflet (SSR Safe)
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return

    let isMounted = true

    const initMap = async () => {
      if (!leafletModuleRef.current) {
        const L = (await import('leaflet')).default
        leafletModuleRef.current = L
      }

      const L = leafletModuleRef.current
      if (!isMounted || !mapContainerRef.current) return

      // Initialize Map Instance if not created
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [30.5, 79.5],
          zoom: 5,
          zoomControl: false,
          attributionControl: false
        })

        L.control.zoom({ position: 'topright' }).addTo(map)
        mapInstanceRef.current = map
        overlaysGroupRef.current = L.layerGroup().addTo(map)
      }

      const map = mapInstanceRef.current

      // Update Base Tile Layer - 100% Free & Keyless OpenStreetMap & Esri Endpoints
      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current)
      }

      const tileUrl = tileMode === 'dark'
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

      const newTileLayer = L.tileLayer(tileUrl, {
        maxZoom: 18,
        subdomains: tileMode === 'dark' ? ['a', 'b', 'c'] : [],
        className: tileMode === 'dark' ? 'tactical-dark-map-tiles' : 'tactical-satellite-map-tiles'
      })
      newTileLayer.addTo(map)
      tileLayerRef.current = newTileLayer

      // Clear and redraw map overlays
      const overlayGroup = overlaysGroupRef.current
      if (overlayGroup) {
        overlayGroup.clearLayers()

        // Draw Supply Route Vectors (Polylines)
        if (showVectors) {
          SUPPLY_ROUTES.forEach((route) => {
            const fromPost = MILITARY_POSTS.find(p => p.id === route.from)
            const toPost = MILITARY_POSTS.find(p => p.id === route.to)

            if (fromPost && toPost) {
              const isCritical = route.status === 'restricted' || route.risk > 70
              const isWarning = route.status === 'warning'
              const strokeColor = isCritical ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981'

              const line = L.polyline(
                [[fromPost.lat, fromPost.lng], [toPost.lat, toPost.lng]],
                {
                  color: strokeColor,
                  weight: isCritical ? 3.5 : 2.5,
                  opacity: 0.9,
                  dashArray: isCritical ? '6, 6' : isWarning ? '8, 4' : undefined,
                }
              )

              line.bindTooltip(`Route: ${fromPost.name} ➔ ${toPost.name}<br/>Risk Index: ${route.risk}%`)
              overlayGroup.addLayer(line)
            }
          })
        }

        // Draw Weather Hazard Zones
        if (showWeather) {
          HAZARD_ZONES.forEach((hazard) => {
            const circle = L.circle(hazard.center as [number, number], {
              radius: hazard.radius,
              color: hazard.type === 'avalanche' ? '#ef4444' : '#f59e0b',
              fillColor: hazard.type === 'avalanche' ? '#ef4444' : '#f59e0b',
              fillOpacity: 0.15,
              weight: 1.5,
              dashArray: '4, 4'
            })
            circle.bindTooltip(`⚠️ ${hazard.label}`)
            overlayGroup.addLayer(circle)
          })
        }

        // Draw Command Post Custom SVG Markers
        MILITARY_POSTS.forEach((post) => {
          const isSelected = selectedPost.id === post.id
          const colorHex = post.status === 'critical' ? '#ef4444' : post.status === 'warning' ? '#f59e0b' : '#10b981'
          const badgeBg = post.status === 'critical' ? 'bg-red-950 text-red-400 border-red-500' : post.status === 'warning' ? 'bg-amber-950 text-amber-400 border-amber-500' : 'bg-emerald-950 text-emerald-400 border-emerald-500'

          // Custom HTML Marker Icon with SVG glow & pulsing ring
          const iconHtml = `
            <div class="relative group cursor-pointer flex items-center justify-center">
              <div class="absolute -inset-2 rounded-full opacity-60 animate-ping" style="background-color: ${colorHex}; filter: blur(4px);"></div>
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-125 ${isSelected ? 'ring-4 ring-cyan-400 scale-110' : ''}" style="background-color: #030712; border-color: ${colorHex};">
                <div class="w-2.5 h-2.5 rounded-full" style="background-color: ${colorHex};"></div>
              </div>
              <div class="absolute top-7 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono tracking-wide border shadow-md ${badgeBg} pointer-events-none">
                ${post.type}: ${post.name.split(' ')[0]}
              </div>
            </div>
          `

          const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-leaflet-div-icon',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          })

          const marker = L.marker([post.lat, post.lng], { icon: customIcon })

          // Popup details
          const popupContent = `
            <div class="p-3 bg-slate-950 border border-emerald-500/40 text-slate-100 font-mono text-xs rounded-lg shadow-2xl space-y-2 min-w-[220px]">
              <div class="flex items-center justify-between border-b border-emerald-500/30 pb-1.5">
                <span class="font-bold text-emerald-400 text-xs tracking-wider">${post.name}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded border uppercase font-semibold ${badgeBg}">${post.status}</span>
              </div>
              <div class="grid grid-cols-2 gap-1.5 text-[10px] text-slate-300">
                <div><span class="text-slate-500 block">SECTOR:</span> ${post.command} Command</div>
                <div><span class="text-slate-500 block">TYPE:</span> ${post.type}</div>
                <div><span class="text-slate-500 block">ALTITUDE:</span> ${post.altitude}</div>
                <div><span class="text-slate-500 block">TEMP:</span> ${post.temp}</div>
              </div>
              <div class="pt-1.5 border-t border-slate-800 flex justify-between text-[11px]">
                <span>Supply: <strong class="text-emerald-400">${post.supplyHealth}%</strong></span>
                <span>Fuel: <strong class="${post.fuelReserve < 50 ? 'text-red-400' : 'text-amber-400'}">${post.fuelReserve}%</strong></span>
              </div>
            </div>
          `

          marker.bindPopup(popupContent, {
            closeButton: false
          })

          marker.on('click', () => {
            if (interactive) {
              setSelectedPost(post)
            }
          })

          overlayGroup.addLayer(marker)
        })
      }
    }

    initMap()

    return () => {
      isMounted = false
    }
  }, [tileMode, showWeather, showVectors, selectedPost, interactive])

  const handleRecenter = () => {
    if (mapInstanceRef.current && leafletModuleRef.current) {
      const L = leafletModuleRef.current
      const bounds = L.latLngBounds(MILITARY_POSTS.map(p => [p.lat, p.lng]))
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] })
    }
  }

  return (
    <div className="relative w-full h-[520px] md:h-[580px] bg-[#030712] border border-emerald-500/40 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
      {/* Dynamic CSS for 100% Watermark-Free Tactical Dark Tiles */}
      <style jsx global>{`
        .tactical-dark-map-tiles {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) !important;
        }
        .tactical-satellite-map-tiles {
          filter: brightness(0.85) contrast(1.1) !important;
        }
      `}</style>

      {/* Top HUD Toolbar */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-slate-950/90 backdrop-blur-md border-b border-emerald-500/30 z-[1000] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div>
            <span className="text-slate-100 font-bold tracking-wider text-xs flex items-center gap-2">
              LIVE LEAFLET GIS TELEMETRY ENGINE
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-400 uppercase">
                Active Tactical Feed
              </span>
            </span>
          </div>
        </div>

        {/* Map Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTileMode(prev => prev === 'dark' ? 'satellite' : 'dark')}
            className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1.5 transition-all ${
              tileMode === 'satellite'
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {tileMode === 'dark' ? 'Dark HUD' : 'Satellite'}
          </button>

          <button
            onClick={() => setShowWeather(prev => !prev)}
            className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1.5 transition-all ${
              showWeather
                ? 'bg-amber-950 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 opacity-60'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            Weather Radar
          </button>

          <button
            onClick={() => setShowVectors(prev => !prev)}
            className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1.5 transition-all ${
              showVectors
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 opacity-60'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            Vectors
          </button>

          <button
            onClick={handleRecenter}
            className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-all"
            title="Reset Map View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Leaflet Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Selected Post Bottom Tactical Panel */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 bg-slate-950/95 backdrop-blur-md border border-emerald-500/50 p-4 rounded-lg shadow-2xl z-[1000] space-y-3">
        <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-100 font-bold text-xs uppercase tracking-wide">
              {selectedPost.name}
            </span>
          </div>
          <span
            className={`text-[9px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${
              selectedPost.status === 'critical'
                ? 'bg-red-950 border-red-500 text-red-400'
                : selectedPost.status === 'warning'
                ? 'bg-amber-950 border-amber-500 text-amber-400'
                : 'bg-emerald-950 border-emerald-500 text-emerald-400'
            }`}
          >
            {selectedPost.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[11px]">
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-slate-400 block text-[10px]">COMMAND SECTOR:</span>
            <span className="text-slate-200 font-semibold">{selectedPost.command} Command</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-slate-400 block text-[10px]">POST TYPE:</span>
            <span className="text-slate-200 font-semibold">{selectedPost.type}</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-slate-400 block text-[10px]">SUPPLY HEALTH:</span>
            <span className="text-emerald-400 font-bold text-xs">{selectedPost.supplyHealth}%</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-slate-400 block text-[10px]">FUEL RESERVES:</span>
            <span className={selectedPost.fuelReserve < 50 ? 'text-red-400 font-bold text-xs' : 'text-amber-400 font-bold text-xs'}>
              {selectedPost.fuelReserve}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-900">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" />
            LAT: {selectedPost.lat.toFixed(4)}, LNG: {selectedPost.lng.toFixed(4)}
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-400" />
            ALT: {selectedPost.altitude}
          </span>
        </div>
      </div>
    </div>
  )
}

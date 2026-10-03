'use client'

import React, { useState } from 'react'
import {
  Truck,
  Boxes,
  Radio,
  Activity,
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Signal
} from 'lucide-react'
import { MilitaryMap } from '@/components/military-map'

interface AssetTelemetry {
  id: string
  name: string
  type: 'Armored Truck' | 'Heavy Transport' | 'Fuel Tanker' | 'Helicopter'
  status: 'In Transit' | 'Staged' | 'Maintenance' | 'Critical Delay'
  location: string
  speed: string
  fuelLevel: number
  tirePressure: string
  engineTemp: string
  satcomLink: number
  cargoStatus: string
  coordinates: string
}

const ASSETS_LIST: AssetTelemetry[] = [
  {
    id: 'VEH-BRAVO-01',
    name: 'Convoy Lead Truck 6x6',
    type: 'Armored Truck',
    status: 'In Transit',
    location: 'Route Red-3 Pass Marker 42',
    speed: '38 km/h',
    fuelLevel: 84,
    tirePressure: '34 PSI (Nominal)',
    engineTemp: '88°C (Normal)',
    satcomLink: 99.8,
    cargoStatus: 'JP-8 Fuel Bladder Sealed',
    coordinates: '34°12\'08"N, 77°40\'12"E'
  },
  {
    id: 'VEH-ALPHA-04',
    name: 'Heavy Transport Transporter',
    type: 'Heavy Transport',
    status: 'In Transit',
    location: 'Zoji La Ridge Pass',
    speed: '28 km/h',
    fuelLevel: 91,
    tirePressure: '36 PSI (Nominal)',
    engineTemp: '92°C (Normal)',
    satcomLink: 98.4,
    cargoStatus: '155mm Ammunition Crates',
    coordinates: '34°18\'44"N, 75°22\'10"E'
  },
  {
    id: 'VEH-CHARLIE-08',
    name: 'High Altitude Tanker',
    type: 'Fuel Tanker',
    status: 'Critical Delay',
    location: 'Marker 142 Landslide Zone',
    speed: '0 km/h (Holding)',
    fuelLevel: 62,
    tirePressure: '32 PSI',
    engineTemp: '45°C (Idle)',
    satcomLink: 94.2,
    cargoStatus: 'High-Altitude Diesel Fuel',
    coordinates: '34°09\'14"N, 77°02\'50"E'
  }
]

export default function AssetTrackingPage() {
  const [activeTab, setActiveTab] = useState<'map' | 'timeline' | 'telemetry'>('telemetry')
  const [selectedAsset, setSelectedAsset] = useState<AssetTelemetry>(ASSETS_LIST[0])

  return (
    <div className="space-y-6 font-sans text-xs text-[#F5F5F5]">
      {/* Top Banner */}
      <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 mil-panel flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wider">
              REAL-TIME ASSET & CONVOY TELEMETRY
            </h1>
            <span className="px-2 py-0.5 bg-[#1E2E1B] border border-[#4B6F44] text-[10px] text-[#2A9D8F]">
              3,890 TELEMETRY NODES ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-[#A0A0A0] mt-0.5">
            Track military vehicles, resupply shipments, and IoT sensors with satellite link metrics and live GPS coordinates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['telemetry', 'map', 'timeline'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase border ${
                activeTab === tab
                  ? 'bg-[#4B6F44] border-[#6B8E23] text-[#F5F5F5]'
                  : 'bg-[#111111] border-[#4B6F44]/30 text-[#A0A0A0]'
              }`}
            >
              {tab} view
            </button>
          ))}
        </div>
      </div>

      {/* FOUR METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block uppercase">Tracked Vehicles</span>
          <span className="text-2xl font-extrabold text-[#F5F5F5]">428</span>
          <span className="text-[10px] text-[#2A9D8F] block">38 Active Convoys En-Route</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block uppercase">Tracked Shipments</span>
          <span className="text-2xl font-extrabold text-[#D4A017]">1,240</span>
          <span className="text-[10px] text-[#D4A017] block">Freight Containers & Bladders</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block uppercase">IoT Sensors</span>
          <span className="text-2xl font-extrabold text-[#2A9D8F]">3,890</span>
          <span className="text-[10px] text-[#2A9D8F] block">Active Telemetry Sensors</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-1">
          <span className="text-[10px] text-[#A0A0A0] block uppercase">Communication Status</span>
          <span className="text-2xl font-extrabold text-[#2A9D8F]">99.8%</span>
          <span className="text-[10px] text-[#2A9D8F] block">Encrypted SATCOM Link</span>
        </div>
      </div>

      {/* MAIN VIEW: MAP / TIMELINE / TELEMETRY */}
      {activeTab === 'map' && (
        <div className="space-y-3 font-mono">
          <MilitaryMap interactive={true} />
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="mil-panel p-6 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-4 font-mono">
          <span className="text-sm font-bold text-[#F5F5F5] uppercase block border-b border-[#4B6F44]/30 pb-2">
            CONVOY DISPATCH TIMELINE & CHECKPOINT CROSSINGS
          </span>
          <div className="space-y-4 relative border-l border-[#4B6F44]/40 pl-4 ml-2 text-xs">
            {[
              { time: '0430 ZULU', event: 'Convoy Alpha-1 (12 Transports) cleared Leh Main Depot exit checkpoint.', status: 'ok' },
              { time: '0515 ZULU', event: 'Convoy Bravo-4 crossed Pass Marker 42. Telemetry nominal.', status: 'ok' },
              { time: '0600 ZULU', event: 'Landslide detected at Marker 142. Convoy Charlie-8 halted by AI safety protocol.', status: 'critical' },
              { time: '0645 ZULU', event: 'BRO heavy equipment unit arrived at Marker 142 for route clearing.', status: 'warning' }
            ].map((ev, i) => (
              <div key={i} className="relative space-y-1">
                <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${ev.status === 'critical' ? 'bg-[#D62828]' : ev.status === 'warning' ? 'bg-[#D4A017]' : 'bg-[#2A9D8F]'}`} />
                <span className="text-[#6B8E23] font-bold block">{ev.time}</span>
                <p className="text-[#F5F5F5]">{ev.event}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'telemetry' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
          {/* Asset List Selector - 1 Col */}
          <div className="mil-panel p-4 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-3">
            <span className="text-xs font-bold text-[#F5F5F5] uppercase block border-b border-[#4B6F44]/30 pb-2">
              LIVE TRACKED ASSETS
            </span>
            <div className="space-y-2">
              {ASSETS_LIST.map((ast) => (
                <div
                  key={ast.id}
                  onClick={() => setSelectedAsset(ast)}
                  className={`p-3 border cursor-pointer transition-all space-y-1 ${
                    selectedAsset.id === ast.id
                      ? 'bg-[#1E2E1B] border-[#4B6F44] text-[#F5F5F5]'
                      : 'bg-[#111111] border-[#4B6F44]/20 text-[#A0A0A0] hover:bg-[#1E2E1B]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#6B8E23]">{ast.id}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 border ${
                        ast.status === 'Critical Delay'
                          ? 'bg-[#4A0E0E] text-[#D62828] border-[#D62828]'
                          : 'bg-[#1E2E1B] text-[#2A9D8F] border-[#4B6F44]'
                      }`}
                    >
                      {ast.status}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#F5F5F5] block">{ast.name}</span>
                  <span className="text-[10px] text-[#A0A0A0] block truncate">{ast.location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Telemetry Inspection Panel - 2 Cols */}
          <div className="lg:col-span-2 mil-panel p-6 bg-[#0A0A0A] border border-[#4B6F44]/40 space-y-6">
            <div className="flex items-center justify-between border-b border-[#4B6F44]/30 pb-3">
              <div>
                <span className="text-sm font-bold text-[#F5F5F5] uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#2A9D8F]" />
                  TELEMETRY INSPECTOR: {selectedAsset.id}
                </span>
                <span className="text-[10px] text-[#A0A0A0]">{selectedAsset.name} // {selectedAsset.type}</span>
              </div>
              <span className="text-xs text-[#2A9D8F] font-bold">SATCOM LINK: {selectedAsset.satcomLink}%</span>
            </div>

            {/* Grid of Telemetry Sensors */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
                <span className="text-[10px] text-[#A0A0A0] block">GPS COORDINATES</span>
                <span className="text-xs font-bold text-[#F5F5F5]">{selectedAsset.coordinates}</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
                <span className="text-[10px] text-[#A0A0A0] block">CURRENT SPEED</span>
                <span className="text-xs font-bold text-[#F5F5F5]">{selectedAsset.speed}</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
                <span className="text-[10px] text-[#A0A0A0] block">FUEL RESERVE</span>
                <span className="text-xs font-bold text-[#2A9D8F]">{selectedAsset.fuelLevel}% Tank</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
                <span className="text-[10px] text-[#A0A0A0] block">TIRE PRESSURE</span>
                <span className="text-xs font-bold text-[#F5F5F5]">{selectedAsset.tirePressure}</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
                <span className="text-[10px] text-[#A0A0A0] block">ENGINE TEMP</span>
                <span className="text-xs font-bold text-[#F5F5F5]">{selectedAsset.engineTemp}</span>
              </div>
              <div className="p-3 bg-[#111111] border border-[#4B6F44]/20 space-y-1">
                <span className="text-[10px] text-[#A0A0A0] block">CARGO INTEGRITY</span>
                <span className="text-xs font-bold text-[#2A9D8F]">{selectedAsset.cargoStatus}</span>
              </div>
            </div>

            {/* Live Telemetry Data Stream Log */}
            <div className="p-4 bg-[#050505] border border-[#4B6F44]/30 space-y-2">
              <span className="text-[10px] text-[#6B8E23] font-bold uppercase block flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#2A9D8F]" />
                LIVE IOT DATA STREAM FEED [LOG]
              </span>
              <div className="font-mono text-[10px] text-[#A0A0A0] space-y-1">
                <p>[06:12:04 ZULU] PING SATCOM #4490: Lat 34.202, Lon 77.670 - Altitude 14,200ft</p>
                <p>[06:12:09 ZULU] TEMP SENSOR: Engine block thermal readout 88°C - Nominal</p>
                <p>[06:12:14 ZULU] CARGO LOCK SENSOR: Tamper seal verified intact (AES-256 Key Match)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

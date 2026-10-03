import { Shipment, Alert, DashboardStats, AnalyticsData, UserProfile, AdminStats, UserDashboardStats, TrackingEvent } from './types'

export interface FullShipment {
  id: string
  tracking_id: string
  sender_name: string
  sender_phone?: string
  receiver_name: string
  receiver_phone?: string
  sender_address: string
  receiver_address: string
  sender_city: string
  receiver_city: string
  sender_pincode: string
  receiver_pincode: string
  package_type: string
  weight: number
  value?: number
  description?: string
  status: string
  current_location: string
  assigned_agent?: string
  vehicle_number?: string
  estimated_delivery: string
  created_at: string
  updated_at?: string
  route?: string[]
  alternate_route?: string[]
  events?: {
    id: string
    status: string
    location: string
    occurred_at: string
    description?: string
    agent_name?: string
  }[]
}

const INITIAL_SHIPMENTS: FullShipment[] = [
  {
    id: 'SHP-001',
    tracking_id: 'IND202601019823',
    sender_name: 'Rahul Sharma',
    receiver_name: 'Priya Verma',
    sender_address: '42 Nariman Point, Tech Tower',
    receiver_address: '88 Brigade Road, Sector 4',
    sender_city: 'Mumbai',
    receiver_city: 'Bangalore',
    sender_pincode: '400021',
    receiver_pincode: '560001',
    package_type: 'Electronics',
    weight: 450,
    value: 125000,
    description: 'High-precision telemetry modules & sensors',
    status: 'In Transit',
    current_location: 'Pune Transit Hub (NH-48)',
    assigned_agent: ' Vikram Singh',
    vehicle_number: 'MH-04-AB-9821',
    estimated_delivery: '2026-10-06',
    created_at: '2026-10-01T08:30:00Z',
    route: ['Mumbai', 'Pune', 'Satara', 'Kolhapur', 'Bangalore'],
    alternate_route: ['Mumbai', 'Navi Mumbai', 'Solapur', 'Hubli', 'Bangalore'],
    events: [
      { id: 'e1', status: 'Shipment Created', location: 'Mumbai Dispatch Facility', occurred_at: '2026-10-01 08:30', description: 'Package manifested and scanned into system' },
      { id: 'e2', status: 'In Transit', location: 'Mumbai-Pune Expressway', occurred_at: '2026-10-01 14:20', description: 'Departed Mumbai hub via express logistics vector' },
      { id: 'e3', status: 'In Transit', location: 'Pune Distribution Center', occurred_at: '2026-10-02 11:45', description: 'Sorting completed; departed on schedule' },
      { id: 'e4', status: 'Out for Delivery', location: 'Bangalore South Hub', occurred_at: '2026-10-03 09:10', description: 'Dispatched with final mile carrier' },
    ]
  },
  {
    id: 'SHP-002',
    tracking_id: 'IND202601024102',
    sender_name: 'Amit Patel',
    receiver_name: 'Sunil Kumar',
    sender_address: '15 CG Road, Commerce House',
    receiver_address: '204 Connaught Place, Block B',
    sender_city: 'Ahmedabad',
    receiver_city: 'Delhi',
    sender_pincode: '380009',
    receiver_pincode: '110001',
    package_type: 'Tactical Gear',
    weight: 320,
    value: 85000,
    description: 'All-terrain thermal insulation protective gear',
    status: 'In Transit',
    current_location: 'Jaipur Logistics Depot',
    assigned_agent: 'Rajesh Meena',
    vehicle_number: 'RJ-14-GA-4412',
    estimated_delivery: '2026-10-05',
    created_at: '2026-10-02T09:15:00Z',
    route: ['Ahmedabad', 'Udaipur', 'Jaipur', 'Gurgaon', 'Delhi'],
    alternate_route: ['Ahmedabad', 'Palanpur', 'Ajmer', 'Rewari', 'Delhi'],
    events: [
      { id: 'e1', status: 'Shipment Created', location: 'Ahmedabad Main Hub', occurred_at: '2026-10-02 09:15', description: 'Cargo loaded onto long-haul freighter' },
      { id: 'e2', status: 'In Transit', location: 'Udaipur Checkpoint', occurred_at: '2026-10-02 18:30', description: 'Checkpoint clearance verified' },
      { id: 'e3', status: 'In Transit', location: 'Jaipur Logistics Depot', occurred_at: '2026-10-03 10:20', description: 'Undergoing intermediate inspection' },
    ]
  },
  {
    id: 'SHP-003',
    tracking_id: 'IND202601037741',
    sender_name: 'Karan Malhotra',
    receiver_name: 'Deepak Joshi',
    sender_address: '12 Salt Lake Sector V',
    receiver_address: '77 Anna Salai, Mount Road',
    sender_city: 'Kolkata',
    receiver_city: 'Chennai',
    sender_pincode: '700091',
    receiver_pincode: '600002',
    package_type: 'Medical Supplies',
    weight: 280,
    value: 210000,
    description: 'Emergency temperature-sensitive pharmaceutical kits',
    status: 'Delivered',
    current_location: 'Chennai Central Distribution Base',
    assigned_agent: 'Senthil Nathan',
    vehicle_number: 'TN-09-CB-1102',
    estimated_delivery: '2026-10-03',
    created_at: '2026-09-28T07:00:00Z',
    updated_at: '2026-10-03T11:20:00Z',
    route: ['Kolkata', 'Bhubaneswar', 'Visakhapatnam', 'Vijayawada', 'Chennai'],
    events: [
      { id: 'e1', status: 'Shipment Created', location: 'Kolkata Cargo Terminal', occurred_at: '2026-09-28 07:00' },
      { id: 'e2', status: 'In Transit', location: 'Bhubaneswar Hub', occurred_at: '2026-09-29 13:30' },
      { id: 'e3', status: 'In Transit', location: 'Visakhapatnam Hub', occurred_at: '2026-09-30 15:45' },
      { id: 'e4', status: 'Out for Delivery', location: 'Chennai South Hub', occurred_at: '2026-10-02 08:00' },
      { id: 'e5', status: 'Delivered', location: 'Chennai Destination Site', occurred_at: '2026-10-03 11:20', description: 'Received and signed by D. Joshi' },
    ]
  },
  {
    id: 'SHP-004',
    tracking_id: 'IND202601048892',
    sender_name: 'Ananya Roy',
    receiver_name: 'Siddharth Rao',
    sender_address: '90 HITEC City, Phase 2',
    receiver_address: '14 Koregaon Park',
    sender_city: 'Hyderabad',
    receiver_city: 'Pune',
    sender_pincode: '500081',
    receiver_pincode: '411001',
    package_type: 'Aviation Fuel',
    weight: 1250,
    value: 450000,
    description: 'High-density fuel canisters for emergency fleet',
    status: 'Pending',
    current_location: 'Hyderabad Logistics Depot',
    assigned_agent: 'Ravi Teja',
    vehicle_number: 'TS-08-EV-9001',
    estimated_delivery: '2026-10-07',
    created_at: '2026-10-03T10:00:00Z',
    route: ['Hyderabad', 'Zaheerabad', 'Solapur', 'Indapur', 'Pune'],
    alternate_route: ['Hyderabad', 'Bidar', 'Gulbarga', 'Kurduvadi', 'Pune'],
    events: [
      { id: 'e1', status: 'Shipment Created', location: 'Hyderabad Dispatch Terminal', occurred_at: '2026-10-03 10:00', description: 'Order logged and awaiting dispatch approval' },
    ]
  },
  {
    id: 'SHP-005',
    tracking_id: 'IND202601053319',
    sender_name: 'Major R. K. Nair',
    receiver_name: 'Col. S. V. Thapa',
    sender_address: 'Leh Northern Logistics Hub',
    receiver_address: 'Siachen Forward Base Camp',
    sender_city: 'Leh',
    receiver_city: 'Siachen',
    sender_pincode: '194101',
    receiver_pincode: '194109',
    package_type: 'Tactical Gear',
    weight: 890,
    value: 380000,
    description: 'Cold weather survival modules & satellite communication units',
    status: 'In Transit',
    current_location: 'Khardung La Pass Post',
    assigned_agent: 'Subedar Tashi Dorje',
    vehicle_number: 'LA-01-MIL-409',
    estimated_delivery: '2026-10-04',
    created_at: '2026-10-02T06:00:00Z',
    route: ['Leh Base', 'South Pullu', 'Khardung La Pass', 'Nubra Valley', 'Siachen Base'],
    alternate_route: ['Leh Base', 'Agham', 'Shyok Route', 'Nubra Valley', 'Siachen Base'],
    events: [
      { id: 'e1', status: 'Shipment Created', location: 'Leh Northern Logistics Hub', occurred_at: '2026-10-02 06:00' },
      { id: 'e2', status: 'In Transit', location: 'South Pullu Post', occurred_at: '2026-10-02 12:30' },
      { id: 'e3', status: 'In Transit', location: 'Khardung La Pass Post', occurred_at: '2026-10-03 08:15', description: 'Navigating high altitude pass with snow escort' },
    ]
  }
]

// Storage key for persistent state during browser session
const STORAGE_KEY = 'sentinel_shipments_v1'

export function getStoredShipments(): FullShipment[] {
  if (typeof window === 'undefined') return INITIAL_SHIPMENTS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SHIPMENTS))
      return INITIAL_SHIPMENTS
    }
    return JSON.parse(raw)
  } catch {
    return INITIAL_SHIPMENTS
  }
}

export function saveStoredShipments(list: FullShipment[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.error('Failed to save to localStorage', e)
  }
}

export function getAllShipments(status?: string, search?: string): FullShipment[] {
  let list = getStoredShipments()
  if (status && status !== 'All') {
    list = list.filter(s => s.status.toLowerCase() === status.toLowerCase() || (status === 'In Transit' && s.status === 'in-transit'))
  }
  if (search && search.trim()) {
    const q = search.toLowerCase().trim()
    list = list.filter(s =>
      s.tracking_id.toLowerCase().includes(q) ||
      s.sender_name.toLowerCase().includes(q) ||
      s.receiver_name.toLowerCase().includes(q) ||
      (s.sender_city && s.sender_city.toLowerCase().includes(q)) ||
      (s.receiver_city && s.receiver_city.toLowerCase().includes(q)) ||
      (s.package_type && s.package_type.toLowerCase().includes(q))
    )
  }
  return list
}

export function getShipmentById(idOrTracking: string): FullShipment | null {
  const list = getStoredShipments()
  const q = idOrTracking.trim().toLowerCase()
  return list.find(s => s.id.toLowerCase() === q || s.tracking_id.toLowerCase() === q) || null
}

export function createShipment(data: Omit<FullShipment, 'id' | 'tracking_id' | 'status' | 'created_at' | 'current_location'>): FullShipment {
  const list = getStoredShipments()
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  const now = new Date()
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '')
  const trackingId = `IND${dateStr}${randomSuffix}`
  const id = `SHP-${String(list.length + 1).padStart(3, '0')}`

  const newShipment: FullShipment = {
    ...data,
    id,
    tracking_id: trackingId,
    status: 'Pending',
    current_location: `${data.sender_city || 'Origin'} Dispatch Hub`,
    created_at: now.toISOString(),
    route: [data.sender_city || 'Origin', 'Transit Hub Alpha', 'Transit Hub Bravo', data.receiver_city || 'Destination'],
    alternate_route: [data.sender_city || 'Origin', 'Bypass Highway', data.receiver_city || 'Destination'],
    events: [
      {
        id: `e-${Date.now()}`,
        status: 'Shipment Created',
        location: `${data.sender_city || 'Origin'} Hub`,
        occurred_at: now.toLocaleString('en-IN'),
        description: 'Shipment registered and pending carrier assignment.'
      }
    ]
  }

  list.unshift(newShipment)
  saveStoredShipments(list)
  return newShipment
}

export function updateShipment(id: string, updates: Partial<FullShipment>): FullShipment | null {
  const list = getStoredShipments()
  const idx = list.findIndex(s => s.id === id || s.tracking_id === id)
  if (idx === -1) return null

  const target = list[idx]
  const updated: FullShipment = {
    ...target,
    ...updates,
    updated_at: new Date().toISOString()
  }

  if (updates.status && updates.status !== target.status) {
    const newEvent = {
      id: `e-${Date.now()}`,
      status: updates.status,
      location: updates.current_location || target.current_location,
      occurred_at: new Date().toLocaleString('en-IN'),
      description: `Status updated to ${updates.status}`
    }
    updated.events = [...(target.events || []), newEvent]
  }

  list[idx] = updated
  saveStoredShipments(list)
  return updated
}

export function bulkUpdateShipments(ids: string[], status: string): number {
  const list = getStoredShipments()
  let updatedCount = 0

  const updatedList = list.map(s => {
    if (ids.includes(s.id) || ids.includes(s.tracking_id)) {
      updatedCount++
      const newEvents = [
        ...(s.events || []),
        {
          id: `e-${Date.now()}-${Math.random()}`,
          status,
          location: s.current_location,
          occurred_at: new Date().toLocaleString('en-IN'),
          description: `Bulk update: status set to ${status}`
        }
      ]
      return { ...s, status, events: newEvents, updated_at: new Date().toISOString() }
    }
    return s
  })

  saveStoredShipments(updatedList)
  return updatedCount
}

export function deleteShipment(id: string): boolean {
  let list = getStoredShipments()
  const initialLen = list.length
  list = list.filter(s => s.id !== id && s.tracking_id !== id)
  if (list.length !== initialLen) {
    saveStoredShipments(list)
    return true
  }
  return false
}

export function getMockStatistics() {
  const list = getStoredShipments()
  const total = list.length
  const pending = list.filter(s => s.status.toLowerCase() === 'pending').length
  const in_transit = list.filter(s => s.status.toLowerCase() === 'in transit' || s.status.toLowerCase() === 'in-transit').length
  const out_for_delivery = list.filter(s => s.status.toLowerCase() === 'out for delivery').length
  const delivered = list.filter(s => s.status.toLowerCase() === 'delivered').length
  const delivered_today = delivered > 0 ? Math.min(delivered, 3) : 0
  const created_this_month = total
  const total_value = list.reduce((acc, s) => acc + (s.value || 50000), 0)
  const total_weight = list.reduce((acc, s) => acc + (s.weight || 100), 0)

  return {
    total,
    pending,
    in_transit,
    out_for_delivery,
    delivered,
    delivered_today,
    created_this_month,
    total_value,
    total_weight
  }
}

export function getMockRiskData(id: string) {
  const s = getShipmentById(id)
  const isHighRisk = id === 'SHP-004' || id === 'SHP-005'
  return {
    shipmentId: id,
    riskScore: isHighRisk ? 78 : (s?.status === 'Delivered' ? 8 : 34),
    riskLevel: isHighRisk ? 'high' : (s?.status === 'Delivered' ? 'low' : 'medium') as 'low' | 'medium' | 'high',
    weatherImpact: isHighRisk ? 68 : 22,
    trafficImpact: isHighRisk ? 82 : 41,
    weatherCondition: isHighRisk ? 'Severe Icing & Blizzard Risk at Pass' : 'Clear skies, mild crosswinds',
    trafficType: isHighRisk ? 'Heavy Convoy Stagnation at Mountain Checkpoint' : 'Normal Highway Flow',
  }
}

export function getMockOptimizationData(id: string) {
  const s = getShipmentById(id)
  return {
    shipmentId: id,
    originalRoute: s?.route || ['Mumbai', 'Pune', 'Satara', 'Bangalore'],
    optimizedRoute: s?.alternate_route || ['Mumbai', 'Bypass Corridor 4', 'Express Link', 'Bangalore'],
    timeSaved: 4.2,
    costSaved: 18500,
    riskReduction: 42,
    confidence: 96.8,
    distance: '940 km (28 km shorter)',
  }
}

export function getMockAIRoute(id: string) {
  const s = getShipmentById(id)
  return {
    recommended_route: (s?.alternate_route || ['Mumbai', 'Bypass Corridor 4', 'Express Link', 'Bangalore']).join(' → '),
    reason: `Predictive model analyzed real-time weather vectors and convoy traffic density. Rerouting via ${s?.alternate_route?.[1] || 'Bypass Corridor'} reduces exposure to mountain pass bottlenecks and saves approximately 4.2 transit hours.`,
    estimated_delay_hours: 1.5,
    risk_level: 'low' as 'low' | 'medium' | 'high',
    suggestions: [
      'Pre-clear toll gates using automated Sentinel RFID tags.',
      'Maintain convoy spacing of 150m during high altitude transit.',
      'Check thermal tire pressure at intermediate depot checkpoint.'
    ],
    weather: {
      condition: 'Clear / Mild Fog',
      temperature: 14,
      rainfall: 0,
      windSpeed: 18,
      visibility: 9.5,
      storm: false,
    },
    source: 'Gemini AI Tactical Optimizer'
  }
}

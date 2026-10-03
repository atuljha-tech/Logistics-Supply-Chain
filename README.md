# Sentinel Supply 🛡️⚡
### Military Logistics & Predictive Supply Chain Operating System

<div align="center">
  <p align="center">
    <strong>Sentinel Supply</strong> is a high-tech tactical logistics command platform built for real-time fleet telemetry, predictive supply chain forecasting, GIS route optimization, and forward-operating depot management.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-11-black?style=for-the-badge&logo=framer" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Recharts-2.12-22B5BF?style=for-the-badge" alt="Recharts" />
    <img src="https://img.shields.io/badge/Mock_Service_Engine-Active-059669?style=for-the-badge" alt="Mock Service Engine" />
  </p>
</div>

---

## 🎖️ Overview

**Sentinel Supply** transforms reactive logistics into an intelligent predictive supply chain. Engineered with military HUD aesthetics, tactical glassmorphism, real-time map telemetry, and a zero-dependency mock engine, Sentinel Supply provides commanders and operators with complete operational readiness and asset visibility.

---

## ✨ Key Features

### 🎛️ Command Dashboards & Operations Control
- **Executive Command Center:** Real-time DEFCON operational readiness, supply health indexes, active convoy statuses, and high-risk pass advisories.
- **Operator Dashboard:** Dedicated tracking, personal shipment histories, speed-of-action shortcuts, and performance metrics.
- **Admin Control Panel:** Manage users, bulk-update shipment vectors, inspect system uptime, and approve route overrides.

### 🗺️ GIS Route Optimization & Tactical Map Engine
- **Interactive Theater Map:** Vector paths connecting hubs from Leh to Siachen, Mumbai, Bangalore, and Delhi.
- **Weather & Pass Hazard Radar:** Real-time terrain elevation analysis, blizzard warnings, mudslide alerts, and temperature telemetry.
- **Route Optimization Engine:** Calculates alternate bypass routes, estimating hours saved, fuel conservation, and risk reduction percentages.

### 🤖 Predictive Intelligence Advisor
- **AI Route Analysis Engine:** Real-time analysis of weather impact, traffic bottlenecks, and route risk scores.
- **Tactical Copilot Assistant:** Interactive natural-language command drawer pre-loaded with forward logistics queries (fuel demand, convoy schedules, shortage forecasts).

### 📦 Complete Asset Management & Tracking
- **Interactive Timeline Tracking:** Step-by-step cargo movement logs with timestamped location scanning.
- **CSV Data Export:** One-click CSV exports for audits, reporting, and shipment manifests.
- **Self-Contained Mock Data Store:** Pre-seeded with realistic military logistics data and fallback in-memory/localStorage state.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Animations:** Framer Motion
- **Visualizations & Analytics:** Recharts
- **Icons:** Lucide React
- **Data Engine:** Standalone `lib/mock-service.ts` for instant zero-backend presentation mode

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atuljha-tech/Logistics-Supply-Chain.git
   cd Logistics-Supply-Chain
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server (runs on `http://localhost:3000`):**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Repository Architecture

```
├── app/
│   ├── page.tsx               # Main Portal & Command Intelligence Landing Page
│   ├── dashboard/             # Command Center, GIS, Inventory, Forecasting & Analytics
│   ├── logistics/             # Logistics Hub, Create Shipment & Detail Views
│   ├── supply-chain/          # Supply Chain Detail & AI Route Analysis
│   ├── admin/                 # Administrator Management & Approval Queues
│   └── user-dashboard/        # Operator Shipments, Tracking & Performance
├── components/
│   ├── map-background.tsx     # Tactical Background Overlay with public/bg.webp
│   ├── military-map.tsx       # Canvas/SVG Military GIS Telemetry Map
│   ├── ai-copilot.tsx         # Predictive Intelligence Drawer
│   ├── flip-card.tsx          # 3D Tactical Flip Cards
│   └── performance-ring.tsx   # Operational Accuracy Indicators
├── lib/
│   ├── mock-service.ts        # Standalone Mock Data Store & Persistence Engine
│   ├── data.ts                # Static Telemetry Datasets & Metrics
│   └── types.ts               # Core TypeScript Interfaces
└── public/
    └── bg.webp                # Command Center Background Imagery
```

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

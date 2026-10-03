import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google'
import { MapBackground } from '@/components/map-background'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-pepi-thin'
})
const inter = Inter({ 
  subsets: ['latin'], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-biotif-pro'
})
const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ["400", "500", "600"],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'Sentinel Supply | AI-Powered Predictive Logistics Command System',
  description: 'Transforming reactive military logistics into an intelligent predictive supply chain capable of forecasting demand, preventing shortages, optimizing resupply missions and maintaining operational readiness.',
  keywords: [
    'Sentinel Supply',
    'Military Logistics',
    'Predictive Supply Chain',
    'Command Center',
    'GIS Route Optimization',
    'Asset Tracking',
    'Defense Intelligence'
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark scroll-smooth ${spaceGrotesk.variable} ${inter.variable} ${ibmMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-[#050505] text-[#F5F5F5] overflow-x-hidden selection:bg-[#4B6F44]/30 selection:text-[#F5F5F5]"
      >
        <MapBackground />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

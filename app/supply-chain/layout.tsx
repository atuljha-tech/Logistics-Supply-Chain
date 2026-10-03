import React from 'react'
import { Sidebar } from '@/components/sidebar'
import { TopBar } from '@/components/top-bar'

export const metadata = {
  title: 'Forward Supply Chain | Sentinel Supply',
  description: 'AI-powered predictive military supply chain route optimization',
}

export default function SupplyChainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Sidebar />
      <TopBar title="Forward Supply Chain" />
      <main className="md:ml-64 pt-20 pb-8 px-4 md:px-6">
        {children}
      </main>
    </div>
  )
}

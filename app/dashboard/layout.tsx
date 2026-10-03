import React from 'react'
import { Sidebar } from '@/components/sidebar'
import { TopBar } from '@/components/top-bar'

export const metadata = {
  title: 'Command Center | Sentinel Supply',
  description: 'AI-Powered Military Logistics & Forward Supply Chain Operating System',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#4B6F44]/30">
      <Sidebar />
      <TopBar title="Command Center" />
      <main className="md:ml-64 pt-20 pb-8 px-4 md:px-6">
        {children}
      </main>
    </div>
  )
}

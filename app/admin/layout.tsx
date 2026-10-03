import React from 'react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { AdminTopBar } from '@/components/admin-top-bar'

export const metadata = {
  title: 'Admin Command | Sentinel Supply',
  description: 'Administrative military logistics command panel',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <AdminSidebar />
      <AdminTopBar />
      <main className="md:ml-64 pt-20 pb-8 px-4 md:px-6">
        {children}
      </main>
    </div>
  )
}

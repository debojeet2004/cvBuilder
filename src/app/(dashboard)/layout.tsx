import React from 'react'
import { AppSidebar } from '@/app/(dashboard)/_components/dashboardSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'


export const metadata = {
    title: 'Dashboard',
    description: 'Dashboard',
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

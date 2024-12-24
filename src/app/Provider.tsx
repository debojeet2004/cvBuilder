import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'
import React from 'react'

function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
        </ThemeProvider>
    )
}

export default AppProvider
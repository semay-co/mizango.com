import AdminLayout from '@/layout/admin'
import AuthProvider from '@/providers/auth'
import '@/styles/globals.css'

import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'MizanGo',
  description: 'MizanGo',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  userScalable: false,
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  )
}

export default RootLayout

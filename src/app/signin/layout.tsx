import SignedOutLayout from '@/layout/signed-out'
import '@/styles/globals.css'

import { Metadata, Viewport } from 'next'
import { SessionProvider } from 'next-auth/react'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SignedOutLayout>{children}</SignedOutLayout>
}

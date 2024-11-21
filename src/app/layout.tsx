import '@/styles/globals.css'

import { Metadata, Viewport } from 'next'
import Providers from './providers'

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
  return (
    <html lang='en'>
      <body className='dark'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

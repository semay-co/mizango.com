'use client'
import Logo from '@/components/logo'
import Link from 'next/link'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

const MainLayout = ({ children, description, title }: MainLayoutProps) => {
  return (
    <div>
      <div>
        <title>{title || 'MizanGo'}</title>
        <meta name='description' content={description || 'MizanGo'} />
        <link rel='icon' href='/favicon.ico' />
      </div>
      <div className='main-layout'>
        <Link href='/'>
          <Logo height={30} />
        </Link>
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout

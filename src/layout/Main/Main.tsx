import Logo from '@app/components/logo/Logo'
import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import Style from './Main.style'

interface MainLayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

const MainLayout = ({ children, description, title }: MainLayoutProps) => {
  return (
    <Style>
      <Head>
        <title>{title || 'MizanGo'}</title>
        <meta name='description' content={description || 'MizanGo'} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='main-layout'>
        <Link href='/'>
          <Logo height={30} />
        </Link>
        <div className='content'>{children}</div>
      </div>
    </Style>
  )
}

export default MainLayout

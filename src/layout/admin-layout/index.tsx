'use client'

import Loading from '@/components/loading'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Avatar } from '@radix-ui/react-avatar'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, redirect } from 'next/navigation'
import { CenterLayout } from '../../components/center-layout'
import { useEffect } from 'react'
import router from 'next/router'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MenuIcon } from 'lucide-react'
import { FaChartLine, FaList } from 'react-icons/fa'

interface Props {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const { data, status } = useSession()
  const path = usePathname()

  if (status === 'loading') {
    return (
      <CenterLayout>
        <Loading />
      </CenterLayout>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <CenterLayout>
        <Card>
          <CardHeader className='flex justify-center'>
            <Logo height={40} />
          </CardHeader>
          <CardContent>
            <h2 className='mb-3 py-4 text-center uppercase'>Signed Out</h2>
            <div className='flex justify-stretch'>
              <Link
                className='border-gray-600 px-4 py-2 border rounded-md w-full font-bold text-center'
                href={'/signin'}
              >
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </CenterLayout>
    )
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href={`/admin`}>
            <Logo height={40} />
          </Link>
        </SidebarHeader>
        <SidebarContent className='p-0'>
          <SidebarGroup className='p-0'>
            <Link
              className={`py-4 px-4 flex gap-3 items-center uppercase ${
                path === '/admin' ? 'bg-black' : ''
              }`}
              href={'/admin'}
            >
              <FaChartLine />
              Dashboard
            </Link>
            <Link
              className={`py-4 px-4 flex gap-3 items-center uppercase ${
                path === '/admin/records' ? 'bg-black' : ''
              }`}
              href={'/admin/records'}
            >
              <FaList />
              Records
            </Link>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Avatar />
          <span>{data?.user?.name}</span>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </SidebarFooter>
      </Sidebar>
      <div className='px-3 w-full'>
        <SidebarTrigger className='flex items-center gap-3 mt-2 text-lg'>
          <MenuIcon size={30} />
          <span className='text-slate-400 text-sm'>MENU</span>
        </SidebarTrigger>
        {children}
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout

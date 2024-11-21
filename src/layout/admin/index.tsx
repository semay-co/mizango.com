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
import { useRouter, usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const { data, status } = useSession()
  const router = useRouter()
  const path = usePathname()

  if (status === 'loading') {
    return (
      <div className='fixed justify-center items-center grid w-full h-full'>
        <Loading />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/signin')
    return (
      <div className='fixed justify-center items-center grid w-full h-full'>
        <span>UNAUTHENTICATED!</span>
      </div>
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
              className={`py-3 px-4 uppercase ${
                path === '/admin' ? 'bg-black' : ''
              }`}
              href={'/admin'}
            >
              Dashboard
            </Link>
            <Link
              className={`py-3 px-4 uppercase ${
                path === '/admin/records' ? 'bg-black' : ''
              }`}
              href={'/admin/records'}
            >
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
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout

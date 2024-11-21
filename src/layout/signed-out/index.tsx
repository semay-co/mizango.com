'use client'

import { CenterLayout } from '@/components/center-layout'
import Loading from '@/components/loading'
import Logo from '@/components/logo'
import { signOut, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

const SignedOutLayout = ({ children }: Props) => {
  const { status } = useSession()

  if (status === 'loading') {
    return (
      <CenterLayout>
        <Loading />
      </CenterLayout>
    )
  }

  if (status === 'authenticated') {
    redirect('/admin')
  }

  return (
    <div>
      <CenterLayout>{children}</CenterLayout>
    </div>
  )
}

export default SignedOutLayout

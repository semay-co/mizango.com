'use client'

import Loading from '@/components/loading'
import Logo from '@/components/logo'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

const SignedOutLayout = ({ children }: Props) => {
  const { data, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className='fixed justify-center items-center grid w-full h-full'>
        <Loading />
      </div>
    )
  }

  if (status === 'authenticated') {
    router.push('/admin')
    return (
      <div className='fixed justify-center items-center grid w-full h-full'>
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <div className='header'>
        <div>
          <Logo height={20} />
        </div>
        <div className='account-info'>
          <span>{(data as any)?.user?.name}</span>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default SignedOutLayout

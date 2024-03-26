import { Logo } from '@app/components/logo'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Styled from './style'

interface Props {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const { data, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/admin/signin')
    return <></>
  }

  return (
    <Styled>
      <div className='header'>
        <div>
          <Logo height={20} />
        </div>
        <div className='account-info'>
          <span>{data?.user?.name}</span>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
      <div>{children}</div>
    </Styled>
  )
}

export default AdminLayout

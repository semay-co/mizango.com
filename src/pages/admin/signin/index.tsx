import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useRef } from 'react'

const AdminSignInPage = () => {
  const { status } = useSession()

  const router = useRouter()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    usernameRef.current?.value
    passwordRef.current?.value
  }, [])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'authenticated') {
    router.push('/admin/report')
    return <></>
  }

  const handleSignIn = async (ev: FormEvent) => {
    ev.preventDefault()

    const username = (usernameRef.current?.value || '').trim()
    const password = passwordRef.current?.value

    if (!username || !password) {
      alert('Please enter username and password')
      return
    }

    try {
      await signIn('credentials', { username, password })
      router.push('/admin/report')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={handleSignIn}
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        <h1>Sign In</h1>

        {router.query.error && (
          <div
            style={{
              color: 'red',
              marginBottom: '1rem',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
            }}
          >
            {router.query.error}
          </div>
        )}
        <div>
          <input
            ref={usernameRef}
            type='text'
            name='username'
            placeholder='Username'
          />
        </div>
        <div>
          <input
            ref={passwordRef}
            type='password'
            name='password'
            placeholder='Password'
          />
        </div>
        <div>
          <button type='submit'>Sign In</button>
        </div>
      </form>
    </div>
  )
}

export default AdminSignInPage

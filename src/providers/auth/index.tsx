import { SessionProvider, SessionProviderProps } from 'next-auth/react'

const AuthProvider = ({ children, session }: SessionProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthProvider

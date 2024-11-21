import api from '@/state/api'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import ThemeProvider from '../theme/theme.provider'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ApiProvider api={api}>
      <SessionProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SessionProvider>
    </ApiProvider>
  )
}

export default AppProvider

import { ReactNode } from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components'
import DarkTheme from '@/themes/dark/dark.theme'
import GlobalStyle from '@/styles/global.style'

interface StyleProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: StyleProviderProps) => {
  return (
    <StyledProvider theme={DarkTheme}>
      <GlobalStyle />
      {children}
    </StyledProvider>
  )
}

export default ThemeProvider

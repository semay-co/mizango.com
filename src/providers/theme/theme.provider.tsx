import { ReactNode } from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components'
import DarkTheme from '@app/themes/dark/dark.theme'
import GlobalStyle from '@app/styles/global.style'

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

import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import lightTheme from '../styles/themes/lightTheme'
import darkTheme from '../styles/themes/darkTheme'

export const ThemeContext = React.createContext(null)

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    let darkVar = !dark
    setDark(darkVar)
  }

  const value = useMemo(
    () => ({
      dark,
      toggleDark,
    }),
    [dark]
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={dark ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

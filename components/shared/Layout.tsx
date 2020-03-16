import * as React from 'react'
import styled from 'styled-components'

import { Navbar } from '../Navbar'

import { ThemeProvider } from '../../context/ThemeProvider'

export const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  )
}

// Styles
const Wrapper = styled.div`
  min-height: 100%;
`

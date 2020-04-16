import * as React from 'react'
import styled from 'styled-components'

import { Footer } from '../shared/Footer'

import { ThemeProvider } from '../../context/ThemeProvider'

export const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <Wrapper>{children}</Wrapper>
      {/* <Footer white /> */}
    </ThemeProvider>
  )
}

// Styles
const Wrapper = styled.div`
  min-height: 100%;
`

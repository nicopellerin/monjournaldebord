import * as React from 'react'
import styled from 'styled-components'

import { Navbar } from '../Navbar'
import { Sidebar } from '../Sidebar'

import { ThemeProvider } from '../../context/ThemeProvider'

export const ProfilLayout: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <Navbar />
      <Wrapper>
        <Sidebar />
        <MainWrapper>{children}</MainWrapper>
      </Wrapper>
    </ThemeProvider>
  )
}

// Styles
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;

  @media (max-width: 1500px) {
    grid-template-columns: 275px 1fr;
  }
`

const MainWrapper = styled.main`
  min-height: 100%;
  overflow: auto;
`

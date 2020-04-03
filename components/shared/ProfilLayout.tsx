import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { useMedia } from 'react-use-media'

import { Navbar } from '../Navbar'
import { Sidebar } from '../Sidebar'
import { NavbarMobile } from '../NavbarMobile'

import { Footer } from './Footer'

import { ThemeProvider } from '../../context/ThemeProvider'
import { JournalContext } from '../../context/JournalProvider'

export const ProfilLayout: React.FC = ({ children }) => {
  const isDesktop = useMedia({
    minWidth: 1367,
  })

  const { journals } = useContext(JournalContext)

  const hasJournals = journals.length > 0

  return (
    <ThemeProvider>
      {isDesktop && <Navbar />}
      {!isDesktop && <NavbarMobile />}
      <Wrapper>
        {isDesktop && <Sidebar />}
        <MainWrapper>
          {children}
          <Footer profil />
        </MainWrapper>
      </Wrapper>
    </ThemeProvider>
  )
}

// Styles
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100%;

  @media (max-width: 1500px) {
    grid-template-columns: 275px 1fr;
  }

  @media (max-width: 1366px) {
    display: flex;
    flex-direction: column;
  }
`

const MainWrapper = styled.main`
  min-height: 100%;
  overflow: auto;

  @media (max-width: 500px) {
    overflow: visible;
  }
`

import * as React from 'react'
import { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMedia } from 'react-use-media'

import { Navbar } from '../Navbar'
import { Sidebar } from '../Sidebar'
import { NavbarMobile } from '../NavbarMobile'
import { useRouter } from 'next/router'

import { Footer } from './Footer'

import { ThemeProvider } from '../../context/ThemeProvider'

export const ProfilLayout: React.FC = ({ children }) => {
  const isDesktop = useMedia({
    minWidth: 1367,
  })

  const {
    query: { id },
  } = useRouter()

  const wrapperRef = useRef(null)

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo(0, 0)
    }
  }, [id])

  return (
    <ThemeProvider>
      {isDesktop && <Navbar />}
      {!isDesktop && <NavbarMobile />}
      <Wrapper>
        {isDesktop && <Sidebar />}
        <MainWrapper ref={wrapperRef}>
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
  grid-template-columns: 300px 1fr;
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

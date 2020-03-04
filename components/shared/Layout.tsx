import React from 'react'
import styled from 'styled-components'

import { Navbar } from '../Navbar'
import { Sidebar } from '../Sidebar'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <Sidebar />
        <MainWrapper>{children}</MainWrapper>
      </Wrapper>
    </>
  )
}

// Styles
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
`

const MainWrapper = styled.main`
  height: 100%;
`

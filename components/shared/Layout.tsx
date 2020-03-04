import React from 'react'
import styled from 'styled-components'

import { Navbar } from '../Navbar'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </>
  )
}

// Styles
const Wrapper = styled.div`
  min-height: 100%;
`

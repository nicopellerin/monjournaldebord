import * as React from "react"
import styled from "styled-components"

import { Logo } from "./Logo"

export const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  width: 100%;
  background: darkviolet;
  height: 7.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
`

const LogoWrapper = styled.div`
  width: 300px;
  text-align: center;
`

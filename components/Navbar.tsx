import * as React from 'react'
import styled from 'styled-components'

import { Logo } from './Logo'
import { User } from './User'
import { NavbarSearch } from './NavbarSearch'

export const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <RightWrapper>
        <NavbarSearchWrapper>
          <NavbarSearch />
        </NavbarSearchWrapper>
        <UserWrapper>
          <User />
        </UserWrapper>
      </RightWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  width: 100%;
  background: white;
  height: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
`

const LogoWrapper = styled.div`
  width: 300px;
  text-align: center;
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`

const NavbarSearchWrapper = styled.div`
  margin-right: 4rem;
`

const UserWrapper = styled.div`
  margin-right: 7rem;
`

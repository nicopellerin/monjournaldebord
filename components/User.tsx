import React, { useState } from "react"
import styled from "styled-components"

export const User: React.FC = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <Wrapper onClick={() => setToggle(prevState => !prevState)}>
        <img src="/default-profile.png" alt="profile" />
        {toggle && <UserDropdown />}
      </Wrapper>
    </>
  )
}

const UserDropdown: React.FC = () => {
  return (
    <DropdownWrapper>
      <DropdownItem>Se déconnecter</DropdownItem>
    </DropdownWrapper>
  )
}

// Styles
const Wrapper = styled.div`
  position: relative;

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
`

const DropdownWrapper = styled.div`
  position: absolute;
  width: 13rem;
  bottom: -5.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 1.3rem 1.5rem;
  text-align: center;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: -1rem;
    transform: translateX(-50%) rotate(180deg);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
  }
`

const DropdownItem = styled.span`
  display: block;
  font-size: 1.4rem;
`

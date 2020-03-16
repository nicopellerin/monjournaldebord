import * as React from 'react'
import { useState, useContext } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSignOutAlt } from 'react-icons/fa'
import cookies from 'js-cookie'
import Router from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'

import { useClickOutside } from '../hooks/useClickOutside'

import { UserContext } from '../context/UserProvider'

interface Props {
  username: string
}

export const User: React.FC<Props> = ({ username }) => {
  const [toggle, setToggle] = useState(false)

  const node = useClickOutside(setToggle)

  return (
    <Wrapper ref={node}>
      <UserInfoWrapper>
        <UsernameText>{username}</UsernameText>
        <UserImage
          src="/default-profile.png"
          alt="profile"
          onClick={() => setToggle(prevState => !prevState)}
        />
        {toggle && <UserDropdown />}
      </UserInfoWrapper>
    </Wrapper>
  )
}

const UserDropdown: React.FC = () => {
  const client = useApolloClient()

  const { logout, email } = useContext(UserContext)

  return (
    <AnimatePresence>
      <DropdownWrapper
        initial={{ opacity: 0, y: -10, x: '-50%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <DropdownItem>
          <UserEmail>{email}</UserEmail>
        </DropdownItem>
        <DropdownItem
          style={{ cursor: 'pointer' }}
          onClick={() => {
            cookies.remove('token_login')
            client.resetStore()
            logout()
            Router.push('/connexion')
          }}
        >
          <FaSignOutAlt style={{ marginRight: 5 }} />
          Se déconnecter
        </DropdownItem>
      </DropdownWrapper>
    </AnimatePresence>
  )
}

// Styles
const Wrapper = styled.div`
  position: relative;
`

const DropdownWrapper = styled(motion.div)`
  position: absolute;
  width: 15rem;
  bottom: -9.5rem;
  left: 78%;
  background: white;
  padding: 1.3rem 1.5rem;
  text-align: center;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &:after {
    content: '';
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

  & > :not(:last-child) {
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }
`

const DropdownItem = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const UsernameText = styled.span`
  display: block;
  font-size: 1.6rem;
  margin-right: 2rem;
  cursor: initial;
`

const UserEmail = styled.span`
  color: #999;
  pointer-events: none;
`

const UserImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 2px;
`

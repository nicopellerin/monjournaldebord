import * as React from 'react'
import { useState, useContext } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSignOutAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import Link from 'next/link'
import { useMedia } from 'react-use-media'

import { useClickOutside } from '../../hooks/useClickOutside'

import { UserContext } from '../../context/UserProvider'
import { JournalContext } from '../../context/JournalProvider'

import { maxLength } from '../../utils/maxLength'
import { defaultProfile } from '../../utils/imagesBase64'

export const User: React.FC = () => {
  const [toggle, setToggle] = useState(false)

  const { username, avatar } = useContext(UserContext)
  const { journals } = useContext(JournalContext)

  const isDesktop = useMedia({
    minWidth: 1367,
  })

  const node = useClickOutside(setToggle)

  const hasJournals = journals.length > 0

  return (
    <Wrapper ref={node}>
      <UserInfoWrapper>
        <Link href={hasJournals ? '/profil/info' : '/profil'}>
          <UsernameText>
            <span style={{ marginRight: 5 }}>{username}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9">
              <path d="M 5 8.8 L 0.67 1.3 L 9.33 1.3 Z" fill="#440061"></path>
            </svg>
          </UsernameText>
        </Link>
        <div style={{ position: 'relative' }}>
          <UserImage
            src={avatar ? avatar : defaultProfile}
            alt="profile"
            onClick={() =>
              isDesktop ? setToggle((prevState) => !prevState) : null
            }
          />
          {toggle && <UserDropdown />}
        </div>
      </UserInfoWrapper>
    </Wrapper>
  )
}

const UserDropdown: React.FC = () => {
  const client = useApolloClient()
  const router = useRouter()

  const { logoutAction, email } = useContext(UserContext)

  async function signoutUser() {
    await client.resetStore()
    await logoutAction()
    router.push('/connexion')
  }

  return (
    <AnimatePresence>
      <DropdownWrapper
        initial={{ opacity: 0, y: -10, x: '-50%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <DropdownItem>
          <UserEmail>{maxLength(email, 16)}</UserEmail>
        </DropdownItem>
        <DropdownItem style={{ cursor: 'pointer' }} onClick={signoutUser}>
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
  left: 50%;
  background: white;
  padding: 1.3rem 1.5rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
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
  color: #440061;
  font-size: 1.6rem;
  margin-right: 2rem;
  cursor: pointer;

  @media (max-width: 500px) {
    display: none;
  }
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

  @media (max-width: 500px) {
    width: 36px;
    height: 36px;
  }
`

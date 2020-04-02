import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaUserAlt, FaMoon, FaSun } from 'react-icons/fa'

import { Logo } from './Logo'
import { User } from './User'
import { NavbarSearch } from './NavbarSearch'

import { ThemeContext } from '../context/ThemeProvider'
import { UserContext } from '../context/UserProvider'
import { JournalContext } from '../context/JournalProvider'

export const Navbar: React.FC = () => {
  const { toggleDark, dark } = useContext(ThemeContext)
  const { username, avatar, userLoading } = useContext(UserContext)
  const { journals } = useContext(JournalContext)

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <RightWrapper>
        {userLoading ? null : username ? (
          <>
            {journals.length > 0 && (
              <NavbarSearchWrapper>
                <NavbarSearch />
              </NavbarSearchWrapper>
            )}
            <UserWrapper>
              <User username={username} avatar={avatar} />
            </UserWrapper>
          </>
        ) : (
          <ButtonGroup>
            <Link href="/connexion">
              <LoginButton
                style={{ marginRight: 5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Se connecter
              </LoginButton>
            </Link>
            <Link href="/inscription">
              <SignupButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaUserAlt style={{ marginRight: 5 }} /> S'inscrire
              </SignupButton>
            </Link>
          </ButtonGroup>
        )}
        <IconGroup>
          {username && (
            <>
              {dark ? (
                <MoonIcon onClick={toggleDark} />
              ) : (
                <SunIcon onClick={toggleDark} />
              )}
            </>
          )}
        </IconGroup>
      </RightWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.navBarBackground};
  transition: background 100ms ease-in-out;
  height: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
`

const LogoWrapper = styled.div`
  width: 282px;
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
  margin-right: 5rem;
`

const ButtonGroup = styled.div`
  display: flex;
  margin-right: 6rem;
`

const LoginButton = styled(motion.button)`
  border: none;
  padding: 1em 2em;
  color: #555;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
`

const SignupButton = styled(motion.button)`
  border: none;
  padding: 1em 2em;
  background: var(--primaryColor);
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
`

const IconGroup = styled.div`
  margin-right: 6rem;
  width: 2rem;
`

const MoonIcon = styled(FaMoon)`
  font-size: 1.6rem;
  cursor: pointer;
`

const SunIcon = styled(FaSun)`
  font-size: 1.6rem;
  color: #333;
  cursor: pointer;
`

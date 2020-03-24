import * as React from 'react'
import { useState, useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {
  FaBars,
  FaHome,
  FaRegSmile,
  FaNewspaper,
  FaPlusCircle,
} from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import Router from 'next/router'

import { Logo } from './Logo'
import { User } from './User'

import { UserContext } from '../context/UserProvider'
import { JournalContext } from '../context/JournalProvider'

export const NavbarMobile = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const { username, avatar, userLoading } = useContext(UserContext)

  return (
    <div style={{ position: 'relative' }}>
      <Wrapper>
        <div onClick={() => setToggleDropdown(prevState => !prevState)}>
          <FaBars size={20} color="#333" />
        </div>
        <Logo width={21} />
        <div>
          <User username={username} avatar={avatar} />
        </div>
      </Wrapper>
      <AnimatePresence>
        {toggleDropdown && (
          <NavbarMobileDropdown setToggleDropdown={setToggleDropdown} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toggleDropdown && (
          <Overlay
            onClick={() => setToggleDropdown(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: 'spring',
              damping: 16,
              stiffness: 100,
              delay: 0.2,
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const NavbarMobileDropdown = ({ setToggleDropdown }) => {
  const { newPage, journals, journalsLoading } = useContext(JournalContext)

  function addNewPub() {
    if (Router.router.pathname.includes('nouveau')) {
      return
    }
    setToggleDropdown(false)
    const id = newPage()
    Router.push(`/journal/nouveau/[id]`, `/journal/nouveau/${id}`)
  }

  return (
    <Dropdown
      initial={{ y: '-100%' }}
      animate={{ y: -4 }}
      exit={{ y: '-100%' }}
      transition={{ type: 'spring', damping: 16, stiffness: 100 }}
    >
      <nav>
        <DropdownList>
          <Link href="/profil">
            <DropdownListItem
              onClick={() => setToggleDropdown(prevState => !prevState)}
            >
              <FaHome style={{ marginRight: 7 }} />
              Accueil
            </DropdownListItem>
          </Link>
          <Link href="/profil/moods">
            <DropdownListItem
              onClick={() => setToggleDropdown(prevState => !prevState)}
            >
              <FaRegSmile style={{ marginRight: 7 }} />
              Moods
            </DropdownListItem>
          </Link>
          <Link href="/journal/liste">
            <DropdownListItem
              onClick={() => setToggleDropdown(prevState => !prevState)}
            >
              <FaNewspaper style={{ marginRight: 7 }} />
              Publications
            </DropdownListItem>
          </Link>
          <ButtonWrapper>
            <Button
              onClick={addNewPub}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPlusCircle style={{ marginRight: 7 }} />
              Nouvelle publication
            </Button>
          </ButtonWrapper>
        </DropdownList>
      </nav>
    </Dropdown>
  )
}

// Styles
const Wrapper = styled.div`
  background: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 1.8rem 2rem;
  display: grid;
  grid-template-columns: 45px 1fr 45px;
  justify-items: center;
  align-items: center;
  z-index: 1000;

  @media (min-width: 500px) {
    display: none;
  }
`

const Dropdown = styled(motion.div)`
  position: absolute;
  background: ghostwhite;
  top: 68px;
  width: 100%;
  padding: 5rem 2rem 5rem 2rem;
  z-index: 999;
  min-height: 100%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-bottom: 5px solid #eee;
`

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const DropdownListItem = styled.li`
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #440061;
  border-bottom: 1px solid #eee;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
`

const Overlay = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
`

const ButtonWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
`

const Button = styled(motion.button)`
  border: none;
  border-bottom: 3px solid #440061;
  padding: 1em 2em;
  background: var(--primaryColor);
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.6rem;
`

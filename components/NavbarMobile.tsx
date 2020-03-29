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
        <MenuBar onClick={() => setToggleDropdown(prevState => !prevState)}>
          <FaBars size={20} color="#333" />
        </MenuBar>
        <Logo toggle={setToggleDropdown} width={21} />
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
              damping: 30,
              stiffness: 200,
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
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
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
  border-top: 3px solid var(--primaryColor);

  @media (min-width: 501px) {
    grid-template-columns: 145px 1fr 145px;
  }

  @media (min-width: 769px) {
    display: none;
  }
`

const MenuBar = styled.div`
  @media (min-width: 501px) {
    justify-self: start;
    padding-left: 1rem;
  }
`

const Dropdown = styled(motion.div)`
  position: absolute;
  background: ghostwhite;
  top: 68px;
  width: 100%;
  padding: 4rem 2rem 4.5rem 2rem;
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
  /* border-top: 1px solid #eee; */
  border-bottom: 1px solid #eee;
  box-shadow: 0 14px 20px -20px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 30rem;
  margin: 2rem auto;
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
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`

const Button = styled(motion.button)`
  border: none;
  border-bottom: 3px solid #440061;
  padding: 1em 2em;
  background: var(--primaryColor);
  color: white;
  /* text-transform: uppercase; */
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.6rem;
`

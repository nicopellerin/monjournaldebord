import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaPlusCircle, FaUsers } from 'react-icons/fa'
import Router from 'next/router'
import Link from 'next/link'

import { List } from './List'

import { JournalContext } from '../context/JournalProvider'
import { UserContext } from '../context/UserProvider'

export const Sidebar: React.FC = () => {
  const { newPage, journals, journalsLoading } = useContext(JournalContext)
  const { username } = useContext(UserContext)

  function addNewPub() {
    const id = newPage()
    Router.push(`/journal/nouveau/[id]`, `/journal/nouveau/${id}`)
  }

  return (
    <Wrapper>
      <List />
      <ButtonGroup>
        <a
          style={{ textDecoration: 'none' }}
          href={`/blogue/${username}`}
          target="_blank"
          rel="nofollowers"
        >
          <ButtonProfilPublic whileHover={{ y: -1 }} whileTap={{ y: 1 }}>
            <FaUsers style={{ marginRight: 7 }} />
            Mon profil public
          </ButtonProfilPublic>
        </a>

        <ButtonNewJournal
          onClick={addNewPub}
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
        >
          <FaPlusCircle style={{ marginRight: 7 }} />
          Nouvelle publication
        </ButtonNewJournal>
      </ButtonGroup>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.aside`
  background: ${(props) => props.theme.colors.sideBarBackground};
  transition: background 100ms ease-in-out;
  width: 100%;
  box-shadow: 4px 0px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  /* z-index: 99; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5rem 0;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`

const ButtonProfilPublic = styled(motion.button)`
  border: 1px solid var(--primaryColor);
  border-bottom: 3px solid var(--primaryColor);
  padding: 1em 2em;
  background: ghostwhite;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: var(--primaryColor);
  width: 100%;
  font-weight: bold;
`

const ButtonNewJournal = styled(motion.button)`
  border: none;
  border-bottom: 3px solid #440061;
  padding: 1em 2em;
  background: var(--primaryColor);
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
`

import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaPlusCircle, FaUsers } from 'react-icons/fa'
import Router from 'next/router'
import Link from 'next/link'

import { List } from './List'

import { SidebarNoJournals } from './SidebarNoJournals'

import { JournalContext } from '../context/JournalProvider'
import { UserContext } from '../context/UserProvider'

export const Sidebar: React.FC = () => {
  const { newPage, journals, journalsLoading } = useContext(JournalContext)
  const { username } = useContext(UserContext)

  function addNewPub() {
    const id = newPage()
    Router.push(`/journal/nouveau/[id]`, `/journal/nouveau/${id}`)
  }

  if (!journals.length && !journalsLoading) {
    return (
      <Wrapper noJournals={!journals.length}>
        <SidebarNoJournals />
      </Wrapper>
    )
  }

  return (
    <>
      {!journalsLoading && (
        <Wrapper noJournals={!journals.length && !journalsLoading}>
          <List />
          <ButtonGroup>
            <Link href="/public/[username]" as={`/public/${username}`}>
              <ButtonProfilPublic whileHover={{ y: -1 }} whileTap={{ y: 1 }}>
                <FaUsers style={{ marginRight: 7 }} />
                Mon profil public
              </ButtonProfilPublic>
            </Link>
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
      )}
    </>
  )
}

// Styles
const Wrapper = styled.aside`
  background: ${props => props.theme.colors.sideBarBackground};
  transition: background 100ms ease-in-out;
  width: 100%;
  /* height: calc(100vh - 75px); */
  box-shadow: 4px 0px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: ${(props: { noJournals: boolean }) =>
    props.noJournals ? 'center' : 'space-between'};
  align-items: center;
  padding: 5rem 0;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonProfilPublic = styled(motion.button)`
  border: 1px solid rgba(187, 102, 204, 1);
  border-bottom: 3px solid rgba(187, 102, 204, 1);
  padding: 1em 2em;
  background: ghostwhite;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: rgba(187, 102, 204, 1);
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

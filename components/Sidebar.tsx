import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaPlusCircle } from 'react-icons/fa'
import Router from 'next/router'

import { List } from './List'

import { JournalContext } from '../context/JournalProvider'
import { SidebarNoJournals } from './SidebarNoJournals'

export const Sidebar: React.FC = () => {
  const { newPage, journals, journalsLoading } = useContext(JournalContext)

  function addNewPub() {
    if (Router.router.pathname.includes('nouveau')) {
      return
    }
    const id = newPage()
    Router.push(`/journal/nouveau/[id]`, `/journal/nouveau/${id}`)
  }

  if (journalsLoading) {
    return <div>Loading...</div>
  }

  if (!journals.length && !journalsLoading) {
    return (
      <Wrapper noJournals={!journals.length}>
        <SidebarNoJournals />
      </Wrapper>
    )
  }

  return (
    <Wrapper noJournals={!journals.length && !journalsLoading}>
      <List />
      <Button
        onClick={addNewPub}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaPlusCircle style={{ marginRight: 7 }} />
        Nouvelle publication
      </Button>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.aside`
  background: ${props => props.theme.colors.sideBarBackground};
  transition: background 100ms ease-in-out;
  width: 100%;
  height: calc(100vh - 75px);
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

const Button = styled(motion.button)`
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

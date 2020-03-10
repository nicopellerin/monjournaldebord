import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaPlusCircle } from 'react-icons/fa'
import Router from 'next/router'

import { JournalContext } from '../context/JournalProvider'

export const SidebarNoJournals = () => {
  const { newPage } = useContext(JournalContext)

  function addNewPub() {
    newPage()
    Router.push(`/journal/nouveau/[id]`, `/journal/nouveau/${1}`, {
      shallow: true,
    })
  }

  return (
    <Wrapper>
      <Title>Aucune publications</Title>
      <Text>Ajouter une nouvelle publication pour commencer</Text>
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
const Wrapper = styled.div`
  border: 2px dashed #ddd;
  border-radius: 5px;
  padding: 1.5rem;
`

const Title = styled.h3`
  font-size: 1.6rem;
  text-align: center;
  color: var(--primaryColor);
`

const Text = styled.p`
  margin-bottom: 2rem;
  font-size: 1.2rem;
  text-align: center;
  max-width: 30ch;
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

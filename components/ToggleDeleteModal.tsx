import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { motion, AnimatePresence } from 'framer-motion'
import Router from 'next/router'

import { useClickOutside } from '../hooks/useClickOutside'

import { JournalContext } from '../context/JournalProvider'

import { maxLength } from '../utils/maxLength'

type Props = {
  setToggleDelete: any
  journalTitle: string
}

export const ToggleDeleteModal: React.FC<Props> = ({
  setToggleDelete,
  journalTitle,
}) => {
  const {
    selectedJournal,
    journals,
    deleteSelectedJournal,
    undoNewJournal,
  } = useContext(JournalContext)

  const ref = useClickOutside(setToggleDelete)

  const deleteSelected = () => {
    const findIdx = journals.findIndex(
      journal => journal.id === selectedJournal.id
    )
    let idx
    findIdx + 1 < journals.length ? (idx = findIdx + 1) : (idx = findIdx - 1)

    if (!Router.router.pathname.includes('/nouveau')) {
      deleteSelectedJournal(selectedJournal.id)
    } else {
      undoNewJournal(selectedJournal.id)
    }
    if (journals.length) {
      Router.push(`/journal/[id]`, `/journal/${journals[idx].id}`)
    } else {
      Router.push(`/profil`, `/profil`, { shallow: true })
    }
  }

  return (
    <AnimatePresence>
      <ModalWrapper
        initial={{ opacity: 0, y: '-40%', x: '-50%' }}
        animate={{ opacity: 1, y: '-50%' }}
        exit={{ opacity: 0, y: '-40%' }}
        ref={ref}
      >
        <Title>
          Supprimer <strong>{maxLength(journalTitle, 20)}</strong>?
        </Title>
        <ButtonWrapper>
          <ButtonDelete
            onClick={deleteSelected}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirmer
          </ButtonDelete>
          <ButtonCancel
            onClick={() => setToggleDelete(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Annuler
          </ButtonCancel>
        </ButtonWrapper>
      </ModalWrapper>
    </AnimatePresence>
  )
}

// Styles
const ModalWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 200;
  background: whitesmoke;
  padding: 5rem;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  min-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
`

const Title = styled.h2`
  font-size: 2.4rem;
  text-align: center;
  font-weight: 400;
  margin-bottom: 2.5rem;
`

const ButtonWrapper = styled.div`
  display: flex;
`

const ButtonDelete = styled(motion.button)`
  border: none;
  padding: 0.7em 1.2em;
  background: crimson;
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;
`

const ButtonCancel = styled(motion.button)`
  border: none;
  padding: 0.7em 1.2em;
  background: white;
  color: crimson;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
`

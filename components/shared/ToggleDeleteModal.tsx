import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { motion, AnimatePresence } from 'framer-motion'
import Router from 'next/router'

import { useClickOutside } from '../../hooks/useClickOutside'

import { JournalContext } from '../../context/JournalProvider'

import { maxLength } from '../../utils/maxLength'

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
    deleteSelectedJournalAction,
    undoNewJournalAction,
  } = useContext(JournalContext)

  const deleteSelected = () => {
    const findIdx = journals.findIndex(
      (journal) => journal.id === selectedJournal.id
    )
    let idx
    findIdx + 1 < journals.length ? (idx = findIdx + 1) : (idx = findIdx - 1)

    setToggleDelete(false)

    if (!Router.router.pathname.includes('/nouveau')) {
      deleteSelectedJournalAction(selectedJournal.id)
    } else {
      undoNewJournalAction(selectedJournal.id)
    }
    if (journals.length > 1) {
      Router.push(`/journal/[id]`, `/journal/${journals[idx].id}`)
    } else {
      Router.push(`/profil`, `/profil`)
    }
  }

  return (
    <AnimatePresence>
      <ModalWrapper
        initial={{ opacity: 0, y: '-40%', x: '-50%' }}
        animate={{ opacity: 1, y: '-50%' }}
        exit={{ opacity: 0, y: '-40%' }}
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
  position: fixed;
  top: 50%;
  left: calc(50% + 15rem);
  z-index: 200;
  background: whitesmoke;
  padding: 5rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
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
  background: red;
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;
  font-weight: bold;
`

const ButtonCancel = styled(motion.button)`
  border: none;
  padding: 0.7em 1.2em;
  background: white;
  color: red;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
`

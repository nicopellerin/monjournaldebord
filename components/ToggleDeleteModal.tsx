import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { motion, AnimatePresence } from 'framer-motion'
import Router from 'next/router'

import { useClickOutside } from '../hooks/useClickOutside'

import { JournalContext } from '../context/JournalProvider'

const DELETE_JOURNAL = gql`
  mutation($id: ID!) {
    deleteJournal(id: $id) {
      title
    }
  }
`

export const ToggleDeleteModal = ({ setToggleDelete }) => {
  const { selectedJournal, journals, deleteSelectedJournal } = useContext(
    JournalContext
  )

  const ref = useClickOutside(setToggleDelete)

  const [deleteJournal, { data }] = useMutation(DELETE_JOURNAL, {
    refetchQueries: ['allJournals'],
  })

  const deleteSelected = () => {
    const findIdx = journals.findIndex(
      journal => journal.id === selectedJournal.id
    )
    let idx
    if (findIdx + 1 < journals.length) {
      idx = findIdx + 1
    } else {
      idx = findIdx - 1
    }
    deleteJournal({ variables: { id: selectedJournal.id } })
    deleteSelectedJournal(selectedJournal.id)
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
        <Title>Confirmer supprimer</Title>
        <div>
          <button onClick={deleteSelected}>Confirmer</button>
          <button onClick={() => setToggleDelete(false)}>Annuler</button>
        </div>
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
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  font-size: 2rem;
`

import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FaCalendarAlt, FaEdit, FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Router from 'next/router'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { DateNow } from './DateNow'

import { JournalContext } from '../context/JournalProvider'

const DELETE_JOURNAL = gql`
  mutation($id: ID!) {
    deleteJournal(id: $id) {
      title
    }
  }
`

export const JournalSingle: React.FC = () => {
  const {
    selectJournal,
    selectedJournal,
    journals,
    toggleEditing,
    deleteSelectedJournal,
  } = useContext(JournalContext)

  const [deleteJournal, { data }] = useMutation(DELETE_JOURNAL)

  useEffect(() => {
    const prevIdx = Number(selectedJournal?.id) - 1
    const nextIdx = Number(selectedJournal?.id) + 1

    const prevPublication = e => {
      if (prevIdx > 0 && e.keyCode === 40) {
        Router.push(`/journal/[id]`, `/journal/${prevIdx}`, {
          shallow: true,
        })
        selectJournal(prevIdx)
      }
    }
    document.addEventListener('keydown', prevPublication)

    const nextPublication = e => {
      if (nextIdx <= journals.length && e.keyCode === 38) {
        Router.push(`/journal/[id]`, `/journal/${nextIdx}`, {
          shallow: true,
        })
        selectJournal(nextIdx)
      }
    }

    document.addEventListener('keydown', nextPublication)

    return () => {
      document.removeEventListener('keydown', prevPublication)
      document.removeEventListener('keydown', nextPublication)
    }
  }, [selectedJournal])

  const deleteSelected = () => {
    deleteSelectedJournal(selectedJournal.id)
    deleteJournal({ variables: { id: selectedJournal.id } })
    Router.push(`/journal/[id]`, `/journal/${journals[0].id}`)
  }
  return (
    <Wrapper>
      {journals.length > 0 ? (
        <>
          <Title>{selectedJournal?.title}</Title>

          <DateWrapper>
            <FaCalendarAlt style={{ marginRight: 8 }} />
            <DateNow dateInfo={selectedJournal?.createdAt} />
          </DateWrapper>
          {selectedJournal?.image && (
            <Image src={selectedJournal.image} alt="" />
          )}
          <Text>
            <div
              dangerouslySetInnerHTML={{
                __html: selectedJournal?.text
                  .replace('\n', '<br />')
                  .replace('\n\n', '<br/><br/>'),
              }}
            />
          </Text>
          <ButtonWrapper>
            <Link
              href={`/journal/edit/[id]`}
              as={`/journal/edit/${selectedJournal?.id}`}
            >
              <ButtonEdit
                onClick={toggleEditing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEdit style={{ marginRight: 5 }} />
                Éditer
              </ButtonEdit>
            </Link>
            <ButtonDelete
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={deleteSelected}
            >
              <FaTimes style={{ marginRight: 5 }} />
              Supprimer
            </ButtonDelete>
          </ButtonWrapper>
        </>
      ) : (
        <div>No journals</div>
      )}
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  max-width: 80rem;
  height: 100%;
  padding: 8rem 0;
`

const Image = styled.img`
  width: 100%;
  height: 42rem;
  margin: 2rem 0 1rem;
  object-fit: cover;
  object-position: center;
`

const Title = styled.h2`
  font-size: 6rem;
  word-break: break-all;
  margin-bottom: 1rem;
`

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.5em;
  margin-bottom: 3rem;
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ButtonEdit = styled(motion.button)`
  border: none;
  padding: 1em 1.5em;
  background: whitesmoke;
  color: #333;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;
`

const ButtonDelete = styled(motion.button)`
  border: none;
  padding: 1em 1.5em;
  background: whitesmoke;
  color: crimson;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 2rem;
`

import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaCalendarAlt, FaEdit, FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Router from 'next/router'
import Link from 'next/link'

import { DateNow } from './DateNow'
import { ToggleDeleteModal } from './ToggleDeleteModal'

import { JournalContext } from '../context/JournalProvider'

const JournalSingle: React.FC = () => {
  const {
    selectJournal,
    selectedJournal,
    journals,
    toggleEditing,
  } = useContext(JournalContext)

  const [toggleDelete, setToggleDelete] = useState(false)

  useEffect(() => {
    setToggleDelete(false)
  }, [selectedJournal])

  useEffect(() => {
    if (!journals.length) {
      Router.push('/profil', '/profil', { shallow: true })
    }
  }, [journals])

  useEffect(() => {
    const currentIdx = journals?.findIndex(
      journal => journal.id === selectedJournal?.id
    )
    const prevIdx = journals[currentIdx - 1]
    const nextIdx = journals[currentIdx + 1]

    const prevPublication = e => {
      if (prevIdx && e.keyCode === 37) {
        Router.push(`/journal/[id]`, `/journal/${prevIdx.id}`, {
          shallow: true,
        })
        selectJournal(prevIdx.id)
      }
    }
    document.addEventListener('keydown', prevPublication)

    const nextPublication = e => {
      if (nextIdx && e.keyCode === 39) {
        Router.push(`/journal/[id]`, `/journal/${nextIdx.id}`, {
          shallow: true,
        })
        selectJournal(nextIdx.id)
      }
    }

    document.addEventListener('keydown', nextPublication)

    return () => {
      document.removeEventListener('keydown', prevPublication)
      document.removeEventListener('keydown', nextPublication)
    }
  }, [selectedJournal])

  return (
    <Wrapper>
      <motion.div
        initial={{
          scale: 0.96,
          y: 30,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
        }}
        exit={{
          scale: 0.6,
          y: 100,
          opacity: 0,
          transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
        }}
      >
        <Content
          animate={{
            opacity: toggleDelete ? 0.3 : 1,
            transition: { duration: 0.2 },
          }}
          disabled={toggleDelete}
        >
          <Title>{selectedJournal?.title}</Title>

          <DateWrapper>
            <CalendarIcon />
            <DateNow dateInfo={selectedJournal?.createdAt} />
          </DateWrapper>
          {selectedJournal?.image && (
            <Image src={selectedJournal?.image} alt="" />
          )}
          <Text
            dangerouslySetInnerHTML={{
              __html: selectedJournal?.text
                .replace('\n', '<br/><br/>')
                .replace('\n\n', '<br/><br/>'),
            }}
          />
          <ButtonWrapper>
            <Link
              href={`/journal/edit/[id]`}
              as={`/journal/edit/${selectedJournal?.id}`}
            >
              <ButtonEdit
                onClick={() => toggleEditing(selectedJournal?.image)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEdit style={{ marginRight: 5 }} />
                Éditer
              </ButtonEdit>
            </Link>
            <ButtonDelete
              onClick={() => setToggleDelete(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaTimes style={{ marginRight: 5 }} />
              Supprimer
            </ButtonDelete>
          </ButtonWrapper>
        </Content>
      </motion.div>
      {toggleDelete && (
        <ToggleDeleteModal
          setToggleDelete={setToggleDelete}
          journalTitle={selectedJournal?.title}
        />
      )}
    </Wrapper>
  )
}

export default JournalSingle

// Styles
const Wrapper = styled.div`
  min-width: 60rem;
  max-width: 80rem;
  height: 100%;
  padding: 8rem 0;
  position: relative;
`

const Content = styled(motion.div)`
  ${(props: { disabled: boolean }) => props.disabled && `pointer-events: none`};
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
  color: ${props => props.theme.colors.titleColor};
`

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.5em;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.textColor};
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

const CalendarIcon = styled(FaCalendarAlt)`
  color: ${props => props.theme.colors.textColor};
  margin-right: 8px;
`

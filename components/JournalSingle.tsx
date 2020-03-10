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

export const JournalSingle: React.FC = () => {
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
    const prevIdx = journals
    const nextIdx = journals

    const prevPublication = e => {
      if (prevIdx && e.keyCode === 40) {
        Router.push(`/journal/[id]`, `/journal/${prevIdx}`, {
          shallow: true,
        })
        selectJournal(prevIdx)
      }
    }
    document.addEventListener('keydown', prevPublication)

    const nextPublication = e => {
      if (nextIdx && e.keyCode === 38) {
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

  return (
    <Wrapper>
      <Content
        animate={{
          opacity: toggleDelete ? 0.3 : 1,
          transition: { duration: 0.2 },
        }}
      >
        <Title>{selectedJournal?.title}</Title>

        <DateWrapper>
          <FaCalendarAlt style={{ marginRight: 8 }} />
          <DateNow dateInfo={selectedJournal?.createdAt} />
        </DateWrapper>
        {selectedJournal?.image && <Image src={selectedJournal.image} alt="" />}
        <Text
          dangerouslySetInnerHTML={{
            __html: selectedJournal?.text
              .replace('\n', '<br />')
              .replace('\n\n', '<br/><br/>'),
          }}
        />
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
            onClick={() => setToggleDelete(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaTimes style={{ marginRight: 5 }} />
            Supprimer
          </ButtonDelete>
        </ButtonWrapper>
      </Content>
      {toggleDelete && <ToggleDeleteModal setToggleDelete={setToggleDelete} />}
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  min-width: 60rem;
  max-width: 80rem;
  height: 100%;
  padding: 8rem 0;
  position: relative;
`

const Content = styled(motion.div)``

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

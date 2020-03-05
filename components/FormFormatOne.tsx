import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaCheckCircle, FaTimes, FaCalendarAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'

import { DateNow } from './DateNow'
import { TextBlock } from './TextBlock'

import { JournalContext } from '../context/JournalProvider'

export const FormFormatOne: React.FC = () => {
  const {
    selectedJournal,
    editSelectedJournal,
    newState,
    deleteSelectedJournal,
  } = useContext(JournalContext)

  const {
    query: { id },
  } = useRouter()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const titleValue = newState ? '' : selectedJournal?.title

  useEffect(() => {
    setTitle(titleValue)
    setText(selectedJournal?.text)
  }, [selectedJournal])

  function handleSubmit(e) {
    e.preventDefault()

    const id = selectedJournal?.id
    const createdAt = selectedJournal?.createdAt

    editSelectedJournal(id, title, text, createdAt)
    Router.push(`/journal/[id]`, `/journal/${selectedJournal?.id}`, {
      shallow: true,
    })
  }

  function handleCancel() {
    // if (Router.pathname.includes('nouveau') && !title && !text) {
    //   deleteSelectedJournal(id)
    //   Router.push(`/journal/[id]`, `/journal/1`)
    //   return
    // }
    Router.push(`/journal/[id]`, `/journal/${id}`, { shallow: true })
  }

  return (
    <Wrapper>
      <DateWrapper>
        <FaCalendarAlt style={{ marginRight: 5, fontSize: 12 }} />
        <DateNow />
      </DateWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
          <Label>Titre</Label>
          <InputField
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus={newState ? true : false}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Texte</Label>
          <TextBlock textVal={text} />
          {/* <TextAreaField
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
          /> */}
        </InputWrapper>
        <InputWrapper>
          <Label>Image (optionel)</Label>
          <input type="file" />
        </InputWrapper>
        <ButtonWrapper>
          <ButtonCancel
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCancel}
          >
            <FaTimes style={{ marginRight: 7 }} />
            Annuler
          </ButtonCancel>
          <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <FaCheckCircle style={{ marginRight: 7 }} />
            Sauvegarder
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const FormWrapper = styled.form``

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #555;
`

const TextAreaField = styled.textarea`
  width: 100%;
  min-height: 35vh;
  padding: 1rem;
  font-size: 1.6rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 3px;
  letter-spacing: 0.1em;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const Button = styled(motion.button)`
  border: none;
  padding: 1em 2em;
  background: var(--primaryColor);
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
`

const ButtonCancel = styled(motion.button)`
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

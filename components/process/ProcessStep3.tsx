import * as React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { FormEmoticons } from '../FormEmoticons'

import { emoticons } from '../FormFormatOne'

interface Props {
  setJournal: React.Dispatch<React.SetStateAction<object>>
  journal: { title: string; text: string; mood: string; image: string }
  paginate: any
}

export const ProcessStep3: React.FC<Props> = ({ setJournal, paginate }) => {
  const [mood, setMood] = useState('')

  useEffect(() => {
    if (mood) {
      setJournal(prevState => ({ ...prevState, mood }))
    }
  }, [mood])

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{
        y: [-20, 5, 0],
        opacity: [0, 1],
        transition: { delay: 0.1 },
      }}
    >
      <Title>{'Tu feel comment en ce moment?'}</Title>
      <FormEmoticons
        emoticons={emoticons}
        mood={mood}
        setMood={setMood}
        size={30}
      />
      <ButtonWrapper>
        <ButtonPrev
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaArrowLeft style={{ marginRight: 5 }} />
          Précendent
        </ButtonPrev>
        <ButtonNext
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Suivant <FaArrowRight style={{ marginLeft: 5 }} />
        </ButtonNext>
      </ButtonWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
`

const Title = styled.h1`
  font-size: 6rem;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: 30vw;
`

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 2.2rem;
  font-family: inherit;
  border: ${(props: { error: boolean }) =>
    props.error ? '1px solid red' : '1px solid #ddd'};
  border-radius: 5px;
  color: #555;
`

const TextAreaField = styled.textarea`
  width: 100%;
  min-height: 30vh;
  padding: 1rem;
  font-size: 2.2rem;
  font-family: inherit;
  border: ${(props: { error: boolean }) =>
    props.error ? '1px solid red' : '1px solid #ddd'};
  border-radius: 5px;
  resize: none;
`

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 3px;
  letter-spacing: 0.1em;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`

const ButtonNext = styled(motion.button)`
  border: none;
  padding: 1.1em 2.2em;
  background: var(--primaryColor);
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem;
`

const ButtonPrev = styled(motion.button)`
  border: none;
  padding: 1.1em 2.2em;
  background: whitesmoke;
  color: #333;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem;
  margin-right: 2rem;
`

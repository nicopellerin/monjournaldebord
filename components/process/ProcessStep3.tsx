import * as React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { FormEmoticons } from '../journal/FormEmoticons'

import { emoticons } from '../journal/FormFormatOne'

interface Props {
  setJournal: React.Dispatch<React.SetStateAction<object>>
  journal: { title: string; text: string; mood: string; image: string }
  paginate: any
}

export const ProcessStep3: React.FC<Props> = ({
  setJournal,
  paginate,
  journal,
}) => {
  const [mood, setMood] = useState('')

  useEffect(() => {
    if (mood) {
      setJournal((prevState) => ({ ...prevState, mood }))
    }
  }, [mood])

  return (
    <Wrapper
      animate={{
        y: [-20, 5, 0],
        transition: { delay: 0.1 },
      }}
    >
      <Title>{'Tu feel comment en ce moment?'}</Title>
      <FormEmoticons
        emoticons={emoticons}
        mood={mood}
        setMood={setMood}
        size={true}
      />
      <ButtonWrapper>
        <ButtonPrev
          onClick={() => paginate(-1)}
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
        >
          <FaArrowLeft style={{ marginRight: 5 }} />
          Précedent
        </ButtonPrev>
        <ButtonNext
          onClick={() => (journal.mood ? paginate(1) : null)}
          whileHover={{ y: -1 }}
          whileTap={{ y: 1 }}
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
  font-family: var(--systemFont);
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`

const ButtonNext = styled(motion.button)`
  border: 2px solid var(--primaryColor);
  padding: 1.1em 2.2em;
  background: none;
  color: var(--primaryColor);
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
`

const ButtonPrev = styled(motion.button)`
  border: none;
  padding: 1.1em 2.2em;
  background: ghostwhite;
  color: #333;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem;
  margin-right: 2rem;
  font-weight: bold;
`

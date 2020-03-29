import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

interface Props {
  setJournal: React.Dispatch<React.SetStateAction<object>>
  journal: { title: string; text: string; mood: string; image: string }
  paginate: any
}

export const ProcessStep2: React.FC<Props> = ({
  journal,
  setJournal,
  paginate,
}) => {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{
        y: [-20, 5, 0],
        opacity: [0, 1],
        transition: { delay: 0.1 },
      }}
    >
      <Title>{'Vas-y avec un texte'}</Title>
      <InputWrapper>
        <Label>Texte</Label>
        <TextAreaField
          error={false}
          value={journal.text}
          onChange={e => {
            const text = e.target.value
            setJournal(prevState => ({
              ...prevState,
              text,
            }))
          }}
        />
      </InputWrapper>
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
          onClick={() => (journal.text ? paginate(1) : null)}
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
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: 30vw;
`

const TextAreaField = styled.textarea`
  width: 100%;
  min-height: 30vh;
  padding: 1.5rem;
  font-size: 1.8rem;
  font-family: inherit;
  border: ${(props: { error: boolean }) =>
    props.error ? '1px solid red' : '1px solid #ddd'};
  border-radius: 5px;
  resize: none;

  &:focus {
    outline: none;
  }
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

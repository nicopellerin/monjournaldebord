import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

interface Props {
  setJournal: React.Dispatch<React.SetStateAction<object>>
  journal: { title: string; text: string; mood: string; image: string }
  paginate: any
}

export const ProcessStep1: React.FC<Props> = ({
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
      <Title>{"Allo! Tu n'as encore rien publié :)"}</Title>
      <InputWrapper>
        <Label>Titre</Label>
        <InputField
          error={false}
          value={journal.title}
          onChange={e => {
            const title = e.target.value
            setJournal(prevState => ({ ...prevState, title }))
          }}
        />
      </InputWrapper>
      <ButtonWrapper>
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
  padding: 1.5em 2em;
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

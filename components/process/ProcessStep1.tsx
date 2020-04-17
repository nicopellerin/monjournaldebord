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
  const wrapperVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 80,
        velocity: 2,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        type: 'tween',
        damping: 100,
        stiffness: 80,
        staggerChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 80,
      },
    },
  }

  return (
    <Wrapper
      variants={wrapperVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Title variants={itemVariants}>
        {"Allo! Tu n'as encore rien publié ;)"}
      </Title>
      <InputWrapper variants={itemVariants}>
        <Label>Titre</Label>
        <InputField
          error={false}
          value={journal.title}
          onChange={(e) => {
            const title = e.target.value
            setJournal((prevState) => ({ ...prevState, title }))
          }}
        />
      </InputWrapper>
      <ButtonWrapper variants={itemVariants}>
        <ButtonNext
          onClick={() => (journal.title ? paginate(1) : null)}
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

const Title = styled(motion.h1)`
  font-size: 6rem;
  font-family: var(--systemFont);
`

const InputWrapper = styled(motion.div)`
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

const ButtonWrapper = styled(motion.div)`
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

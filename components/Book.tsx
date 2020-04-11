import * as React from 'react'
import { useContext, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Router, { useRouter } from 'next/router'

import { FormFormatOne } from './FormFormatOne'
import { ImageContainer } from './ImageContainer'

import { JournalContext } from '../context/JournalProvider'

export const Book: React.FC = () => {
  const [loader, setLoader] = useState('')

  const { toggleImageContainer, selectedJournal, newState } = useContext(
    JournalContext
  )

  const {
    query: { id },
  } = useRouter()

  useLayoutEffect(() => {
    if (!selectedJournal && !newState) {
      Router.push(`/journal/[id]`, `/journal/${id}`)
    }
  }, [])

  return (
    <AnimatePresence>
      <Wrapper
        initial={{ y: -10 }}
        animate={{
          y: [-10, 0],
          x: selectedJournal?.image && !newState ? [-80, -100] : 0,
        }}
        exit={{ y: 50 }}
      >
        <FormWrapper>
          <FormFormatOne loader={loader} setLoader={setLoader} />
        </FormWrapper>
        <AnimatePresence>
          {toggleImageContainer && <ImageContainer setLoader={setLoader} />}
        </AnimatePresence>
      </Wrapper>
    </AnimatePresence>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  position: relative;
`

const FormWrapper = styled.div`
  background: whitesmoke;
  background-size: cover;
  width: 60rem;
  box-shadow: 0 7px 20px rgba(0, 0, 0, 0.1);
  border-radius: 23px;
  display: flex;
  justify-content: center;
  padding: 5rem 4rem;
  position: relative;
  z-index: 3;
  border-top: 5px solid #eef;
  border-bottom: 3px solid #ddd;

  @media (max-width: 500px) {
    width: 90vw;
    padding: 4rem 2rem;
    margin: 0 auto;
  }
`

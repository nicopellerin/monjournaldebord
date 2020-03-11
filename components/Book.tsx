import * as React from 'react'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import { FormFormatOne } from './FormFormatOne'
import { ImageContainer } from './ImageContainer'

import { JournalContext } from '../context/JournalProvider'

export const Book: React.FC = () => {
  const [loader, setLoader] = useState('')

  const { toggleImageContainer } = useContext(JournalContext)

  return (
    <AnimatePresence>
      <Wrapper initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: 50 }}>
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
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.8)
    ),
    url('/paper.jpg');
  background-size: cover;
  width: 60rem;
  min-height: 70vh;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 23px;
  display: flex;
  justify-content: center;
  padding: 4rem;
  position: relative;
  z-index: 3;
`

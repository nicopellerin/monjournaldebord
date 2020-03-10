import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export const NoJournals = () => {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ x: [-10, 0], opacity: [0, 1] }}
    >
      <Title>Aucune publications</Title>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  min-height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  color: var(--primaryColor);
`

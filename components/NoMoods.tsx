import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export const NoMoods = () => (
  <Wrapper>
    <Content animate={{ y: [20, 0], opacity: [0, 1] }}>
      <Title>{'Ta liste est vide :('}</Title>
      {/* <h3>Ajoute un mood</h3> */}
    </Content>
  </Wrapper>
)

// Styles
const Wrapper = styled(motion.div)`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled(motion.div)``

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 400;
`

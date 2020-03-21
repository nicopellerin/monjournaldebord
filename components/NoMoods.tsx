import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export const NoMoods = () => (
  <Wrapper>
    <Content initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <Title>{'Ta liste est vide :('}</Title>
      {/* <h3>Ajoute un mood</h3> */}
    </Content>
  </Wrapper>
)

// Styles
const Wrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled(motion.div)``

const Title = styled.h2`
  font-size: 4rem;
`

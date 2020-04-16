import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { StatsTotalImages } from './StatsTotalImages'
import { StatsTotalJournals } from './StatsTotalJournals'
import { StatsLongestText } from './StatsLongestText'

export const Stats = () => {
  return (
    <>
      <Title>Stats &mdash;</Title>
      <Wrapper
        initial={{ y: 10 }}
        animate={{
          // opacity: [0, 1],
          y: [10, 0],
        }}
      >
        <StatsTotalJournals />
        <StatsTotalImages />
        <StatsLongestText />
      </Wrapper>
    </>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-gap: 5rem;
  padding: 3rem;

  @media (max-width: 1365px) {
    grid-template-columns: 1fr;
    padding: 3rem 0;
    grid-gap: 4rem;
  }
`

const Title = styled.h2`
  font-size: 2.4rem;
  /* color: ${(props) => props.theme.colors.titleColor}; */
  color: #440061;
  font-family: 'Work Sans', sans-serif;
`

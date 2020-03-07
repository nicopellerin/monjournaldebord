import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { StatsTotalJournals } from './StatsTotalJournals'
import { StatsChartJournals } from './StatsChartJournals'

export const Stats = () => {
  return (
    <>
      <Title>Stats &mdash;</Title>
      <Wrapper
        animate={{
          opacity: [0, 1],
          y: [10, 0],
          transition: { delay: 0.1 },
        }}
      >
        <StatsTotalJournals />
        <StatsTotalJournals />
        <StatsTotalJournals />
      </Wrapper>
      <motion.div
        animate={{
          opacity: [0, 1],
          y: [10, 0],
          transition: { delay: 0.2 },
        }}
      >
        <StatsChartJournals />
      </motion.div>
    </>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-gap: 3rem;
  padding: 3rem;
`

const Title = styled.h2`
  font-size: 2.4rem;
`

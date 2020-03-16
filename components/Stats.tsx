import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { StatsTotalImages } from './StatsTotalImages'
import { StatsTotalJournals } from './StatsTotalJournals'
// import { StatsChartJournals } from './StatsChartJournals'

export const Stats = () => {
  return (
    <>
      <Title>Stats &mdash;</Title>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1],
          y: [10, 0],
          transition: { delay: 0.1 },
        }}
      >
        <StatsTotalJournals />
        <StatsTotalImages />
        <StatsTotalJournals />
      </Wrapper>
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1],
          y: [10, 0],
          transition: { delay: 0.2 },
        }}
      >
        <StatsChartJournals />
      </motion.div> */}
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
  color: ${props => props.theme.colors.titleColor};
`

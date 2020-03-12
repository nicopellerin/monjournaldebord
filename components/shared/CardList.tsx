import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { motion, useInvertedScale, useMotionValue } from 'framer-motion'

import { Card } from './Card'

import { JournalContext } from '../../context/JournalProvider'

type Props = {
  list?: any
  expand?: boolean
}

type Journal = {
  id: number
  title: string
  text: string
  createdAt: string
  image: string
}

export const CardList: React.FC<Props> = ({ list, expand }) => {
  const scaleX = useMotionValue(1)
  const scaleY = useMotionValue(1)
  const inverted = useInvertedScale({ scaleX, scaleY })

  const { journals } = useContext(JournalContext)

  const parentVariants = {
    load: {
      x: [-10, 0],
      opacity: [0, 1],
    },
  }

  if (list) {
    return (
      <Wrapper>
        <ListWrapper variants={parentVariants} animate={'load'} expand={expand}>
          {list.map(journal => (
            <motion.div style={{ scaleX, scaleY }} layoutTransition>
              <motion.div
                style={{ ...inverted, transformOrigin: 'top', height: '100%' }}
              >
                <Card key={journal.id} {...journal} />
              </motion.div>
            </motion.div>
          ))}
        </ListWrapper>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <ListWrapper variants={parentVariants} animate={'load'}>
        {journals?.slice(0, 3).map(journal => (
          <Card key={journal.id} {...journal} />
        ))}
      </ListWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  padding: 3rem;
`

const ListWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  ${(props: { expand?: boolean }) =>
    props.expand &&
    css`
      grid-template-columns: repeat(2, 1fr);
    `}
  grid-gap: 3rem;
`

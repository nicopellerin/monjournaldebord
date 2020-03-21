import * as React from 'react'
import { useContext, useMemo } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { fr } from 'date-fns/locale'
import { motion } from 'framer-motion'

import { MoodsContext } from '../context/MoodsProvider'
import { ProfilMoodsContainer } from './ProfilMoodsContainer'

export const ProfilMoods = React.memo(() => {
  const { moods } = useContext(MoodsContext)

  const moodsByDate = useMemo(
    () =>
      moods?.reduce((dates, cur) => {
        const date = format(cur.createdAt, 'iiii dd MMMM', {
          locale: fr,
        })
        dates[date] = dates[date] || []
        dates[date].push({
          id: cur.id,
          mood: cur.mood,
          createdAt: cur.createdAt,
        })
        return dates
      }, {}),
    [moods]
  )

  return (
    <Wrapper>
      <Content animate={{ y: [10, 0], opacity: [0, 1] }}>
        {Object.entries(moodsByDate).map(
          (
            [date, moods]: [
              string,
              [{ id: string; mood: string; createdAt: Date }]
            ],
            i
          ) => {
            return <ProfilMoodsContainer key={i} date={date} moods={moods} />
          }
        )}
      </Content>
    </Wrapper>
  )
})

// Styles
const Wrapper = styled.div`
  padding: 8rem;
  background: ${props => props.theme.colors.background};
  transition: background 100ms ease-in-out;
  min-height: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 1500px) {
    padding: 10em 9rem;
  }
`

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
`

import * as React from 'react'
import { useContext, useMemo } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { fr } from 'date-fns/locale'
import { motion } from 'framer-motion'

import { ProfilMoodsContainer } from './ProfilMoodsContainer'
import { dots } from '../../utils/imagesBase64'

interface Props {
  list: any
}

export const ProfilMoods: React.FC<Props> = ({ list }) => {
  const listByDate = useMemo(
    () =>
      list?.reduce((dates, cur) => {
        const date = format(cur.createdAt, 'iiii d MMMM', {
          locale: fr,
        })
        dates[date] = dates[date] || []
        dates[date].push({
          id: cur.id,
          mood: cur.mood,
          title: cur.title,
          createdAt: cur.createdAt,
          image: cur.image,
        })
        return dates
      }, {}),
    [list]
  )

  return (
    <Wrapper>
      <Content initial={{ y: 10 }} animate={{ y: [10, 0] }}>
        {Object.entries(listByDate).map(
          (
            [date, lists]: [
              string,
              [{ id: string; mood: string; createdAt: Date; image: string }]
            ],
            i
          ) => {
            return (
              <React.Fragment key={i}>
                <ProfilMoodsContainer index={i} date={date} lists={lists} />
              </React.Fragment>
            )
          }
        )}
        <DotsWrapper>
          <Dots src={dots} alt="dots" />
        </DotsWrapper>
      </Content>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
`

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
`

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Dots = styled.img`
  margin: 2rem 0 2rem;
  text-align: center;
`

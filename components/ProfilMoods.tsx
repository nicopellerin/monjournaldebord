import * as React from 'react'
import { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { fr } from 'date-fns/locale'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlusCircle } from 'react-icons/fa'

import { MoodsContext } from '../context/MoodsProvider'

interface StylesProps {
  showLess: boolean
  lessThanFour: boolean
}

export const ProfilMoods = () => {
  const { moods } = useContext(MoodsContext)
  const [showLess, setShowLess] = useState(true)

  const moodsByDate = useMemo(
    () =>
      moods.reduce((dates, cur) => {
        const date = format(Number(cur.createdAt), 'iiii dd MMMM', {
          locale: fr,
        })
        dates[date] = dates[date] || []
        dates[date].push(cur.mood)
        return dates
      }, {}),
    [moods]
  )

  return (
    <Wrapper>
      <Content>
        {Object.entries(moodsByDate).map(
          ([date, moods]: [string, string[]], i) => {
            return (
              <DateGroup>
                <Title key={i}>{date}</Title>
                <AnimatePresence initial={false}>
                  <List
                    animate={{ height: showLess ? '29rem' : 'auto' }}
                    exit={{ opacity: 0 }}
                    transition={{ damping: 300 }}
                    showLess={showLess ? true : false}
                    lessThanFour={moods.length < 5}
                  >
                    {moods.map((mood, i) => (
                      <ListItem layoutTransition key={i}>
                        {mood}
                      </ListItem>
                    ))}
                  </List>
                </AnimatePresence>
                {moods.length > 4 && (
                  <ButtonWrapper>
                    <FaPlusCircle
                      onClick={() => setShowLess(!showLess)}
                      size={20}
                      color="#9D00E0"
                      style={{ cursor: 'pointer' }}
                    />
                  </ButtonWrapper>
                )}
              </DateGroup>
            )
          }
        )}
      </Content>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  padding: 8rem;
  background: ${props => props.theme.colors.background};
  transition: background 100ms ease-in-out;
  min-height: 100%;

  @media (max-width: 1500px) {
    padding: 10em 9rem;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h3`
  font-size: 2rem;
  background: ghostwhite;
  padding: 2rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`

const List = styled(motion.ul)`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 50rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  background: none;
  margin-bottom: 2rem;
  ${(props: StylesProps) => props.lessThanFour && 'height: auto'}!important;

  &:after {
    content: '';
    background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 1)
    );
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    ${(props: StylesProps) => !props.showLess && 'opacity: 0'}
    ${(props: StylesProps) => props.lessThanFour && 'opacity: 0'}
  }
`

const ListItem = styled(motion.li)`
  font-size: 1.6rem;
  width: 100%;
  white-space: pre-wrap;
  padding: 2rem;
  background: white;

  &:not(:last-of-type) {
    border-bottom: 1px solid #eee;
  }
`

const DateGroup = styled.div`
  /* box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); */
  background: ghostwhite;

  &:not(:last-of-type) {
    margin-bottom: 6rem;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 2rem;
  background: ghostwhite;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`

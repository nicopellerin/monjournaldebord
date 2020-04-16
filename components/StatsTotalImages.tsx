import * as React from 'react'
import { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { JournalContext } from '../context/JournalProvider'

export const StatsTotalImages = () => {
  const { journals } = useContext(JournalContext)

  // Calculate number of total images
  let count = 0
  React.useMemo(
    () =>
      journals?.forEach((journal) => {
        if (journal.image) {
          count++
        }
      }),
    [journals]
  )

  // Calculate most frequent mood
  const mostFrequentMoodObj = useMemo(
    () =>
      journals?.reduce((prev, cur) => {
        prev[cur.mood] = (prev[cur.mood] || 0) + 1

        return prev
      }, {}),
    [journals]
  )

  const mostFrequentMood = Object.entries(mostFrequentMoodObj)

  return (
    <Wrapper>
      <TotalWrapper>
        <Title>Mood le plus fréquent</Title>
        <Count>
          {mostFrequentMood && mostFrequentMood[0] ? (
            <Mood src={mostFrequentMood[0][0]} alt="mood" />
          ) : (
            'N/A'
          )}
        </Count>
      </TotalWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  /* background: ${(props) => props.theme.colors.statsCardBackground}; */
  background: #fafafa;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 7px 15px;
  padding: 2rem 3rem;
  border-radius: 5px;
  border: 1px solid #eee;
  /* border-top: 2px solid #eee; */
  border-bottom: 3px solid #ddd;
`

const TotalWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Title = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  font-weight: 400;
  color: #440061;
  border-bottom: 1px dashed #333;
`

const Count = styled.h4`
  font-size: 2rem;
  margin-bottom: 0;
  color: ${(props) => props.theme.colors.titleColor};
`

const Mood = styled.img`
  width: 32px;
`

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
      journals?.forEach(journal => {
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
  background: ${props => props.theme.colors.statsCardBackground};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem 3rem;
  /* border: 1px solid #ddd; */
  border-radius: 5px;
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem; */

  /* & > div:first-of-type {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: -1rem;
      width: 1px;
      height: 100%;
      background: #ddd;
    }
  } */
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
  font-weight: 400;
  color: ${props => props.theme.colors.titleColor};
  border-bottom: 1px dashed #333;
`

const Count = styled.h4`
  font-size: 2rem;
  margin-bottom: 0;
  color: ${props => props.theme.colors.titleColor};
`

const Mood = styled.img`
  width: 32px;
`

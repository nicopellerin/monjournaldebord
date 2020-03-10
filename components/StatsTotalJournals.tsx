import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'

import { JournalContext } from '../context/JournalProvider'

import { maxLength } from '../utils/maxLength'
import Link from 'next/link'

export const StatsTotalJournals = () => {
  const { journals } = useContext(JournalContext)

  const longestText = journals?.reduce((prev, current) => {
    if (prev.text.length > current.text.length) {
      return prev
    } else {
      return current
    }
  }, journals[0])

  return (
    <Wrapper>
      <TotalWrapper>
        <Title># total de publications</Title>
        <Count>{journals?.length}</Count>
      </TotalWrapper>
      <TotalWrapper>
        <Title>Plus long texte</Title>
        <Count>
          {longestText ? (
            <Link as={`/journal/${longestText?.id}`} href={`/journal/[id]`}>
              <a>{maxLength(longestText?.title, 12)}</a>
            </Link>
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
  background: #fff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem 3rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;

  & > div:first-of-type {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: -1rem;
      width: 1px;
      height: 100%;
      background: #ddd;
    }
  }
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
`

const Count = styled.h4`
  font-size: 2rem;
  margin-bottom: 0;
`

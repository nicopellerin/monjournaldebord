import * as React from 'react'
import { useContext, useCallback } from 'react'
import styled from 'styled-components'

import { JournalContext } from '../context/JournalProvider'

import { maxLength } from '../utils/maxLength'
import Link from 'next/link'

export const StatsLongestText = () => {
  const { journals } = useContext(JournalContext)

  const longestText = useCallback(
    journals?.reduce((prev: any, current: any) => {
      if (prev.text.length > current.text.length) {
        return prev
      } else {
        return current
      }
    }, journals[0]),
    [journals]
  )

  return (
    <Wrapper>
      <TotalWrapper>
        <Title>Plus longue publication</Title>
        <Count>
          {longestText ? (
            <Link as={`/journal/${longestText?.id}`} href={`/journal/[id]`}>
              <a style={{ color: 'var(--primaryColor)' }}>
                {maxLength(longestText?.title, 20)}
              </a>
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
  background: ${props => props.theme.colors.statsCardBackground};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem 3rem;
  border-radius: 5px;
  border-top: 5px solid #eef;
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
  color: ${props => props.theme.colors.titleColor};
`

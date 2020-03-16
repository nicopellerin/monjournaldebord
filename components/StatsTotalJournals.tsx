import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'

import { JournalContext } from '../context/JournalProvider'

export const StatsTotalJournals = () => {
  const { journals } = useContext(JournalContext)

  return (
    <Wrapper>
      <TotalWrapper>
        <Title>Total de publications</Title>
        <Count>{journals?.length}</Count>
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

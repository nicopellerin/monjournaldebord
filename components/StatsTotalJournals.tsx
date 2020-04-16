import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'

import { JournalContext } from '../context/JournalProvider'

export const StatsTotalJournals = () => {
  const { journals } = useContext(JournalContext)

  return (
    <Wrapper>
      <TotalWrapper>
        <Title>Nombre de publications</Title>
        <Count>{journals?.length}</Count>
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
  display: flex;
  justify-content: center;
  align-items: center;
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

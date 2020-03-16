import * as React from 'react'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { CardList } from './shared/CardList'
import { Stats } from './Stats'
import { NoJournals } from './shared/NoJournals'

import { JournalContext } from '../context/JournalProvider'

export const Home: React.FC = () => {
  const { selectJournal, journals, journalsLoading } = useContext(
    JournalContext
  )

  // useEffect(() => {
  //   if (selectJournal) {
  //     selectJournal(null)
  //   }
  // }, [])

  if (journalsLoading) {
    return (
      <Wrapper>
        <RecentWrapper>
          <Title>Publications récentes &mdash;</Title>
          <CardList />
        </RecentWrapper>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <RecentWrapper>
        <Title>Publications récentes &mdash;</Title>
        {journals.length ? <CardList /> : <NoJournals />}
      </RecentWrapper>
      <Stats />
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  padding: 8rem;
  background: ${props => props.theme.colors.background};
  transition: background 100ms ease-in-out;
  height: 100%;

  @media (max-width: 1500px) {
    padding: 6rem 7rem;
  }
`

const RecentWrapper = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.h2`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.titleColor};
`

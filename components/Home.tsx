import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'

import { CardList } from './shared/CardList'
import { Stats } from './Stats'
import { NoJournals } from './shared/NoJournals'
import { MoodToday } from './MoodToday'

import { JournalContext } from '../context/JournalProvider'

export const Home: React.FC = () => {
  const { journals, journalsLoading } = useContext(JournalContext)

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
      <MoodToday />
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
  min-height: 100%;

  @media (max-width: 1500px) {
    padding: 10em 9rem;
  }
`

const RecentWrapper = styled.div`
  margin-bottom: 3rem;
`

const Title = styled.h2`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.titleColor};
`

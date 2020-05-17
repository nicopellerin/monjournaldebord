import * as React from 'react'
import styled from 'styled-components'

import { CardList } from './shared/CardList'
import { Stats } from './stats/Stats'

import { MoodToday } from './moods/MoodToday'

export const Home: React.FC = () => {
  return (
    <Wrapper>
      <MoodToday />
      <RecentWrapper>
        <Title>Publications récentes &mdash;</Title>
        <CardList />
      </RecentWrapper>
      <Stats />
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  padding: 8rem;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url('/dots.webp'); */
  transition: background 100ms ease-in-out;
  min-height: 100%;
  width: 100%;

  @media (max-width: 1500px) {
    padding: 10em 6em;
  }

  @media (max-width: 500px) {
    padding: 8rem 2rem;
  }
`

const RecentWrapper = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
`

const Title = styled.h2`
  font-size: 2.4rem;
  color: #440061;
  font-family: 'Work Sans', sans-serif;
`

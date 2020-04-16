import * as React from 'react'
import styled from 'styled-components'

import { CardList } from './shared/CardList'
import { Stats } from './Stats'

import { MoodToday } from './MoodToday'

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
  background: ${(props) => props.theme.colors.background};
  transition: background 100ms ease-in-out;
  min-height: 100%;
  width: 100%;

  @media (max-width: 1500px) {
    padding: 10em 9rem;
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
  /* color: ${(props) => props.theme.colors.titleColor}; */
  color: #440061;
  font-family: 'Work Sans', sans-serif;
`

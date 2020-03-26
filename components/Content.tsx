import * as React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { Book } from './Book'
import JournalSingle from './JournalSingle'
import { Home } from './Home'

export const Content: React.FC = () => {
  const { pathname } = useRouter()

  if (pathname === '/profil') {
    return <Home />
  }

  if (pathname.includes('edit') || pathname.includes('nouveau')) {
    return (
      <Wrapper>
        <Book />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <JournalSingle />
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.contentBackground};
  min-height: 100%;

  padding: 10em 9rem;
`

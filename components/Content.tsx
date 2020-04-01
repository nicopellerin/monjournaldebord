import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { Book } from './Book'
import JournalSingle from './JournalSingle'
import { Home } from './Home'

import { JournalContext } from '../context/JournalProvider'

interface StyledProps {
  isJournal?: boolean
}

export const Content: React.FC = () => {
  const { pathname } = useRouter()

  const { selectedJournal } = useContext(JournalContext)

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
    <Wrapper isJournal={pathname.includes('journal')}>
      {selectedJournal && <JournalSingle />}
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background: ${props => props.theme.colors.contentBackground};
  min-height: 100%;
  align-items: ${(props: StyledProps) =>
    props.isJournal ? 'center' : 'flex-start'};
  padding: 10em 9rem;
`

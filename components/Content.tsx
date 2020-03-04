import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Book } from './Book'
// import { JournalSingle } from './JournalSingle'
import { Home } from './Home'

const JournalSingleCSR = dynamic(() => import('./JournalSingle') as any, {
  ssr: false,
})

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
      <JournalSingleCSR />
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ghostwhite;
  min-height: 100%;
`

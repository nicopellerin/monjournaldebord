import * as React from 'react'
import { useContext } from 'react'
import Head from 'next/head'
import nextCookie from 'next-cookies'
import styled from 'styled-components'

import { Book } from '../../../components/Book'

import { JournalContext } from '../../../context/JournalProvider'

const EditJournal = () => {
  const { selectedJournal } = useContext(JournalContext)

  return (
    <>
      <Head>
        <title>Éditer - {selectedJournal?.title} | monjournaldebord</title>
      </Head>
      <Wrapper>
        <Book />
      </Wrapper>
    </>
  )
}

EditJournal.getInitialProps = async (ctx) => {
  const { token_login: token } = nextCookie(ctx)

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/connexion' })
      ctx.res.end()
    }
  }

  return token || {}
}

export default EditJournal

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.contentBackground};
  min-height: 100%;
`

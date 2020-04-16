import * as React from 'react'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import nextCookie from 'next-cookies'
import styled from 'styled-components'

import JournalSingle from '../../components/JournalSingle'

import { JournalContext } from '../../context/JournalProvider'

const SinglePage = () => {
  const { selectJournal, selectedJournal } = useContext(JournalContext)

  const {
    query: { id },
  } = useRouter()

  useEffect(() => {
    if (id) {
      selectJournal(id)
    }
  }, [id])

  return (
    <>
      <Head>
        <title>{selectedJournal?.title} | monjournaldebord</title>
      </Head>
      <Wrapper>{selectedJournal && <JournalSingle />}</Wrapper>
    </>
  )
}

SinglePage.getInitialProps = async (ctx) => {
  const { token_login: token } = nextCookie(ctx)

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/connexion' })
      ctx.res.end()
    }
  }

  return token || {}
}

export default SinglePage

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 10em 9rem 14rem;
`

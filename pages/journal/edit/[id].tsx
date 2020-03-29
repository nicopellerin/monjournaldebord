import * as React from 'react'
import { useContext } from 'react'
import Head from 'next/head'
import nextCookie from 'next-cookies'

import { Content } from '../../../components/Content'

import { JournalContext } from '../../../context/JournalProvider'
import gql from 'graphql-tag'
import { withApollo } from '../../../lib/apollo'

const EditJournal = () => {
  const { selectedJournal } = useContext(JournalContext)

  return (
    <>
      <Head>
        <title>Éditer - {selectedJournal?.title} | monjournaldebord</title>
      </Head>
      <Content />
    </>
  )
}

EditJournal.getInitialProps = async ctx => {
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

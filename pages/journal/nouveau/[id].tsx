import * as React from 'react'
import { useEffect, useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import nextCookie from 'next-cookies'

import { Content } from '../../../components/Content'

import { JournalContext } from '../../../context/JournalProvider'

const NewJournal: NextPage = () => {
  const { newState } = useContext(JournalContext)

  useEffect(() => {
    if (!newState) {
      Router.push('/profil')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Nouveau | monjournaldebord</title>
      </Head>
      <Content />
    </>
  )
}

NewJournal.getInitialProps = async ctx => {
  const { token_login: token } = nextCookie(ctx)

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/connexion' })
      ctx.res.end()
    }
  }

  return token || {}
}

export default NewJournal

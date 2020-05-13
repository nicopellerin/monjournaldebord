import * as React from 'react'
import nextCookie from 'next-cookies'
import { NextPage } from 'next'
import Head from 'next/head'

import { Hero } from '../components/landing/Hero'

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>monjournaldebord</title>
      </Head>
      <Hero />
    </>
  )
}

IndexPage.getInitialProps = async (ctx) => {
  const { token_login: token } = nextCookie(ctx)

  if (token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/profil' })
      ctx.res.end()
    }
  }

  return token || {}
}

export default IndexPage

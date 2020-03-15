import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import nextCookies from 'next-cookies'

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

IndexPage.getInitialProps = async ctx => {
  const { token_login } = nextCookies(ctx)

  if (ctx.req && token_login) {
    ctx.res.writeHead(302, { Location: '/profil' })
    ctx.res.end()
  }

  if (!ctx.req && token_login) {
    Router.push('/profil')
  }

  return { token_login }
}

export default IndexPage

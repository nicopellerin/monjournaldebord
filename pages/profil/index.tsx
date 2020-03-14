import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import nextCookies from 'next-cookies'

import { Content } from '../../components/Content'

const ProfilPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profil | monjournaldebord</title>
      </Head>
      <Content />
    </>
  )
}

ProfilPage.getInitialProps = async ctx => {
  const { token_login } = nextCookies(ctx)

  if (ctx.req && !token_login) {
    ctx.res.writeHead(302, { Location: '/connexion' })
    ctx.res.end()
  }

  if (!token_login) {
    Router.push('/connexion')
  }

  return { token_login }
}

export default ProfilPage

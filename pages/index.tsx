import * as React from 'react'
import { useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import nextCookie from 'next-cookies'
import cookies from 'js-cookie'
import Router from 'next/router'

import { Hero } from '../components/landing/Hero'

import { withApollo } from '../lib/apollo'

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

// IndexPage.getInitialProps = async ctx => {
//   const { token_login: token } = nextCookie(ctx)

//   if (token) {
//     if (typeof window === 'undefined') {
//       ctx.res.writeHead(302, { Location: '/profil' })
//       ctx.res.end()
//     }
//   }

//   return token
// }
export default IndexPage

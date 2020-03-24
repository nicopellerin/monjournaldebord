import * as React from 'react'
import { useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
// import nextCookies from 'next-cookies'
import cookies from 'js-cookie'
import Router from 'next/router'

import { Hero } from '../components/landing/Hero'

const IndexPage: NextPage = () => {
  const cookie = cookies.get('token_login')
  useEffect(() => {
    if (cookie) {
      Router.push('/profil')
    }
  }, [])
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
//   const { token_login } = nextCookies(ctx)

//   if (ctx.res && token_login) {
//     ctx.res.writeHead(302, { Location: '/profil' })
//     ctx.res.end()

//     return { token_login }
//   }

//   return {}
// }

export default IndexPage

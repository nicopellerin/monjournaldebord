import { NextPage } from 'next'
import Router from 'next/router'
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

IndexPage.getInitialProps = async ({ req, res }) => {
  const mockCookie = false
  if (req && !mockCookie) {
    res.writeHead(301, { Location: '/profil' })
    res.end()
  }
  if (!mockCookie) {
    Router.push('/profil')
  }
}

export default IndexPage

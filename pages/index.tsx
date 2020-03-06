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

export default IndexPage

import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'

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

ProfilPage.getInitialProps = async ({ req, res }) => {
  const mockCookie = true

  if (req && !mockCookie) {
    res.writeHead(302, { Location: '/connexion' })
    res.end()
  }

  if (!mockCookie) {
    Router.push('/connexion')
  }

  return { mockCookie }
}

export default ProfilPage

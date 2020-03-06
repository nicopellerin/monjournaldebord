import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { Content } from '../../components/Content'
import Router from 'next/router'

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

  return {}
}

export default ProfilPage

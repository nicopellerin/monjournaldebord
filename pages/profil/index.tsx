import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { Content } from '../../components/Content'

const ProfilPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profil | Mon Journal De Bord</title>
      </Head>
      <Content />
    </>
  )
}

export default ProfilPage

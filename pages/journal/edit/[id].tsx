import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { Content } from '../../../components/Content'

const NewJournal: NextPage = () => {
  return (
    <>
      <Head>
        <title>Éditer | Mon Journal De Bord</title>
      </Head>
      <Content />
    </>
  )
}

export default NewJournal

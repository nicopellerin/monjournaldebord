import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { Content } from '../../../components/Content'

const NewJournal: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nouveau | monjournaldebord</title>
      </Head>
      <Content />
    </>
  )
}

export default NewJournal

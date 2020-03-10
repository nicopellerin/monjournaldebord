import React, { useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { Content } from '../../../components/Content'

import { JournalContext } from '../../../context/JournalProvider'
import { withApollo } from '../../../lib/apollo'

const NewJournal: NextPage = () => {
  const { selectedJournal } = useContext(JournalContext)

  return (
    <>
      <Head>
        <title>Éditer - {selectedJournal?.title} | monjournaldebord</title>
      </Head>
      <Content />
    </>
  )
}

export default withApollo(NewJournal)

import * as React from 'react'
import { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Content } from '../../components/Content'

import { JournalContext } from '../../context/JournalProvider'

const SinglePage: NextPage = () => {
  const { selectJournal, selectedJournal } = useContext(JournalContext)

  const {
    query: { id },
  } = useRouter()

  useEffect(() => {
    if (selectJournal) {
      selectJournal(id)
    }
  }, [selectJournal])

  return (
    <>
      <Head>
        <title>{selectedJournal?.title} | monjournaldebord</title>
      </Head>
      <Content />
    </>
  )
}

export default SinglePage

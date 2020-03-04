import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Content } from '../../components/Content'

import { JournalContext } from '../../context/JournalProvider'

const SinglePage: NextPage = () => {
  const { selectJournal } = useContext(JournalContext)

  const {
    query: { id },
  } = useRouter()

  useEffect(() => {
    if (selectJournal) {
      selectJournal(Number(id))
    }
  }, [selectJournal])

  return (
    <>
      <Head>
        <title>Éditer | Mon Journal De Bord</title>
      </Head>
      <Content />
    </>
  )
}

export default SinglePage

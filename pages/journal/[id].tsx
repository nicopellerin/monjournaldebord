import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Navbar } from '../../components/Navbar'
import { Main } from '../../components/Main'

import { JournalContext } from '../../context/JournalProvider'

const SinglePage: NextPage = () => {
  const { selectJournal } = useContext(JournalContext)

  const {
    query: { id },
  } = useRouter()

  useEffect(() => {
    selectJournal(Number(id))
  }, [selectJournal])

  return (
    <>
      <Navbar />
      <Main />
    </>
  )
}

export default SinglePage

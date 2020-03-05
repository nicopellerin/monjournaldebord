import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'

import { CardList } from '../components/shared/CardList'

import { JournalContext } from '../context/JournalProvider'

const SearchPage: NextPage = () => {
  const { journals, search } = useContext(JournalContext)

  const filteredList = journals.filter(journal =>
    journal.title.toLowerCase().includes(search.toLowerCase())
  )

  const searchCount =
    filteredList.length === 1
      ? `${filteredList.length} journal trouvé`
      : `${filteredList.length} journaux trouvés`

  return (
    <>
      <Head>
        <title>Recherche | monjournaldebord</title>
      </Head>
      <Wrapper>
        <Title>{searchCount} &mdash;</Title>
        <CardList list={filteredList} />
      </Wrapper>
    </>
  )
}

export default SearchPage

// Styles
const Wrapper = styled.div`
  padding: 8rem;

  @media (max-width: 1500px) {
    padding: 6rem 7rem;
  }
`

const Title = styled.h2`
  font-size: 2.4rem;
`

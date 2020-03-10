import * as React from 'react'
import { useContext, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

import { CardList } from '../components/shared/CardList'

import { JournalContext } from '../context/JournalProvider'

const SearchPage: NextPage = () => {
  const [expand, setExpand] = useState(false)

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
        <Header>
          <Title>{searchCount} &mdash;</Title>
          {filteredList.length > 3 && (
            <Button onClick={() => setExpand(prevState => !prevState)}>
              Changer format
            </Button>
          )}
        </Header>
        {filteredList.length ? (
          <CardList list={filteredList} expand={expand} />
        ) : (
          <div>
            <h2>Ooops!</h2>
          </div>
        )}
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

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h2`
  font-size: 2.4rem;
  margin: 0;
`

const Button = styled.button`
  background: var(--primaryColor);
  border: none;
  padding: 0.5em 1em;
  color: ghostwhite;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 2rem;
`

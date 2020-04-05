import * as React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { request } from 'graphql-request'
import useSWR from 'swr'

import { PublicSingleJournal } from '../../../components/PublicSingleJournal'
import { Logo } from '../../../components/Logo'
import { maxLength } from '../../../utils/maxLength'
import { useRouter } from 'next/router'

const API = 'https://api.monjournaldebord.ca/query'
const fetcher = (query, variables) => request(API, query, variables)

const PublicSinglePage = ({ data: initialData, username }) => {
  const { query: queryId } = useRouter()

  const id = initialData?.id || queryId?.id

  const { data, error } = useSWR(
    [
      `query publicJournal($id: ID!)
    { publicJournal(id: $id) {
    id
    title
    text
    image
    createdAt
    mood
    status
  }
}`,
      id,
    ],
    (url, id) => fetcher(url, { id }),
    { initialData: initialData }
  )

  return (
    <>
      <Head>
        <title>
          {data?.publicJournal?.title} | {username} | monjournaldebord
        </title>
        <meta
          name="og:title"
          content={`${data?.publicJournal?.title} | monjournaldebord`}
        />
        <meta
          name="og:url"
          content={`https://monjournaldebord.ca/public/${username}`}
        />
        <meta
          name="og:description"
          content={`${maxLength(data?.publicJournal?.text, 200)}`}
        />
        <meta name="og:image" content={data?.publicJournal?.image} />
      </Head>
      <Wrapper>
        <Heading>
          <Logo />
        </Heading>
        <PublicSingleJournal {...data?.publicJournal} />
      </Wrapper>
    </>
  )
}

PublicSinglePage.getInitialProps = async ({ query }) => {
  const data = await fetcher(
    `query publicJournal($id: ID!)
    { publicJournal(id: $id) {
    id
    title
    text
    image
    createdAt
    mood
    status
  }
}`,
    { id: query.id }
  )

  return { data, username: query.username }
}

export default PublicSinglePage

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  background: url('/dots.webp');
`

const Heading = styled.div`
  margin: 4rem 0;
  display: flex;
  justify-content: center;
`

import * as React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { withApollo } from '../../../lib/apollo'
import { PublicSingleJournal } from '../../../components/PublicSingleJournal'
import { Logo } from '../../../components/Logo'
import { maxLength } from '../../../utils/maxLength'

const PUBLIC_JOURNAL = gql`
  query publicJournal($id: ID!) {
    publicJournal(id: $id) {
      id
      title
      text
      image
      createdAt
      mood
      status
    }
  }
`

const PublicSinglePage = ({
  title,
  text,
  image,
  mood,
  createdAt,
  username,
}) => {
  const journal = { title, text, image, mood, createdAt }

  return (
    <>
      <Head>
        <title>
          {title} | {username} | monjournaldebord
        </title>
        <meta name="og:title" content={`${title} | monjournaldebord`} />
        <meta
          name="og:url"
          content={`https://monjournaldebord.ca/public/${username}`}
        />
        <meta name="og:description" content={`${maxLength(text, 200)}`} />
        <meta name="og:image" content={image} />
      </Head>
      <Wrapper>
        <Heading>
          <Logo />
        </Heading>
        <PublicSingleJournal {...journal} />
      </Wrapper>
    </>
  )
}

PublicSinglePage.getInitialProps = async ({ query, apolloClient }) => {
  const {
    data: { publicJournal },
  } = await apolloClient.query({
    query: PUBLIC_JOURNAL,
    variables: { id: query?.id },
  })

  return { ...publicJournal, username: query.username }
}

export default withApollo(PublicSinglePage)

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

import * as React from 'react'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Head from 'next/head'

import { withApollo } from '../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'

import { Card } from '../../components/shared/Card'
import { Logo } from '../../components/Logo'

const PublicProfilPage = () => {
  const {
    query: { username },
  } = useRouter()

  const ALL_JOURNALS = gql`
    query allJournals($filter: String, $username: String) {
      journals(filter: $filter, username: $username) {
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
  const { data } = useQuery(ALL_JOURNALS, {
    variables: {
      filter: 'public',
      username: 'nicopellerin',
    },
  })

  return (
    <>
      <Head>
        <title>{username} | monjournaldebord</title>
      </Head>
      <Wrapper>
        <Heading>
          <Logo />
        </Heading>
        <Container>
          <UserImage src={'/default-profile.png'} alt="Profil" />
          <Username>{username}</Username>
          <Dots>&#8411;</Dots>
          {data?.journals?.map(journal => (
            <Card
              key={journal.id}
              title={journal.title}
              id={journal.id}
              text={journal.text}
              image={journal.image}
              createdAt={journal.createdAt}
              mood={journal.mood}
              status={journal.status}
            />
          ))}
        </Container>
      </Wrapper>
    </>
  )
}

export default withApollo(PublicProfilPage)

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  width: 60vw;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

const Heading = styled.div`
  margin: 4rem 0;
`

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  max-width: 50rem;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 3rem 0 8rem;
`

const Username = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
`

const UserImage = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  border: 1px solid #ddd;
  padding: 2px;
  margin-bottom: 3rem;
`

const Dots = styled.span`
  display: block;
  font-size: 5rem;
  text-align: center;
`

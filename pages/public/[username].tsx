import * as React from 'react'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Head from 'next/head'
import { withApollo } from '../../lib/apollo'
import { FaMapMarkerAlt } from 'react-icons/fa'

import { Logo } from '../../components/Logo'
import { PublicCard } from '../../components/shared/PublicCard'

import { dots } from '../../utils/imagesBase64'

const PUBLIC_JOURNALS = gql`
  query publicJournals($username: String) {
    publicJournals(username: $username) {
      journals {
        id
        title
        text
        image
        createdAt
        mood
        status
      }
      avatar
      city
    }
  }
`

const PublicProfilPage = ({ avatar, journals, city }) => {
  const {
    query: { username },
  } = useRouter()

  return (
    <>
      <Head>
        <title>{username} | monjournaldebord</title>
        <meta name="og:title" content={`${username} | monjournaldebord`} />
        <meta
          name="og:url"
          content={`https://monjournaldebord.ca/public/${username}`}
        />
        {/* <meta name="og:description" content={`${maxLength(text, 200)}`} /> */}
        {/* <meta name="og:image" content={image} /> */}
      </Head>
      <Wrapper>
        <Heading>
          <Logo />
        </Heading>
        <Container>
          <UserImage
            src={avatar ? avatar : '/default-profile.png'}
            alt="Profil"
          />
          <Username>@{username}</Username>
          {city && (
            <City>
              <FaMapMarkerAlt style={{ marginRight: 3 }} />
              {city}
            </City>
          )}
          <DotsWrapper>
            <Dots src={dots} alt="" />
          </DotsWrapper>
          {journals?.map(journal => (
            <PublicCard
              key={journal.id}
              title={journal.title}
              id={journal.id}
              text={journal.text}
              image={journal.image}
              createdAt={journal.createdAt}
              mood={journal.mood}
              username={username}
            />
          ))}
        </Container>
      </Wrapper>
    </>
  )
}

PublicProfilPage.getInitialProps = async ({ query, apolloClient }) => {
  const {
    data: { publicJournals },
  } = await apolloClient.query({
    query: PUBLIC_JOURNALS,
    variables: { username: query.username },
  })

  return publicJournals
}

export default withApollo(PublicProfilPage)

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
  margin: 4rem 0 0;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 65rem;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 6rem 0 8rem;
`

const Username = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
`

const City = styled.span`
  font-size: 1.4rem;
  color: #aaa;
  margin-bottom: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UserImage = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  border: 1px solid #ddd;
  padding: 2px;
  margin-bottom: 3rem;
`

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Dots = styled.img`
  margin: 2rem 0 7rem;
  text-align: center;
`

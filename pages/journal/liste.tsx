import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import nextCookie from 'next-cookies'

import { ProfilMoods } from '../../components/ProfilMoods'

import { JournalContext } from '../../context/JournalProvider'

const ListePage = () => {
  const { journals } = useContext(JournalContext)

  return (
    <>
      <Head>
        <title>Publications | monjournaldebord</title>
      </Head>
      <Wrapper>
        <Title>&middot; Publications &middot;</Title>
        <ProfilMoods list={journals} />
      </Wrapper>
    </>
  )
}

ListePage.getInitialProps = async ctx => {
  const { token_login: token } = nextCookie(ctx)

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/connexion' })
      ctx.res.end()
    }
  }

  return token || {}
}

export default ListePage

// Styles
const Wrapper = styled.div`
  padding: 8rem;
  background: ${props => props.theme.colors.background};
  transition: background 100ms ease-in-out;
  min-height: 100%;

  @media (max-width: 500px) {
    padding: 8rem 2rem;
  }
`

const Title = styled.h2`
  font-size: 4.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0;

  @media (max-width: 500px) {
    font-size: 3.8rem;
  }
`

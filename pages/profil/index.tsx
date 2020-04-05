import * as React from 'react'
import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { ThreeBounce } from 'better-react-spinkit'
import nextCookie from 'next-cookies'

import { Content } from '../../components/Content'

import { JournalContext } from '../../context/JournalProvider'
import { NoJournalsProfil } from '../../components/NoJournalsProfil'
import { withApollo } from '../../lib/apollo'

const ProfilPage = () => {
  const [show, setShow] = useState(false)

  const { journals, journalsLoading } = useContext(JournalContext)

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 1000)
    return () => clearTimeout(id)
  }, [])

  if (journalsLoading && !show) {
    return <LoadingWrapper></LoadingWrapper>
  }

  if (journalsLoading && show) {
    return (
      <LoadingWrapper>
        <LoadingContent>
          <Spinner size={30} color="#9D00E0" />
          <Title>En chargement...</Title>
        </LoadingContent>
      </LoadingWrapper>
    )
  }

  return (
    <>
      <Head>
        <title>Profil | monjournaldebord</title>
      </Head>
      {journals?.length === 0 && !journalsLoading ? (
        <NoJournalsProfil />
      ) : (
        <Content />
      )}
    </>
  )
}

ProfilPage.getInitialProps = async (ctx) => {
  const { token_login: token } = nextCookie(ctx)

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/connexion' })
      ctx.res.end()
    }
  }

  return token || {}
}

export default withApollo(ProfilPage)

// Styles
const LoadingWrapper = styled.div`
  height: calc(100vh - 75px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 75px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  background: white;
`

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-weight: 400;
`

const Spinner = styled(ThreeBounce)`
  fill: var(--primaryColor);
  margin-bottom: 2rem;
`

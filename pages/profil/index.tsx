import * as React from 'react'
import { useContext, useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import nextCookies from 'next-cookies'
import styled from 'styled-components'
import { ThreeBounce } from 'better-react-spinkit'

import { Content } from '../../components/Content'

import { JournalContext } from '../../context/JournalProvider'
import { NoJournalsProfil } from '../../components/NoJournalsProfil'

const ProfilPage: NextPage = () => {
  const [show, setShow] = useState(false)

  const { journals, journalsLoading } = useContext(JournalContext)

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 1000)

    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <Head>
        <title>Profil | monjournaldebord</title>
      </Head>
      {journalsLoading && show && (
        <LoadingWrapper>
          <LoadingContent>
            <Spinner size={30} color="#9D00E0" />
            <h1>En chargement...</h1>
          </LoadingContent>
        </LoadingWrapper>
      )}
      {!journalsLoading && journals?.length > 0 && <Content />}
      {!journalsLoading && journals?.length === 0 && <NoJournalsProfil />}
    </>
  )
}

ProfilPage.getInitialProps = async ctx => {
  const { token_login } = nextCookies(ctx)

  if (ctx.res && !token_login) {
    ctx.res.writeHead(302, { Location: '/connexion' })
    ctx.res.end()
    return {}
  }

  return { token_login }
}

export default ProfilPage

// Styles
const LoadingWrapper = styled.div`
  height: calc(100vh - 75px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 75px;
  z-index: 40;
`

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Spinner = styled(ThreeBounce)`
  fill: var(--primaryColor);
  margin-bottom: 2rem;
`

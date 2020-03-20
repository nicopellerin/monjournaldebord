import * as React from 'react'
import { useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import nextCookies from 'next-cookies'

import { Content } from '../../components/Content'

import { JournalContext } from '../../context/JournalProvider'
import { NoJournalsProfil } from '../../components/NoJournalsProfil'

const ProfilPage: NextPage = () => {
  const { journals, journalsLoading } = useContext(JournalContext)

  return (
    <>
      <Head>
        <title>Profil | monjournaldebord</title>
      </Head>
      {!journalsLoading && journals.length > 0 && <Content />}
      {!journalsLoading && journals.length === 0 && <NoJournalsProfil />}
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

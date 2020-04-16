import React from 'react'

import { Layout } from '../components/layout/Layout'
import { ProfilLayout } from '../components/layout/ProfilLayout'

import { JournalProvider } from '../context/JournalProvider'
import UserProvider from '../context/UserProvider'
import { MoodsProvider } from '../context/MoodsProvider'

import GlobalStyles from '../styles/GlobalStyles'

const MyApp = ({ Component, pageProps, router }) => {
  if (
    router.pathname.startsWith('/profil') ||
    router.pathname.startsWith('/journal') ||
    router.pathname.startsWith('/journal/recherche')
  ) {
    return (
      <UserProvider>
        <MoodsProvider>
          <JournalProvider>
            <ProfilLayout>
              <Component {...pageProps} />
              <GlobalStyles />
            </ProfilLayout>
            <div id="portal" />
          </JournalProvider>
        </MoodsProvider>
      </UserProvider>
    )
  }

  if (router.pathname === '/') {
    return (
      <Layout>
        <Component {...pageProps} key={router.query.id} />
        <GlobalStyles />
      </Layout>
    )
  }

  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} key={router.query.id} />
        <GlobalStyles />
      </Layout>
      <div id="portal" />
    </UserProvider>
  )
}

export default MyApp

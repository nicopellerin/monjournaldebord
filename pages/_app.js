import App from 'next/app'
import React from 'react'
import Router from 'next/router'

import { Layout } from '../components/shared/Layout'
import { ProfilLayout } from '../components/shared/ProfilLayout'

import { JournalProvider } from '../context/JournalProvider'
import UserProvider from '../context/UserProvider'
import { MoodsProvider } from '../context/MoodsProvider'

import { withApollo } from '../lib/apollo'

import GlobalStyles from '../styles/GlobalStyles'

const MyApp = ({ Component, pageProps, router }) => {
  if (
    router.pathname.startsWith('/profil') ||
    router.pathname.startsWith('/journal') ||
    router.pathname.startsWith('/journal/recherche') ||
    router.pathname.startsWith('/chat')
  ) {
    return (
      <UserProvider>
        <MoodsProvider>
          <JournalProvider>
            <ProfilLayout>
              <Component {...pageProps} key={router.query.id} />
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

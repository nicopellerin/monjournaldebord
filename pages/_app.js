import App from 'next/app'
import React from 'react'

import { Layout } from '../components/shared/Layout'
import { ProfilLayout } from '../components/shared/ProfilLayout'

import { JournalProvider } from '../context/JournalProvider'
import { UserProvider } from '../context/UserProvider'
import { MoodsProvider } from '../context/MoodsProvider'

import { withApollo } from '../lib/apollo'

import GlobalStyles from '../styles/GlobalStyles'

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props

    if (
      router.pathname.startsWith('/profil') ||
      router.pathname.startsWith('/profil/moods') ||
      router.pathname.startsWith('/journal')
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
}

export default withApollo(MyApp)

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
      router.pathname.startsWith('/connexion') ||
      router.pathname.startsWith('/inscription') ||
      router.pathname === '/'
    ) {
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
}

export default withApollo(MyApp)

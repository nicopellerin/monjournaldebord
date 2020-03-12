import App from 'next/app'
import React from 'react'

import { Layout } from '../components/shared/Layout'
import { ProfilLayout } from '../components/shared/ProfilLayout'

import { JournalProvider } from '../context/JournalProvider'

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
        <Layout>
          <Component {...pageProps} key={router.query.id} />
          <GlobalStyles />
        </Layout>
      )
    }

    return (
      <JournalProvider>
        <ProfilLayout>
          <Component {...pageProps} />
          <div id="portal" />
          <GlobalStyles />
        </ProfilLayout>
      </JournalProvider>
    )
  }
}

export default withApollo(MyApp)

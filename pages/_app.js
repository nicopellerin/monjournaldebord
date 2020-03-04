import App from 'next/app'
import React from 'react'
import Router from 'next/router'

import { Layout } from '../components/shared/Layout'

import { JournalProvider } from '../context/JournalProvider'

import GlobalStyles from '../styles/GlobalStyles'

class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {}
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }
  //   return {
  //     pageProps
  //   }
  // }

  // constructor(props) {
  //   super(props)

  //   Router.events.on("routeChangeComplete", () => {
  //     window.scrollTo(0, 0)
  //   })
  // }
  render() {
    const { Component, pageProps } = this.props

    return (
      <JournalProvider>
        <Layout>
          <Component {...pageProps} />
          <div id="portal" />
          <GlobalStyles />
        </Layout>
      </JournalProvider>
    )
  }
}

export default MyApp

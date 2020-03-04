import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'

import { Hero } from '../components/landing/Hero'

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mon Journal De Bord</title>
      </Head>
      <Hero />
    </>
  )
}

// IndexPage.getInitialProps = async ({ req, res }) => {
//   if (req) {
//     res.writeHead(200, { Location: '/profil' })
//     res.end()
//   } else {
//     Router.push('/profil')
//   }
// }

export default IndexPage

import { NextPage } from 'next'
import Router from 'next/router'

const IndexPage: NextPage = () => {
    return null
}

IndexPage.getInitialProps = async ({ req, res }) => {
    if (req) {
        res.writeHead(301, { Location: '/profil' })
        res.end()
    } else {
        Router.push('/profil')
    }
}

export default IndexPage

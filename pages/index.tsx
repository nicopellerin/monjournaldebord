import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'

import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'

const IndexPage: NextPage = () => {
    useEffect(() => {
        Router.push('/profil', '/profil')
    }, [])

    return (
        <>
            <Navbar />
            <Main />
        </>
    )
}

export default IndexPage

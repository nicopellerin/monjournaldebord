import React from 'react'
import { NextPage } from 'next'

import { Navbar } from '../../../components/Navbar'
import { Main } from '../../../components/Main'

const NewJournal: NextPage = () => {
    return (
        <>
            <Navbar />
            <Main />
        </>
    )
}

export default NewJournal

import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { CardList } from './shared/CardList'
import { Stats } from './Stats'

import { JournalContext } from '../context/JournalProvider'

export const Home: React.FC = () => {
    const { selectJournal } = useContext(JournalContext)

    useEffect(() => {
        selectJournal(null)
    }, [])
    return (
        <Wrapper>
            <RecentWrapper>
                <Title>Publications récentes &mdash;</Title>
                <CardList />
            </RecentWrapper>
            <Stats />
        </Wrapper>
    )
}

// Styles
const Wrapper = styled.div`
    padding: 8rem;
`

const RecentWrapper = styled.div`
    margin-bottom: 2rem;
`

const Title = styled.h2`
    font-size: 2.4rem;
`

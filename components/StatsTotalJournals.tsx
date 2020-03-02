import React, { useContext } from 'react'
import styled from 'styled-components'

import { JournalContext } from '../context/JournalProvider'

export const StatsTotalJournals = () => {
    const { journals } = useContext(JournalContext)

    return (
        <Wrapper>
            <TotalWrapper>
                <Title># total de publications</Title>
                <Count>{journals.length}</Count>
            </TotalWrapper>
            <TotalWrapper>
                <Title># total de publications</Title>
                <Count>{journals.length}</Count>
            </TotalWrapper>
        </Wrapper>
    )
}

// Styles
const Wrapper = styled.div`
    background: #fff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    padding: 2rem 3rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;

    & > div:first-of-type {
        border-right: 1px solid #ddd;
    }
`

const TotalWrapper = styled.div`
    padding: 1rem;
`

const Title = styled.h3`
    font-size: 1.8rem;
    font-weight: 400;
`

const Count = styled.h4`
    font-size: 2rem;
    margin-bottom: 0;
`

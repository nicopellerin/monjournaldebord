import React, { useContext } from 'react'
import styled from 'styled-components'

import { ListItem } from './ListItem'

import { JournalContext } from '../context/JournalProvider'

export const List: React.FC = () => {
    const { journals } = useContext(JournalContext)

    return (
        <Wrapper>
            {journals.map(item => (
                <ListItem key={item.id} {...item} />
            ))}
        </Wrapper>
    )
}

// Styles
const Wrapper = styled.ul`
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;

    & > li {
        margin-bottom: 0.2rem;
    }
`

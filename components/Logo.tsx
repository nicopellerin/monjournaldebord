import * as React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

export const Logo = () => {
    return (
        <Link href="/profil">
            <AStyled>
                <LogoStyled src="/logo.svg" alt="Logo" />
            </AStyled>
        </Link>
    )
}

// Styles
const AStyled = styled.a`
    text-decoration: none;
    cursor: pointer;
`

const LogoStyled = styled.img`
    width: 20rem;
`

import * as React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

export const Logo = () => {
  const { pathname } = useRouter()

  const loggedIn = true && pathname.includes('/profil')

  return (
    <Link href={loggedIn ? '/profil' : '/'}>
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

import * as React from "react"
import Link from "next/link"
import styled from "styled-components"

export const Logo = () => {
  return (
    <Link href="/">
      <AStyled>
        <h1 style={{ color: "#333", marginBottom: 0 }}>monjournaldebord</h1>
      </AStyled>
    </Link>
  )
}

// Styles
const AStyled = styled.a`
  text-decoration: none;
  cursor: pointer;
`

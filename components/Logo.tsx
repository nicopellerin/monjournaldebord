import * as React from 'react'
import { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { ThemeContext } from '../context/ThemeProvider'

export const Logo = () => {
  const { pathname } = useRouter()
  const { dark } = useContext(ThemeContext)

  const loggedIn = true && pathname.includes('/profil')

  return (
    <Link href={loggedIn ? '/profil' : '/'}>
      <AStyled>
        <svg
          width="20rem"
          // height="67px"
          viewBox="0 0 418 67"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="Artboard" transform="translate(-198.000000, -141.000000)">
              <g id="Group" transform="translate(194.000000, 121.000000)">
                <text
                  id="monjournaldebord"
                  fontFamily="BarlowCondensed-Light, Barlow Condensed"
                  fontSize="72"
                  fontStyle="condensed"
                  fontWeight="300"
                  letterSpacing="-3.5"
                  fill={dark ? '#fff' : '#000'}
                >
                  <tspan x="0.092" y="72">
                    mon
                  </tspan>
                  <tspan
                    x="95.144"
                    y="72"
                    fontFamily="BarlowCondensed-Medium, Barlow Condensed"
                    fontWeight="400"
                  >
                    journaldebord
                  </tspan>
                </text>
                <circle
                  id="Oval"
                  fill="#9D00E0"
                  cx="415"
                  cy="52"
                  r="7"
                ></circle>
              </g>
            </g>
          </g>
        </svg>
      </AStyled>
    </Link>
  )
}

// Styles
const AStyled = styled.a`
  text-decoration: none;
  cursor: pointer;
`

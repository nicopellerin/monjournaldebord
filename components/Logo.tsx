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
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="Artboard" transform="translate(-198.000000, -141.000000)">
              <g id="Group" transform="translate(194.000000, 121.000000)">
                <text
                  id="monjournaldebord"
                  font-family="BarlowCondensed-Light, Barlow Condensed"
                  font-size="72"
                  font-style="condensed"
                  font-weight="300"
                  letter-spacing="-3.5"
                  fill={dark ? '#fff' : '#000'}
                >
                  <tspan x="0.092" y="72">
                    mon
                  </tspan>
                  <tspan
                    x="95.144"
                    y="72"
                    font-family="BarlowCondensed-Medium, Barlow Condensed"
                    font-weight="400"
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

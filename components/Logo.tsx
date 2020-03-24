import * as React from 'react'
import { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { ThemeContext } from '../context/ThemeProvider'

interface Props {
  width?: number
}

export const Logo: React.FC<Props> = ({ width }) => {
  const { pathname } = useRouter()
  const { dark } = useContext(ThemeContext)

  const loggedIn = pathname.includes('/profil') || pathname.includes('/journal')

  return (
    <Link href={loggedIn ? '/profil' : '/'}>
      <AStyled>
        <svg xmlns="http://www.w3.org/2000/svg" width={width ? `${width}rem` : '22rem'} viewBox="0 0 418.834 66.169">
  <g id="Group" transform="translate(-3.166 -20.736)">
    <path fill={dark ? '#fff' : '#000'} id="monjournaldebord" d="M-167.754-36.792a8.829,8.829,0,0,0-8.352,5.4c-.144.288-.288.36-.36.144-1.44-3.456-4.176-5.544-7.848-5.544a8.862,8.862,0,0,0-7.416,3.96c-.144.288-.36.216-.36-.072v-2.664a.68.68,0,0,0-.72-.72h-2.3a.68.68,0,0,0-.72.72V-.72a.68.68,0,0,0,.72.72h2.3a.68.68,0,0,0,.72-.72V-24.768c0-5.4,2.592-8.64,6.624-8.64,3.6,0,6.192,3.312,6.192,8.784V-.72a.68.68,0,0,0,.72.72h2.376a.68.68,0,0,0,.72-.72V-24.768c0-5.4,2.52-8.64,6.552-8.64,3.672,0,6.192,3.312,6.192,8.784V-.72a.68.68,0,0,0,.72.72h2.376a.68.68,0,0,0,.72-.72V-24.984C-158.9-32.256-162.282-36.792-167.754-36.792ZM-143.39.576c6.552,0,10.8-4.392,10.8-10.728V-26.064c0-6.336-4.248-10.8-10.8-10.8-6.408,0-10.656,4.464-10.656,10.8v15.912C-154.046-3.816-149.8.576-143.39.576Zm0-3.384c-4.032,0-6.84-3.1-6.84-7.56v-15.48c0-4.536,2.808-7.632,6.84-7.632,4.1,0,6.984,3.1,6.984,7.632v15.48C-136.406-5.9-139.286-2.808-143.39-2.808Zm27.82-33.984A8.619,8.619,0,0,0-123.2-32.76c-.144.288-.36.288-.36,0v-2.808a.68.68,0,0,0-.72-.72h-2.376a.68.68,0,0,0-.72.72V-.72a.68.68,0,0,0,.72.72h2.376a.68.68,0,0,0,.72-.72V-24.768c0-5.4,2.592-8.64,6.84-8.64,4.1,0,6.48,3.024,6.48,8.208V-.72a.68.68,0,0,0,.72.72h2.376a.68.68,0,0,0,.72-.72V-25.56C-106.426-32.616-109.738-36.792-115.57-36.792Zm17.164-5.328a4.348,4.348,0,0,0,4.464-4.608,4.5,4.5,0,0,0-4.464-4.536,4.476,4.476,0,0,0-4.32,4.536A4.318,4.318,0,0,0-98.406-42.12ZM-107.694,14.9c11.16.072,12.744-4.824,12.744-12.888V-35.928a.68.68,0,0,0-.72-.72h-5.472a.68.68,0,0,0-.72.72V2.016c0,4.176-1.584,6.84-5.832,6.912a.68.68,0,0,0-.72.72v4.536A.68.68,0,0,0-107.694,14.9ZM-79.37.576C-71.81.576-67.2-3.888-67.2-10.8V-25.776c0-6.768-4.608-11.448-12.168-11.448-7.488,0-12.168,4.68-12.168,11.448V-10.8C-91.538-3.888-86.858.576-79.37.576Zm0-6.048c-3.1,0-5.256-2.376-5.256-5.832v-14.04c0-3.456,2.16-5.9,5.256-5.9s5.256,2.448,5.256,5.9V-11.3C-74.114-7.848-76.274-5.472-79.37-5.472Zm32.14-30.456V-12.1c0,4.1-1.872,6.624-5.112,6.624-3.168,0-4.9-2.016-4.9-6.192V-35.928a.68.68,0,0,0-.72-.72H-63.43a.68.68,0,0,0-.72.72v25.776C-64.15-2.592-59.9.5-54.5.5c2.88,0,5.328-.864,6.912-3.384.144-.216.36-.216.36.072V-.72a.68.68,0,0,0,.72.72h5.472a.68.68,0,0,0,.72-.72V-35.928a.68.68,0,0,0-.72-.72H-46.51A.68.68,0,0,0-47.23-35.928Zm24.868-1.08c-3.456,0-5.472,2.232-6.7,5.328-.072.288-.288.216-.288-.072v-4.176a.68.68,0,0,0-.72-.72h-5.472a.68.68,0,0,0-.72.72V-.72a.68.68,0,0,0,.72.72h5.472a.68.68,0,0,0,.72-.72V-21.744c0-4.176,2.16-7.56,5.184-7.92a6.174,6.174,0,0,1,3.312.288c.5.144.792.072.864-.432l1.08-5.472a.822.822,0,0,0-.36-.936A5.709,5.709,0,0,0-22.362-37.008Zm19.108-.144a9.054,9.054,0,0,0-7.272,3.168c-.216.216-.432.144-.432-.072v-1.872a.68.68,0,0,0-.72-.72H-17.15a.68.68,0,0,0-.72.72V-.72a.68.68,0,0,0,.72.72h5.472a.68.68,0,0,0,.72-.72V-24.552c0-4.176,1.944-6.624,5.256-6.624,3.1,0,4.9,2.3,4.9,6.336V-.72A.68.68,0,0,0-.086,0H5.386a.68.68,0,0,0,.72-.72v-24.7C6.106-32.832,2.794-37.152-3.254-37.152ZM21.4-37.224c-6.552,0-11.376,4.176-11.88,10.368a.68.68,0,0,0,.72.72H16.07a.646.646,0,0,0,.72-.72,4.563,4.563,0,0,1,4.464-4.392c3.024,0,5.184,2.664,5.184,6.7v2.088a.31.31,0,0,1-.288.288H21.974c-7.488,0-13.68,3.168-13.68,12.1,0,9,6.264,10.656,10.368,10.656,3.024,0,5.616-.864,7.416-3.024.216-.216.36-.072.36.144V-.72a.68.68,0,0,0,.72.72H32.63a.68.68,0,0,0,.72-.72V-25.2C33.35-32.472,28.382-37.224,21.4-37.224ZM20.174-5.472c-2.664,0-4.752-1.512-4.752-5.184,0-4.1,2.664-6.048,6.336-6.048H26.15a.31.31,0,0,1,.288.288v4.9C26.438-7.488,23.27-5.472,20.174-5.472ZM37.122,0h5.472a.68.68,0,0,0,.72-.72V-49.68a.68.68,0,0,0-.72-.72H37.122a.68.68,0,0,0-.72.72V-.72A.68.68,0,0,0,37.122,0ZM63.574-49.68V-34.2c0,.216-.144.36-.36.144a8.992,8.992,0,0,0-6.912-3.1c-6.264,0-10.008,4.248-10.008,11.376V-10.8C46.294-3.96,49.894.576,56.3.576a9.244,9.244,0,0,0,6.912-3.1c.216-.216.36-.072.36.144V-.72a.68.68,0,0,0,.72.72h5.472a.68.68,0,0,0,.72-.72V-49.68a.68.68,0,0,0-.72-.72H64.294A.68.68,0,0,0,63.574-49.68ZM63.5-25.344v14.112C63.5-7.776,61.486-5.4,58.39-5.4s-5.184-2.376-5.184-5.832V-25.344c0-3.456,2.088-5.9,5.184-5.9S63.5-28.8,63.5-25.344ZM98.018-16.2v-9.576c0-6.768-4.536-11.448-12.1-11.448-7.416,0-12.1,4.68-12.1,11.448V-10.8c0,6.912,4.68,11.376,12.1,11.376C93.05.576,97.154-3.24,97.8-9.36a.6.6,0,0,0-.648-.72l-5.328-.288a.713.713,0,0,0-.792.576A5.129,5.129,0,0,1,85.922-5.4c-3.024,0-5.184-2.448-5.184-5.9v-3.888a.31.31,0,0,1,.288-.288H97.3A.68.68,0,0,0,98.018-16.2Zm-12.1-15.048c3.168,0,5.256,2.448,5.256,5.9v3.816a.31.31,0,0,1-.288.288H81.026a.31.31,0,0,1-.288-.288v-3.816C80.738-28.8,82.9-31.248,85.922-31.248Zm29.26-5.9a9.028,9.028,0,0,0-6.84,2.952c-.216.288-.432.216-.432,0V-49.68a.68.68,0,0,0-.72-.72h-5.472a.68.68,0,0,0-.72.72V-.72a.68.68,0,0,0,.72.72h5.472a.68.68,0,0,0,.72-.72V-2.376c0-.216.144-.36.36-.144a9.244,9.244,0,0,0,6.912,3.1C121.59.576,125.19-3.96,125.19-10.8V-25.776C125.19-32.9,121.446-37.152,115.182-37.152Zm3.1,11.808v14.112c0,3.456-2.088,5.832-5.184,5.832s-5.112-2.376-5.112-5.832V-25.344c0-3.456,2.016-5.9,5.112-5.9S118.278-28.8,118.278-25.344ZM140.05.576c7.56,0,12.168-4.464,12.168-11.376V-25.776c0-6.768-4.608-11.448-12.168-11.448-7.488,0-12.168,4.68-12.168,11.448V-10.8C127.882-3.888,132.562.576,140.05.576Zm0-6.048c-3.1,0-5.256-2.376-5.256-5.832v-14.04c0-3.456,2.16-5.9,5.256-5.9s5.256,2.448,5.256,5.9V-11.3C145.306-7.848,143.146-5.472,140.05-5.472Zm29.4-31.536c-3.456,0-5.472,2.232-6.7,5.328-.072.288-.288.216-.288-.072v-4.176a.68.68,0,0,0-.72-.72h-5.472a.68.68,0,0,0-.72.72V-.72a.68.68,0,0,0,.72.72h5.472a.68.68,0,0,0,.72-.72V-21.744c0-4.176,2.16-7.56,5.184-7.92a6.174,6.174,0,0,1,3.312.288c.5.144.792.072.864-.432l1.08-5.472a.822.822,0,0,0-.36-.936A5.709,5.709,0,0,0,169.454-37.008ZM190-49.68V-34.2c0,.216-.144.36-.36.144a8.992,8.992,0,0,0-6.912-3.1c-6.264,0-10.008,4.248-10.008,11.376V-10.8c0,6.84,3.6,11.376,10.008,11.376a9.244,9.244,0,0,0,6.912-3.1c.216-.216.36-.072.36.144V-.72a.68.68,0,0,0,.72.72h5.472a.68.68,0,0,0,.72-.72V-49.68a.68.68,0,0,0-.72-.72h-5.472A.68.68,0,0,0,190-49.68Zm-.072,24.336v14.112c0,3.456-2.016,5.832-5.112,5.832s-5.184-2.376-5.184-5.832V-25.344c0-3.456,2.088-5.9,5.184-5.9S189.93-28.8,189.93-25.344Z" transform="translate(199 72)"/>
    <circle id="Oval" cx="7" cy="7" r="7" transform="translate(408 45)" fill="#9d00e0"/>
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

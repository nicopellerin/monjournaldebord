import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useMedia } from 'react-use-media'
import { useRouter } from 'next/router'

import { JournalContext } from '../../context/JournalProvider'

interface Props {
  profil?: boolean
  white?: boolean
}

export const Footer: React.FC<Props> = ({ profil, white }) => {
  const { journalsLoading } = useContext(JournalContext)

  const dateYear = new Date()

  const isMobile = useMedia({
    maxWidth: 500,
  })

  const { pathname } = useRouter()

  if (journalsLoading || pathname === '/chat') {
    return null
  }

  if (profil && isMobile) {
    return (
      <WrapperProfil
        noBackground={
          pathname === '/profil' ||
          pathname === '/profil/moods' ||
          pathname === '/profil/info' ||
          pathname === '/journal/liste' ||
          pathname === '/journal/recherche'
            ? true
            : false
        }
      >
        <Text>
          &copy; {dateYear.getFullYear()} monjournaldebord. Fait par Nico
          Pellerin. Tous droits réservés.
        </Text>
      </WrapperProfil>
    )
  }

  if (profil) {
    return null
    // return (
    //   <WrapperProfil
    //     noBackground={
    //       pathname === '/profil' ||
    //       pathname === '/profil/moods' ||
    //       pathname === '/profil/info' ||
    //       pathname === '/journal/liste' ||
    //       pathname === '/journal/recherche'
    //         ? true
    //         : false
    //     }
    //   >
    //     <Text>
    //       &copy; {dateYear.getFullYear()} monjournaldebord. Fait avec{' '}
    //       <motion.div
    //         initial={{ y: 3 }}
    //         animate={{
    //           scale: [1, 1.1],
    //           transition: {
    //             yoyo: Infinity,
    //             duration: 1,
    //           },
    //         }}
    //       >
    //         <FaHeart color="red" style={{ margin: '0 0.5rem' }} />
    //       </motion.div>
    //       par Nico Pellerin. Tous droits réservés.
    //     </Text>
    //   </WrapperProfil>
    // )
  }

  if (isMobile) {
    return null
  }

  return (
    <Wrapper>
      <Text white={white}>
        &copy; {dateYear.getFullYear()} monjournaldebord. Fait avec{' '}
        <motion.div
          initial={{ y: 3 }}
          animate={{
            scale: [1, 1.1],
            transition: {
              yoyo: Infinity,
              duration: 1,
            },
          }}
        >
          <FaHeart color="red" style={{ margin: '0 0.5rem' }} />
        </motion.div>
        par Nico Pellerin. Tous droits réservés.
      </Text>
    </Wrapper>
  )
}

// Styles
const WrapperProfil = styled.footer`
  padding-top: 4rem;
  padding-bottom: 6rem;
  background: ghostwhite;
  ${(props: { noBackground?: boolean }) =>
    props.noBackground && 'background: white'};
`

const Wrapper = styled.footer`
  position: fixed;
  bottom: 4rem;
  left: 50%;
  transform: translate(-50%);
  width: 100%;

  @media (max-width: 500px) {
    bottom: 5rem;
  }
`

const Text = styled.span`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  ${(props: { white?: boolean }) => props.white && `color: white`};

  @media (max-width: 500px) {
    max-width: 35ch;
    text-align: center;
    margin: 0 auto;
    line-height: 1.4em;
  }
`

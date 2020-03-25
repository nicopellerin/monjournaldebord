import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaUserAlt, FaSignInAlt } from 'react-icons/fa'
import Link from 'next/link'
import { useMedia } from 'react-use-media'

import { Logo } from '../Logo'

export const Hero = () => {
  const isMobile = useMedia({
    maxWidth: 500,
  })

  const bgImg = isMobile ? '/bg.jpg' : '/bg.webp'

  return (
    <Wrapper bgImg={bgImg}>
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            y: [-20, 5, 0],
            opacity: [0, 1],
            transition: { delay: 0.1 },
          }}
        >
          <Logo width={isMobile ? 36.5 : 80} />
        </motion.div>
        <Tagline
          initial={{ opacity: 0 }}
          animate={{
            y: [-20, 5, 0],
            opacity: [0, 1],
            transition: { delay: 0.3 },
          }}
        >
          Créer ton propre journal de bord en ligne. Facile d'utilisation et
          100% gratuit.
        </Tagline>
        <ButtonGroup
          initial={{ opacity: 0 }}
          animate={{
            y: [-20, 5, 0],
            opacity: [0, 1],
            transition: { delay: 0.5 },
          }}
        >
          <Link href="/connexion">
            <ButtonLogin
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignInAlt style={{ marginRight: 7 }} />
              Se connecter
            </ButtonLogin>
          </Link>
          <Link href="/inscription">
            <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <FaUserAlt style={{ marginRight: 7 }} />
              Inscrivez-vous
            </Button>
          </Link>
        </ButtonGroup>
      </Container>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  background: ${(props: { bgImg: string }) =>
    props.bgImg &&
    `linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.99)
    ),
    url('${props.bgImg}')`};
  background-size: cover;

  height: calc(100vh - 4rem);
  padding: 8rem;
  background-size: cover;
  background-position: 50%;
  margin: 2rem;

  @media (max-width: 500px) {
    height: 100vh;
    padding: 2rem;
    margin: 0;
  }
`

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Tagline = styled(motion.span)`
  display: block;
  font-size: 2rem;
  margin-top: 4rem;
  margin-bottom: 6rem;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 1.6rem;
    line-height: 1.6em;
    max-width: 90%;
    margin-top: 3rem;
    margin-bottom: 5rem;
  }
`

const ButtonGroup = styled(motion.div)`
  display: flex;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`

const Button = styled(motion.button)`
  border: none;
  padding: 1.2em 2.2em;
  background: var(--primaryColor);
  border-bottom: 3px solid #440061;
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.6rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
  @media (max-width: 500px) {
    font-size: 1.4rem;
  }
`

const ButtonLogin = styled(motion.button)`
  border: none;
  padding: 1.2em 2.2em;
  background: ghostwhite;
  border-bottom: 3px solid #ddd;
  color: #333;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.6rem;
  margin-right: 3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
  @media (max-width: 500px) {
    margin-right: 0;
    margin-bottom: 2rem;
    font-size: 1.4rem;
  }
`

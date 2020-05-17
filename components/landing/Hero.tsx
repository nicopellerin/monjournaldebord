import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaUserAlt, FaSignInAlt } from 'react-icons/fa'
import Link from 'next/link'
import { useMedia } from 'react-use-media'

import { Logo } from '../shared/Logo'
import { dots, wave } from '../../utils/imagesBase64'

export const Hero = () => {
  const isMobile = useMedia({
    maxWidth: 500,
  })

  const isTablet = useMedia({
    maxWidth: 768,
  })

  let logoWidth
  if (isMobile) {
    logoWidth = 36.5
  } else if (isTablet) {
    logoWidth = 65
  } else {
    logoWidth = 60
  }

  const windowImg = isMobile ? '/window@2x.png' : '/window@2x.webp'
  const dotsBgImg = isMobile ? '/dots.png' : '/dots.webp'

  return (
    <Wrapper dotsBgImg={dotsBgImg}>
      <Container
        isTablet={isTablet}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          y: [-20, 0],
          opacity: [0, 1],
        }}
      >
        <motion.div>
          <Logo width={logoWidth} />
        </motion.div>
        <Tagline>
          Créer ton propre journal de bord en ligne. Facile d'utilisation, privé
          et 100% gratuit.
        </Tagline>
        <ButtonGroup>
          <Link href="/connexion">
            <ButtonLogin whileHover={{ y: -1 }} whileTap={{ y: 1 }}>
              <FaSignInAlt style={{ marginRight: 7 }} />
              Se connecter
            </ButtonLogin>
          </Link>
          <Link href="/inscription">
            <Button whileHover={{ y: -1 }} whileTap={{ y: 1 }}>
              <FaUserAlt style={{ marginRight: 7 }} />
              Inscrivez-vous
            </Button>
          </Link>
        </ButtonGroup>
        <Dots src={dots} alt="" />
      </Container>
      <BrowserWindow
        src={windowImg}
        alt=""
        initial={{ x: '-50%', opacity: 0 }}
        animate={{
          y: isTablet ? [15, -160] : [320, 50],
          x: '-50%',
          opacity: [0, 1],
          transition: { delay: 0.4 },
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 100,
          delay: 0.2,
        }}
      />
      <Wave
        src={wave}
        alt=""
        initial={{ y: 300 }}
        animate={{
          y: [300, 20],
        }}
      />
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  border-top: 5px solid rgba(187, 102, 204, 1);
  height: 100vh;
  padding: 8rem;
  background: ${(props: { dotsBgImg: string }) => `url('${props.dotsBgImg}')`};

  @media (max-width: 768px) {
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
  height: ${(props: { isTablet: boolean }) =>
    props.isTablet ? '90vh' : '50vh'};
  position: relative;
  z-index: 200;

  @media (min-width: 1600px) {
    height: 40vh;
  }
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
  margin-bottom: 5rem;

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

const Wave = styled(motion.img)`
  position: fixed;
  left: 0;
  bottom: -50px;
  right: 0;
  @media (max-width: 500px) {
    bottom: -75px;
  }
`

const BrowserWindow = styled(motion.img)`
  position: fixed;
  left: 50%;
  bottom: -150px;
  right: 0;
  width: 70vw;

  @media (max-width: 1366px) {
    bottom: -20px;
  }

  @media (max-width: 500px) {
    bottom: -170px;
    width: 100%;
  }
`

const Dots = styled(motion.img)``

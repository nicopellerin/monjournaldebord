import * as React from 'react'
import styled from 'styled-components'
import { FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useMedia } from 'react-use-media'

export const Footer = () => {
  const dateYear = new Date()

  const isMobile = useMedia({
    maxWidth: 500,
  })

  if (isMobile) {
    return (
      <Wrapper>
        <Text>
          Copyright &copy; {dateYear.getFullYear()}. Fait par Nicolas Pellerin.
          Tous droits réservés.
        </Text>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Text>
        Copyright &copy; {dateYear.getFullYear()}. Fait avec{' '}
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
        par Nicolas Pellerin. Tous droits réservés.
      </Text>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.footer`
  position: fixed;
  bottom: 8rem;
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

  @media (max-width: 500px) {
    max-width: 35ch;
    text-align: center;
    margin: 0 auto;
    line-height: 1.4em;
  }
`

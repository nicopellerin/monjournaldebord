import * as React from 'react'
import styled from 'styled-components'
import { FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'

export const Footer = () => {
  const dateYear = new Date()
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
  bottom: 6rem;
  left: 50%;
  transform: translate(-50%);
`

const Text = styled.span`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
`

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaUserAlt } from 'react-icons/fa'
import Link from 'next/link'

export const Hero = () => {
  return (
    <Wrapper>
      <Container
        animate={{
          y: [-20, 5, 0],
          opacity: [0, 1],
          transition: { delay: 0.2 },
        }}
      >
        <Title>Votre journal</Title>
        <Tagline>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
          dolores!
        </Tagline>
        <Link href="/inscription">
          <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <FaUserAlt style={{ marginRight: 7 }} />
            Inscrivez-vous
          </Button>
        </Link>
      </Container>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  background: #eee;
  border-bottom: 3px solid rgba(148, 0, 211, 0.1);
  height: 65vh;
  padding: 8rem;
  background-size: cover;
  background-position: 50%;
`

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Title = styled.h2`
  font-size: 7rem;
  max-width: 13ch;
  line-height: 1.1em;
  margin-bottom: 3rem;
  text-align: center;
`

const Tagline = styled.span`
  display: block;
  font-size: 2rem;
  margin-bottom: 5rem;
`

const Button = styled(motion.button)`
  border: none;
  padding: 1.2em 2.2em;
  background: var(--primaryColor);
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
`

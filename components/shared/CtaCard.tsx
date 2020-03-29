import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '../Logo'
import { useMedia } from 'react-use-media'

type Props = {
  title: string
  render: React.ReactNode
}

export const CtaCard: React.FC<Props> = ({ title, render }) => {
  const isMobile = useMedia({
    maxWidth: 500,
  })

  return (
    <AnimatePresence>
      <Wrapper
        initial={{ opacity: 0, y: 200 }}
        animate={{
          y: [100, 0],
          opacity: [0, 1],
        }}
        exit={{}}
      >
        <Logo width={isMobile ? 30 : 35} />
        <Title>{title}</Title>
        {render}
      </Wrapper>
    </AnimatePresence>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  padding: 6rem 5rem;
  /* border: 1px solid #ddd; */
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 15px;
  width: 80ch;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;

  @media (max-width: 500px) {
    padding: 5rem 3rem;
    width: 85%;
  }
`

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 400;
  margin-top: 2rem;
  margin-bottom: 3rem;
  color: #666;

  /* @media (max-width: 500px) {
    font-size: 2.2rem;
  } */
`

import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '../Logo'

type Props = {
  title: string
  render: React.ReactNode
}

export const CtaCard: React.FC<Props> = ({ title, render }) => {
  return (
    <AnimatePresence>
      <Wrapper
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        exit={{ y: 20 }}
        transition={{ damping: 500 }}
      >
        <Logo width={30} />
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
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 80ch;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
`

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 400;
  margin-top: 2rem;
  margin-bottom: 3rem;
  color: #666;
`

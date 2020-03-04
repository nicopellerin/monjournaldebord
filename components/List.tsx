import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaNewspaper, FaHome } from 'react-icons/fa'
import Link from 'next/link'

import { ListItem } from './ListItem'

import { JournalContext } from '../context/JournalProvider'

export const List: React.FC = () => {
  const { journals } = useContext(JournalContext)

  return (
    <Wrapper>
      <Link href="/profil">
        <Title style={{ marginBottom: '1.2rem', cursor: 'pointer' }}>
          <FaHome style={{ marginRight: 5 }} />
          Accueil
        </Title>
      </Link>
      <Title style={{ marginBottom: '1rem' }}>
        <FaNewspaper style={{ marginRight: 5 }} />
        Journaux
      </Title>
      <ListStyled>
        {journals.map(item => (
          <ListItem key={item.id} {...item} />
        ))}
      </ListStyled>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primaryColor);
  width: 100%;
  background: #eee;
  padding: 1.3rem 0;
  margin: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`

const ListStyled = styled(motion.ul)`
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;

  & > li {
    /* border-bottom: 1px solid #ddd; */
    margin-bottom: 0.5rem;
    /* border-top: 1px solid #ddd; */
  }

  /* & > li:first-child {
  } */
`

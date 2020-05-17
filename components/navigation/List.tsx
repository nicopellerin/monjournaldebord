import * as React from 'react'
import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { FaNewspaper, FaHome, FaRegSmile, FaCaretRight } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ListItem } from './ListItem'

import { JournalContext } from '../../context/JournalProvider'

export const List: React.FC = () => {
  const { journals } = useContext(JournalContext)

  const { pathname } = useRouter()

  return (
    <Wrapper>
      <Link href="/profil">
        <Title
          style={{ marginBottom: '1.2rem', cursor: 'pointer' }}
          active={pathname === '/profil' ? true : false}
        >
          <FaHome style={{ marginRight: 10 }} />
          Accueil
        </Title>
      </Link>
      <Link href="/profil/moods">
        <Title
          style={{ marginBottom: '1.2rem', cursor: 'pointer' }}
          active={pathname === '/profil/moods' ? true : false}
        >
          <FaRegSmile style={{ marginRight: 10 }} />
          Moods
        </Title>
      </Link>
      <Link href="/journal/liste">
        <Title
          style={{ marginBottom: '1rem', cursor: 'pointer' }}
          active={pathname.includes('/journal') ? true : false}
        >
          <FaNewspaper style={{ marginRight: 10 }} />
          Publications
        </Title>
      </Link>
      <NavStyled>
        <AnimateSharedLayout>
          <ListStyled>
            {journals?.slice(0, 6).map((item) => (
              <ListItem layoutId="listItem" key={item.id} {...item} />
            ))}
          </ListStyled>
        </AnimateSharedLayout>
      </NavStyled>
      {journals?.length > 6 && (
        <Link href="/journal/liste">
          <AllJournals whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <FaCaretRight />
            Voir liste complète ({journals?.length})
          </AllJournals>
        </Link>
      )}
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
  color: #440061;
  width: 100%;
  border: 1px solid #eee;
  background: ${(props) => props.theme.colors.sideBarItemBackground};
  /* background: #f6f6f6; */
  transition: color background 100ms ease-in-out;
  ${(props: { active?: boolean }) =>
    props.active &&
    css`
      font-weight: 600;
    `}
  padding: 1.6rem 0;
  padding-left: 5rem;
  margin: 0;
`

const NavStyled = styled.nav`
  width: 100%;
`

const ListStyled = styled(motion.ul)`
  width: 100%;
  margin: 0;
  padding: 0;
`

const AllJournals = styled(motion.button)`
  border: 1px solid #eee;
  background: white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 2rem;
  color: var(--primaryColor);
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
`

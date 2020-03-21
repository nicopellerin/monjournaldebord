import * as React from 'react'
import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FaSearch, FaTimesCircle } from 'react-icons/fa'
import useDebouncedEffect from 'use-debounced-effect'
import Router from 'next/router'
import { motion } from 'framer-motion'

import { JournalContext } from '../context/JournalProvider'
import { AnimatePresence } from 'framer-motion'

export const NavbarSearch: React.FC = () => {
  const [titleInput, setTitleInput] = useState('')

  const { searchJournals, search } = useContext(JournalContext)

  useDebouncedEffect(() => searchJournals(titleInput, Router), 500, [
    titleInput,
  ])

  useEffect(() => {
    if (!search.length && Router.router.pathname === '/recherche') {
      Router.push('/profil')
    }
  }, [search])

  function clearField() {
    setTitleInput('')
  }

  return (
    <Wrapper>
      <FaSearch style={{ fontSize: '1.6rem', marginRight: 7, color: '#333' }} />
      <InputWrapper>
        <Input
          name="title"
          value={titleInput}
          placeholder="Recherche par titre..."
          onChange={e => setTitleInput(e.target.value)}
        />
        {search && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CloseIcon onClick={clearField} />
            </motion.div>
          </AnimatePresence>
        )}
      </InputWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`
const Input = styled.input`
  border: none;
  border-bottom: 1px solid #ddd;
  padding: 0.8rem 0.1rem;
  width: 30rem;
  font-size: 1.4rem;
  background: none;

  &::placeholder {
    color: #aaa;
  }
`

const InputWrapper = styled.div`
  position: relative;
`

const CloseIcon = styled(FaTimesCircle)`
  position: absolute;
  font-size: 1.6rem;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  right: 0;
  cursor: pointer;
`

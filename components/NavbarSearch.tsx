import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

export const NavbarSearch: React.FC = () => {
  return (
    <Wrapper>
      <FaSearch style={{ fontSize: '1.6rem', marginRight: 7, color: '#333' }} />
      <Input placeholder="Recherche par titre..." />
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
  padding: 0.6rem 0.1rem;
  width: 30rem;
  font-size: 1.4rem;
`

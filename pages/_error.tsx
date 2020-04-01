import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import Router from 'next/router'

const Error = () => {
  useEffect(() => {
    Router.push('/')
  }, [])
  return <ErrorWrapper>Erreur</ErrorWrapper>
}

export default Error

const ErrorWrapper = styled.div`
  padding: 8rem 1rem;
  min-height: 60rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

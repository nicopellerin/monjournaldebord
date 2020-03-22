import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

class Error extends React.Component {
  static async getInitialProps(ctx) {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: '/' })
      ctx.res.end()
      return {}
    }
  }
  render() {
    return <ErrorWrapper>Erreur 404</ErrorWrapper>
  }
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

const Title = styled.h1`
  margin-bottom: 5rem;
`

const Subtitle = styled.h6`
  font-weight: 500;
  margin-bottom: 2rem;
  color: var(--tertiaryColor);
`

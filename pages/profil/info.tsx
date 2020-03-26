import * as React from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import { ProfilInfo } from '../../components/ProfilInfo'

const ProfilInfoPage = () => {
  return (
    <>
      <Head>
        <title>Info profil | monjournaldebortd</title>
      </Head>
      <Wrapper>
        <ProfilInfo />
      </Wrapper>
    </>
  )
}

export default ProfilInfoPage

// Styles
const Wrapper = styled.div`
  padding: 10rem 9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60rem;
  margin: 0 auto;

  @media (max-width: 500px) {
    padding: 1.5rem;
    width: 100%;
  }
`

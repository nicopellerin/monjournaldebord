import * as React from 'react'
import styled from 'styled-components'

import { ProfilInfo } from '../../components/ProfilInfo'

const ProfilInfoPage = () => {
  return (
    <>
      <Wrapper>
        <ProfilInfo />
      </Wrapper>
    </>
  )
}

export default ProfilInfoPage

// Styles
const Wrapper = styled.div`
  padding: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60rem;
  margin: 0 auto;
`

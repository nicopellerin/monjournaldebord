import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { NextPage } from 'next'
import Head from 'next/head'

import { ProfilMoods } from '../../../components/ProfilMoods'
import { NoMoods } from '../../../components/NoMoods'

import { MoodsContext } from '../../../context/MoodsProvider'

const MoodsPage: NextPage = () => {
  const { moods, loadingMoods } = useContext(MoodsContext)
  return (
    <>
      <Head>
        <title>Moods | monjournaldebord</title>
      </Head>
      <Title>&middot; Moods &middot;</Title>
      {!loadingMoods && moods?.length < 1 && <NoMoods />}
      {!loadingMoods && moods?.length >= 1 && <ProfilMoods list={moods} />}
    </>
  )
}

export default MoodsPage

// Styles
const Title = styled.h2`
  font-size: 4.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0;
  padding-top: 8rem;

  @media (max-width: 500px) {
    font-size: 3.8rem;
  }
`

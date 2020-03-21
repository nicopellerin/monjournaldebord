import * as React from 'react'
import { useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { ProfilMoods } from '../../components/ProfilMoods'
import { NoMoods } from '../../components/NoMoods'

import { MoodsContext } from '../../context/MoodsProvider'

const MoodsPage: NextPage = () => {
  const { moods } = useContext(MoodsContext)
  return (
    <>
      <Head>
        <title>Moods | monjournaldebord</title>
      </Head>
      {moods ? <ProfilMoods /> : <NoMoods />}
    </>
  )
}

export default MoodsPage

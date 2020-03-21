import * as React from 'react'
import { useContext } from 'react'
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
      {!loadingMoods && moods?.length < 1 && <NoMoods />}
      {!loadingMoods && moods?.length >= 1 && <ProfilMoods />}
    </>
  )
}

export default MoodsPage

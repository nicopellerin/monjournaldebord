import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { ProfilMoods } from '../../components/ProfilMoods'

const MoodsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Moods | monjournaldebord</title>
      </Head>
      <ProfilMoods />
    </>
  )
}

export default MoodsPage

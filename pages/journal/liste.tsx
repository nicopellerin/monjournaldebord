import * as React from 'react'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import nextCookie from 'next-cookies'
import axios from 'axios'
import saveAs from 'file-saver'
import format from 'date-fns/format'
import { motion } from 'framer-motion'
import { Circle } from 'better-react-spinkit'
import { FaFilePdf } from 'react-icons/fa'

import { ProfilMoods } from '../../components/ProfilMoods'

import { JournalContext } from '../../context/JournalProvider'

const ListePage = () => {
  const [exporting, setExporting] = useState(false)

  const { journals } = useContext(JournalContext)

  const handleAllPdfsExport = async () => {
    setExporting(true)

    try {
      const res = await axios.post('/api/generate-all-pdfs', journals, {
        responseType: 'blob',
      })

      const datePDF = format(new Date(), 'yyyy-MM-dd')
      const filename = `monjournaldebord-${datePDF}.pdf`

      saveAs(res.data, filename)
    } catch (err) {
      console.error(err)
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Publications | monjournaldebord</title>
      </Head>
      <Wrapper>
        <Title>&middot; Publications &middot;</Title>
        <ProfilMoods list={journals} />
        <ButtonWrapper>
          <ButtonExportAllPdfs
            disabled={exporting}
            onClick={handleAllPdfsExport}
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
          >
            {exporting ? (
              <Circle />
            ) : (
              <>
                <FaFilePdf style={{ marginRight: 5 }} />
                Exporter publications format PDF
              </>
            )}
          </ButtonExportAllPdfs>
        </ButtonWrapper>
      </Wrapper>
    </>
  )
}

ListePage.getInitialProps = async ctx => {
  const { token_login: token } = nextCookie(ctx)

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/connexion' })
      ctx.res.end()
    }
  }

  return token || {}
}

export default ListePage

// Styles
const Wrapper = styled.div`
  padding: 8rem;
  background: url('/dots.webp');
  min-height: 100vh;

  @media (max-width: 500px) {
    padding: 8rem 2rem;
  }
`

const Title = styled.h2`
  font-size: 4.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8rem;

  @media (max-width: 500px) {
    font-size: 3.8rem;
  }
`

const ButtonWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`

const ButtonExportAllPdfs = styled(motion.button)`
  border: none;
  border-bottom: 3px solid #440061;
  padding: 1em 1.5em;
  background: whitesmoke;
  color: #440061;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
  width: 280px;
`

import * as React from 'react'
import { useState, useContext } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import { ProcessStep1 } from './process/ProcessStep1'
import { ProcessStep2 } from './process/ProcessStep2'
import { ProcessStep3 } from './process/ProcessStep3'
import { ProcessStep4 } from './process/ProcessStep4'

const variants = {
  enter: direction => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: direction => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }
  },
}

export const NoJournalsProfil = () => {
  const [journal, setJournal] = useState({
    title: '',
    text: '',
    mood: '',
    image: '',
    status: 'private',
  })

  const [[page, direction], setPage] = useState([0, 0])

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <Wrapper>
      <AnimatePresence initial={false} custom={direction}>
        {page === 0 && (
          <motion.div
            style={{ position: 'absolute' }}
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 300 },
              opacity: { duration: 0.2 },
            }}
          >
            <ProcessStep1
              key={page}
              journal={journal}
              setJournal={setJournal}
              paginate={paginate}
            />
          </motion.div>
        )}
        {page === 1 && (
          <motion.div
            style={{ position: 'absolute' }}
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 200 },
              opacity: { duration: 0.2 },
            }}
          >
            <ProcessStep2
              key={page}
              journal={journal}
              setJournal={setJournal}
              paginate={paginate}
            />
          </motion.div>
        )}
        {page === 2 && (
          <motion.div
            style={{ position: 'absolute' }}
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 200 },
              opacity: { duration: 0.2 },
            }}
          >
            <ProcessStep3
              key={page}
              journal={journal}
              setJournal={setJournal}
              paginate={paginate}
            />
          </motion.div>
        )}
        {page === 3 && (
          <motion.div
            style={{ position: 'absolute' }}
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 200 },
              opacity: { duration: 0.2 },
            }}
          >
            <ProcessStep4
              journal={journal}
              setJournal={setJournal}
              paginate={paginate}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <WrapSVG
        initial={{ opacity: 0, y: 500 }}
        animate={{
          y: [100, 20],
          opacity: [0, 1],
          transition: { delay: 0.9 },
        }}
        style={{ position: 'absolute', bottom: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#9D00E0"
          fillOpacity="1"
          d="M0,160L48,149.3C96,139,192,117,288,138.7C384,160,480,224,576,250.7C672,277,768,267,864,250.7C960,235,1056,213,1152,218.7C1248,224,1344,256,1392,272L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </WrapSVG>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 200;
  background: white;
`

const WrapSVG = styled(motion.svg)``

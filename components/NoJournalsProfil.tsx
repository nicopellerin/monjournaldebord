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
  })

  const [[page, direction], setPage] = useState([0, 0])

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <Wrapper>
      <AnimatePresence initial={false}>
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

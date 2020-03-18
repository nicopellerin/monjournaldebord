import React, { Children, useContext, createContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import { useActiveIndex } from '../hooks/useActiveIndex'

export const SliderContext = createContext(null)
const springAnimation = { type: 'spring', stiffness: 150, damping: 50 }

const Slider = ({ children }) => {
  const { activeIndex, lastDirection, moveActiveIndex } = useActiveIndex(
    Children.count(children)
  )

  const xOffset = useMotionValue(0)
  const contextValue = {
    xOffset,
    lastDirection,
  }
  return (
    <Wrapper>
      <SliderContext.Provider value={contextValue}>
        <div
          style={{
            position: 'absolute',
            // overflow: 'hidden',
            width: '100%',
          }}
        >
          <AnimatePresence>
            {Children.toArray(children)[activeIndex]}
          </AnimatePresence>
        </div>
      </SliderContext.Provider>
      {Children.count(children) > 2 && (
        <Controls>
          <ControlsContainer>
            <ArrowLeft
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => moveActiveIndex(-1)}
            >
              <MdChevronLeft size={32} />
            </ArrowLeft>
            <ArrowRight
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => moveActiveIndex(1)}
            >
              <MdChevronRight size={32} />
            </ArrowRight>
          </ControlsContainer>
        </Controls>
      )}
    </Wrapper>
  )
}

// Props
Slider.propTypes = {}

export default Slider

// Styles
const Wrapper = styled.div`
  /* height: 39rem; */
  position: relative;

  @media (max-width: 500px) {
    height: 52rem;
  }
`

const ArrowLeft = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`

const ArrowRight = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`

const Controls = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  z-index: 1000;
`

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 20;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 100;
  margin: 0 auto;
`

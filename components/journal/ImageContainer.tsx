import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaTimesCircle } from 'react-icons/fa'

import { JournalContext } from '../../context/JournalProvider'

interface Props {
  setLoader: any
}

export const ImageContainer: React.FC<Props> = ({ setLoader }) => {
  const {
    imageUploaded,
    removeUploadedImageAction,
    toggleImageContainer,
    setToggleImageContainerAction,
  } = useContext(JournalContext)

  const removeImage = () => {
    setLoader('')
    removeUploadedImageAction()
  }

  const toggleVariants = {
    open: {
      x: 20,
      scale: 1,
    },
    closed: {
      y: 140,
      x: '-76%',
      scale: 0.9,
    },
    exit: {
      x: -300,
      scale: 0.9,
    },
  }

  return (
    <Wrapper
      initial="closed"
      animate={toggleImageContainer ? 'open' : 'closed'}
      exit="exit"
      variants={toggleVariants}
      transition={{
        type: 'spring',
        damping: 50,
        stiffness: 200,
        delay: 0.05,
      }}
    >
      <ImageWrapper>
        {toggleImageContainer && <CloseIcon onClick={removeImage} />}
        <ImageStyled animate src={imageUploaded} alt="Image Upload" />
      </ImageWrapper>
      <Handle onClick={() => setToggleImageContainerAction()}>
        <img src="/dots-v.svg" alt="dots" />
      </Handle>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  right: -22rem;
  height: 60%;
  background: #fafafa;
  width: 25rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-top-right-radius: 23px;
  border-bottom-right-radius: 23px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ImageWrapper = styled.div`
  position: relative;
  padding: 1rem;
  z-index: 100;
`

const ImageStyled = styled(motion.img)`
  object-fit: cover;
  object-position: center;
  max-width: 200px;
  height: 200px;
  border-radius: 100%;
  margin-left: 1rem;
  padding: 4px;
  border: 1px solid #eee;
`

const CloseIcon = styled(FaTimesCircle)`
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 2.2rem;
  color: red;
  background: white;
  border-radius: 100%;
  cursor: pointer;
  z-index: 10;
  padding: 2px;
  opacity: 0;
  transition: opacity 150ms ease-in-out;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`

const Handle = styled.div`
  width: 1.6rem;
  height: 6rem;
  background: #eef;
  position: absolute;
  right: -18px;
  top: 50%;
  transform: translateY(-50%);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

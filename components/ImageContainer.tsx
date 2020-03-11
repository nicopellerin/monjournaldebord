import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaTimesCircle } from 'react-icons/fa'

import { JournalContext } from '../context/JournalProvider'

type Props = {
  setLoader: any
}

export const ImageContainer: React.FC<Props> = ({ setLoader }) => {
  const { imageUploaded, removeUploadedImage } = useContext(JournalContext)

  const removeImage = () => {
    setLoader('')
    removeUploadedImage()
  }

  return (
    <Wrapper
      initial={{ y: 140, x: -50, scale: 0.9 }}
      animate={{ x: 20, scale: 1 }}
      exit={{ x: -300, scale: 0.9 }}
    >
      <ImageWrapper>
        <CloseIcon onClick={removeImage} />
        <Image src={imageUploaded} alt="Image Upload" />
      </ImageWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  right: -28rem;
  height: 60%;
  background: #f4f4f4;
  width: 31rem;
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
`

const Image = styled.img`
  object-fit: cover;
  object-position: center;
  max-width: 250px;
  height: 250px;
  border-radius: 5px;
`

const CloseIcon = styled(FaTimesCircle)`
  position: absolute;
  top: -7px;
  right: -7px;
  font-size: 2rem;
  color: red;
  background: white;
  border-radius: 100%;
  cursor: pointer;
`

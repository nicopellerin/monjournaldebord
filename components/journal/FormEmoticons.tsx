import * as React from 'react'
import styled, { css } from 'styled-components'

interface Props {
  emoticons: { id: number; type: string; path: string }[]
  setMood: any
  mood: string
  label?: string
  size?: boolean
}

export const FormEmoticons: React.FC<Props> = ({
  emoticons,
  mood,
  setMood,
  label,
  size,
}) => {
  function handleClick(emoticon: { id: number; type: string; path: string }) {
    setMood(emoticon.path)
  }

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <EmoticonsWrapper
        style={size && { gridGap: '3rem', marginBottom: '3rem' }}
      >
        {emoticons.map(emoticon => (
          <Emoticon
            style={
              size ? { width: '12rem', padding: '20px' } : { width: '42px' }
            }
            key={emoticon.id}
            active={emoticon.path === mood}
            src={emoticon.path}
            alt={emoticon.type}
            onClick={() => handleClick(emoticon)}
          />
        ))}
      </EmoticonsWrapper>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  margin: 2rem 0 1.8rem;
`

const EmoticonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  margin-top: 0.5rem;
`

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const Emoticon = styled.img`
  width: 42px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  ${(props: { active: boolean }) =>
    props.active &&
    css`
      background: #eee;
      border: 1px solid #ddd;
    `};

  @media (max-width: 500px) {
    width: 36px;
  }
`

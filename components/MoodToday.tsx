import * as React from 'react'
import styled from 'styled-components'

export const MoodToday = () => {
  return (
    <Wrapper>
      <Title>Mood de la journée &mdash;</Title>
      <Content>
        <Input maxLength={80} placeholder="Aujourd'hui, je me sens..." />
      </Content>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  border-radius: 5px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 2.5rem 3rem;
`

const Title = styled.h2`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.titleColor};
`

const Input = styled.input`
  border: none;
  border-radius: 5px;
  border-bottom: 1px solid #ddd;
  background: ${props => props.theme.colors.inputField};
  padding: 1.5rem 1.5rem;
  width: 60ch;
  font-size: 1.8rem;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.colors.textColor};
`

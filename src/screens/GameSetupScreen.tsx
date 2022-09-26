import React, { FC } from 'react'
import { GameSetupForm } from '../components'
import styled from 'styled-components'
import { colors } from '../styles/colors'

const GameSetupScreen: FC = () => {
  return (
    <PageWrapper>
      <GameTitle>memory</GameTitle>
      <GameSetupForm />
    </PageWrapper>
  )
}

export default GameSetupScreen

const PageWrapper = styled.div`
  background: ${colors.veryDark};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8%;
`

const GameTitle = styled.h1`
  color: ${colors.veryLight};
`

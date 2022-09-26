import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../styles/colors'
import { MenuOptionSelector } from '.'

interface IGameSetup {
  theme: string
  players: number
  boardSize: string
}

const availableOptions = {
  theme: ['Numbers', 'Icons'],
  players: [1, 2, 3, 4],
  boardSize: ['4x4', '6x6']
}

export const GameSetupForm: FC<IGameSetup> = ({
  theme = availableOptions.theme[0],
  players = availableOptions.players[0],
  boardSize = availableOptions.boardSize[0]
}) => {
  const [selectedTheme, setSelectedTheme] = useState(theme)
  const [selectedPlayers, setSelectedPlayers] = useState(players)
  const [selectedBoardSize, setSelectedBoardSize] = useState(boardSize)

  return (
    <FormWrapper>
      <Label>Select Theme</Label>
      <MenuOptionSelector
        values={availableOptions.theme}
        onChange={setSelectedTheme}
        initSelected={selectedTheme}
      />
      <Label>Number of Players</Label>
      <MenuOptionSelector
        values={availableOptions.players}
        onChange={setSelectedPlayers}
        initSelected={selectedPlayers}
      />
      <Label>Grid Size</Label>
      <MenuOptionSelector
        values={availableOptions.boardSize}
        onChange={setSelectedBoardSize}
        initSelected={selectedBoardSize}
      />
      <StartGameLink>Start Game</StartGameLink>
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  width: 100%;
  height: 100%;
  max-width: 654px;
  max-height: 559px;
  border-radius: 20px;
  background: ${colors.veryLight};
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Label = styled.label`
  text-align: left;
  color: ${colors.gray};
  font-family: var(--primaryFontFamily);
  font-weight: var(--primaryFontWeight);
  font-size: 22px;
  margin: 30px 0 15px;
`

const StartGameLink = styled.button`
  width: 100%;
  height: 70px;
  background: ${colors.primary};
  color: ${colors.veryLight};
  text-align: center;
  font-family: var(--primaryFontFamily);
  font-weight: var(--primaryFontWeight);
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 35px;
  margin: 40px 0;
  transition: var(--default-hover-transition);

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

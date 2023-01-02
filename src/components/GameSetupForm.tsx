import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { MenuOptionSelector } from '.';
import { Link } from 'react-router-dom';

export interface IGameSetupProps {
    theme: string;
    playersCount: number;
    boardLength: number;
}

const availableOptions = {
    theme: ['Numbers', 'Icons'],
    playersCount: [1, 2, 3, 4],
    boardLength: [4, 6]
};

export const GameSetupForm: FC<IGameSetupProps> = ({
    theme = availableOptions.theme[0],
    playersCount = availableOptions.playersCount[0],
    boardLength = availableOptions.boardLength[0]
}) => {
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const [selectedPlayersCount, setSelectedPlayersCount] = useState(playersCount);
    const [selectedBoardLength, setSelectedBoardLength] = useState(boardLength);

    return (
        <FormWrapper>
            <Label>Select Theme</Label>
            <MenuOptionSelector
                values={availableOptions.theme}
                onChange={setSelectedTheme}
                selectedValue={selectedTheme}
            />
            <Label>Number of Players</Label>
            <MenuOptionSelector
                values={availableOptions.playersCount}
                onChange={setSelectedPlayersCount}
                selectedValue={selectedPlayersCount}
            />
            <Label>Grid Size</Label>
            <MenuOptionSelector
                values={availableOptions.boardLength}
                onChange={setSelectedBoardLength}
                selectedValue={selectedBoardLength}
            />
            <Link
                style={{ display: 'contents' }}
                to={`/game/${selectedTheme}/${selectedPlayersCount}/${selectedBoardLength}`}>
                <StartBtn>Start Game</StartBtn>
            </Link>
        </FormWrapper>
    );
};

const FormWrapper = styled.form`
    width: 100%;
    height: 100%;
    max-width: 654px;
    max-height: 600px;
    border-radius: 20px;
    background: ${colors.veryLight};
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Label = styled.label`
    text-align: left;
    color: ${colors.gray};
    font-family: var(--primaryFontFamily);
    font-weight: var(--primaryFontWeight);
    font-size: 29px;
    margin: 30px 0 15px;
`;

const StartBtn = styled.button`
    width: 100%;
    height: 70px;
    background: ${colors.primary};
    text-align: center;
    font-family: var(--primaryFontFamily);
    font-weight: var(--primaryFontWeight);
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 35px;
    margin: 60px 0 20px;
    transition: var(--btn-hover-transition);
    text-decoration: none;
    color: ${colors.veryLight};

    &:hover {
        cursor: pointer;
        background: ${colors.primaryHover};
    }
`;

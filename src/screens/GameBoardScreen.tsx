import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { GameBoard } from '../components';

const GameBoardScreen: FC = () => {
    return (
        <ScreenWrapper>
            <GameTitle>memory</GameTitle>
            <GameBoard theme={'Numbers'} playersCount={3} boardLength={6} />
        </ScreenWrapper>
    );
};

export default GameBoardScreen;

const ScreenWrapper = styled.div`
    background: ${colors.veryLight};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8%;
`;

const GameTitle = styled.h1`
    color: ${colors.veryDark};
`;

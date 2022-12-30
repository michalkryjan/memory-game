import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { GameBoard } from '../components';
import { useParams } from 'react-router-dom';

const GameBoardPage: FC = () => {
    const params = useParams();

    return (
        <ScreenWrapper>
            <Title>memory</Title>
            <GameBoard
                theme={params.theme}
                playersCount={params.playersCount}
                boardLength={params.boardLength}
            />
        </ScreenWrapper>
    );
};

export default GameBoardPage;

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

const Title = styled.h1`
    color: ${colors.veryDark};
`;

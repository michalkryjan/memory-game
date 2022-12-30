import React, { FC } from 'react';
import { GameSetupForm } from '../components';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const GameSetupPage: FC = () => {
    return (
        <ScreenWrapper>
            <GameTitle>memory</GameTitle>
            <GameSetupForm />
        </ScreenWrapper>
    );
};

export default GameSetupPage;

const ScreenWrapper = styled.div`
    background: ${colors.veryDark};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8%;
    padding-bottom: 2%;
`;

const GameTitle = styled.h1`
    color: ${colors.veryLight};
`;

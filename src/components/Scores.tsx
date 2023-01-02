import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const Scores: FC = () => {
    // @ts-ignore
    const scoresList = useSelector(state => state.board.scoresList);
    const singlePlayerMode = scoresList.length === 1;

    return singlePlayerMode ? <p>Single player mode on</p> : <p>Multi player mode on</p>;
};

const scoresWrapper = styled.ul``;

const Box = styled.li``;

const playerName = styled.p``;

const playerScore = styled.p``;

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { colors } from '../styles/colors';

interface IScores {
    playersCount: number;
    secondsElapsed: number;
}

export const Scores: FC<IScores> = props => {
    // @ts-ignore
    const game = useSelector(state => state.game);
    const singlePlayerModeOn = props.playersCount === 1;

    const getReadableTime = seconds => {
        const addZeroIfOneDigit = value => {
            if (String(value).length === 1) {
                return `0${value}`;
            }
            return value;
        };
        if (seconds > 60) {
            const minutes = (seconds - (seconds % 60)) / 60;
            if (minutes > 60) {
                const hours = (minutes - (minutes % 60)) / 60;
                return `${hours}:${addZeroIfOneDigit(minutes - hours * 60)}:${addZeroIfOneDigit(
                    seconds - minutes * 60 - hours * 60 * 60
                )}`;
            } else {
                return `${minutes}:${addZeroIfOneDigit(seconds - minutes * 60)}`;
            }
        } else {
            return seconds;
        }
    };

    return singlePlayerModeOn ? (
        <ScoresWrapper>
            <ScoreCard>
                <PlayerName>Time</PlayerName>
                <PlayerPoints>{getReadableTime(props.secondsElapsed)}</PlayerPoints>
            </ScoreCard>
            <ScoreCard>
                <PlayerName>Moves</PlayerName>
                <PlayerPoints>{game.scoresList[0].moves}</PlayerPoints>
            </ScoreCard>
        </ScoresWrapper>
    ) : (
        <ScoresWrapper>
            {game.scoresList.map(score => {
                return (
                    <ScoreCard
                        key={score.playerId}
                        active={score.playerId === game.currentPlayerId}>
                        <PlayerName active={score.playerId === game.currentPlayerId}>
                            Player {score.playerId}
                        </PlayerName>
                        <PlayerPoints active={score.playerId === game.currentPlayerId}>
                            {score.points}
                        </PlayerPoints>
                    </ScoreCard>
                );
            })}
        </ScoresWrapper>
    );
};

const ScoresWrapper = styled.ul`
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    list-style-type: none;
`;

const ScoreCard = styled.li`
    flex: 1 1 0;
    max-width: 260px;
    height: 72px;
    border-radius: 10px;
    padding: 20px 25px 20px 20px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    background: ${props => (props.active ? colors.primary : '#dfe7ec')};
    transition: ease-in-out 0.4s;
`;

const PlayerName = styled.p`
    font-size: 18px;
    color: ${props => (props.active ? colors.veryLight : colors.gray)};
    transition: ease-in-out 0.4s;
`;

const PlayerPoints = styled.p`
    font-size: 32px;
    color: ${props => (props.active ? colors.veryLight : colors.dark)};
    transition: ease-in-out 0.4s;
`;

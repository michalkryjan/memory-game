import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { GameBoard, Scores } from '../components';
import { Link } from 'react-router-dom';
import { gameActions } from '../store/game-slice';
import { useDispatch, useSelector } from 'react-redux';
import { GameSummary } from '../components/GameSummary';

const GameBoardPage: FC = () => {
    const [showSummary, setShowSummary] = useState(false);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timer, setTimer] = useState(null);
    const [gameFinished, setGameFinished] = useState(false);
    const dispatch = useDispatch();

    // @ts-ignore
    const game = useSelector(state => state.game);

    useEffect(() => {
        setGameFinished(game.cardsList.filter(card => card.disabled === false).length === 0);
    }, [game]);

    useEffect(() => {
        if (!showSummary) {
            setTimer(setTimeout(() => setSecondsElapsed(prev => prev + 1), 1000));
        }
    }, [secondsElapsed, showSummary]);

    useEffect(() => {
        if (gameFinished) {
            clearTimeout(timer);
            setShowSummary(true);
        }
    }, [timer, gameFinished]);

    const startNewGame = () => {
        dispatch(
            gameActions.startNewGame({
                playersCount: game.playersCount,
                boardLength: game.boardLength,
                theme: game.theme
            })
        );
        clearTimeout(timer);
        setSecondsElapsed(0);
    };

    const getReadableTime = seconds => {
        const addZeroIfOneDigit = value => {
            if (String(value).length === 1) {
                return `0${value}`;
            }
            return value;
        };
        if (seconds > 59) {
            const minutes = (seconds - (seconds % 60)) / 60;
            if (minutes > 59) {
                const hours = (minutes - (minutes % 60)) / 60;
                return `${hours}:${addZeroIfOneDigit(minutes - hours * 60)}:${addZeroIfOneDigit(
                    seconds - minutes * 60 - hours * 60 * 60
                )}`;
            } else {
                return `${minutes}:${addZeroIfOneDigit(seconds - minutes * 60)}`;
            }
        } else {
            return `${seconds}s`;
        }
    };

    const readableTimeElapsed = getReadableTime(secondsElapsed);

    return (
        <ScreenWrapper>
            <ContentWrapper>
                <Header>
                    <Title>memory</Title>
                    <Menu>
                        <li>
                            <Button
                                primary
                                onClick={() => {
                                    startNewGame();
                                }}>
                                Restart
                            </Button>
                        </li>
                        <li>
                            <Link style={{ display: 'contents' }} to={'/'}>
                                <Button>New Game</Button>
                            </Link>
                        </li>
                    </Menu>
                </Header>
                <GameBoard
                    theme={game.theme}
                    playersCount={game.playersCount}
                    boardLength={game.boardLength}
                />
                <Scores
                    playersCount={Number(game.playersCount)}
                    timeElapsed={readableTimeElapsed}
                />
            </ContentWrapper>
            {showSummary ? (
                <GameSummary
                    onRestart={() => {
                        startNewGame();
                        setShowSummary(false);
                    }}
                    gameLength={readableTimeElapsed}
                />
            ) : null}
        </ScreenWrapper>
    );
};

export default GameBoardPage;

const ScreenWrapper = styled.div`
    background: ${colors.veryLight};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const ContentWrapper = styled.article`
    width: 100%;
    height: 100%;
    padding: 40px 20px;
    max-width: 1040px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    color: ${colors.veryDark};

    &:hover {
        cursor: default;
    }
`;

const Header = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Menu = styled.menu`
    list-style-type: none;
    display: inline-flex;
    align-items: center;
    gap: 15px;

    & > li {
        display: contents;
    }
`;

const Button = styled.button`
    height: 52px;
    border-radius: 26px;
    border: none;
    padding: 8px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 19px;
    font-weight: 700;
    letter-spacing: 0.02em;
    background: ${props => (props.primary ? colors.primary : '#dfe7ec')};
    color: ${props => (props.primary ? colors.veryLight : colors.dark)};
    transition: ${props => (props.primary ? 'ease-in-out 0.16s' : 'ease-in-out 0.2s')};

    &:hover {
        cursor: pointer;
        background: ${props => (props.primary ? colors.primaryHover : colors.secondary)};
        color: ${colors.veryLight};
    }
`;

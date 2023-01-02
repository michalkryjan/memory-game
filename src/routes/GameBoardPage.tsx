import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { GameBoard, Scores } from '../components';
import { Link, useParams } from 'react-router-dom';
import { boardActions } from '../store/board-slice';
import { useDispatch } from 'react-redux';

const GameBoardPage: FC = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const startNewGame = () => {
        dispatch(
            boardActions.startNewGame({
                playersCount: params.playersCount,
                boardLength: params.boardLength
            })
        );
    };

    useEffect(() => {
        startNewGame();
    }, [dispatch, params]);

    return (
        <ScreenWrapper>
            <ContentWrapper>
                <Header>
                    <Title>memory</Title>
                    <Menu>
                        <ul>
                            <li>
                                <RestartBtn onClick={startNewGame}>Restart</RestartBtn>
                            </li>
                            <li>
                                <Link style={{ display: 'contents' }} to={'/'}>
                                    <NewGameBtn>New Game</NewGameBtn>
                                </Link>
                            </li>
                        </ul>
                    </Menu>
                </Header>
                <GameBoard
                    theme={params.theme}
                    playersCount={params.playersCount}
                    boardLength={params.boardLength}
                />
                <Scores />
            </ContentWrapper>
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
    max-width: 1110px;
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

    & > ul,
    & > ul > li {
        display: contents;
    }
`;

const RestartBtn = styled.button`
    height: 52px;
    border-radius: 26px;
    padding: 8px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 19px;
    background: ${colors.primary};
    color: ${colors.veryLight};
    font-family: var(--primaryFontFamily);
    font-weight: var(--primaryFontWeight);
    transition: ease-in-out 0.16s;
    border: none;
    letter-spacing: 0.02em;

    &:hover {
        cursor: pointer;
        background: ${colors.primaryHover};
        opacity: 0.95;
    }
`;

const NewGameBtn = styled.button`
    height: 52px;
    border-radius: 26px;
    padding: 8px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 19px;
    background: #dfe7ec;
    font-family: var(--primaryFontFamily);
    font-weight: var(--primaryFontWeight);
    border: none;
    color: ${colors.dark};
    transition: ease-in-out 0.2s;
    letter-spacing: 0.02em;

    &:hover {
        cursor: pointer;
        background: ${colors.secondary};
        color: ${colors.veryLight};
    }
`;

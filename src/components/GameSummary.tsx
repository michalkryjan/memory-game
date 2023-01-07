import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../styles/colors';
import { useSelector } from 'react-redux';

interface IGameSummaryProps {
    onRestart: () => void;
    gameLength: string;
}

export const GameSummary: FC<IGameSummaryProps> = props => {
    // @ts-ignore
    const scoresList = useSelector(state => state.game.scoresList);
    const singlePlayerModeOn = scoresList.length === 1;

    const sortedScoresList = !singlePlayerModeOn
        ? [...scoresList].sort((a, b) => {
              if (a.points < b.points) {
                  return 1;
              }
              if (a.points > b.points) {
                  return -1;
              }
              if (a.playerId > b.playerId) {
                  return 1;
              } else {
                  return -1;
              }
          })
        : scoresList;

    const winningPoints = sortedScoresList[0].points;

    const getTitleText = () => {
        if (singlePlayerModeOn) {
            return 'You did it!';
        } else {
            const winners = sortedScoresList.filter(score => score.points === winningPoints);
            if (winners.length === 1) {
                return `Player ${winners[0].playerId} Wins!`;
            } else {
                return `It's a tie!`;
            }
        }
    };

    return (
        <>
            <Background />
            <Modal>
                <Title>{getTitleText()}</Title>
                <Subtitle>
                    {singlePlayerModeOn
                        ? 'Game over! Here’s how you got on…'
                        : 'Game over! Here are the results...'}
                </Subtitle>
                <ScoresList>
                    {singlePlayerModeOn ? (
                        <>
                            <Score>
                                <PlayerName>Time Elapsed</PlayerName>
                                <Points>{props.gameLength}</Points>
                            </Score>
                            <Score>
                                <PlayerName>Moves Taken</PlayerName>
                                <Points>{sortedScoresList[0].moves} Moves</Points>
                            </Score>
                        </>
                    ) : (
                        sortedScoresList.map(score => {
                            const isWinner = score.points === winningPoints;
                            return (
                                <Score winner={isWinner}>
                                    <PlayerName>
                                        Player {score.playerId} {isWinner ? '(Winner!)' : null}
                                    </PlayerName>
                                    <Points>{score.points} Pairs</Points>
                                </Score>
                            );
                        })
                    )}
                </ScoresList>
                <Menu>
                    <li>
                        <Button primary onClick={props.onRestart}>
                            Restart
                        </Button>
                    </li>
                    <li>
                        <Link style={{ display: 'contents' }} to={'/'}>
                            <Button>Setup New Game</Button>
                        </Link>
                    </li>
                </Menu>
            </Modal>
        </>
    );
};

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background: #363636;
    opacity: 0.7;
    position: absolute;
    z-index: 2;
`;

const Modal = styled.article`
    width: 95%;
    height: fit-content;
    max-width: 654px;
    max-height: 702px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    padding: 50px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    background: ${colors.veryLight};
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const Title = styled.h2`
    color: ${colors.varyDark};
    font-size: 48px;
`;

const Subtitle = styled.p`
    color: ${colors.gray};
    font-size: 19px;
`;

const ScoresList = styled.ol`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin: 20px 0 40px;
`;

const Score = styled.li`
    width: 100%;
    height: 72px;
    border-radius: 10px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
    background: ${props => (props.winner ? colors.veryDark : '#DFE7EC')};

    & > p:nth-of-type(1) {
        color: ${props => (props.winner ? colors.veryLight : colors.gray)};
    }

    & > p:nth-of-type(2) {
        color: ${props => (props.winner ? colors.veryLight : colors.dark)};
    }
`;

const PlayerName = styled.p`
    font-size: 18px;
`;

const Points = styled.p`
    font-size: 32px;
`;

const Menu = styled.menu`
    width: 100%;
    height: fit-content;
    display: inline-flex;
    gap: 20px;
    list-style-type: none;
    margin-top: auto;

    & > li {
        display: contents;
    }
`;

const Button = styled.button`
    flex: 1 1 0;
    height: 52px;
    border-radius: 26px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 21px;
    letter-spacing: 0.02em;
    color: ${props => (props.primary ? colors.veryLight : colors.dark)};
    background: ${props => (props.primary ? colors.primary : '#DFE7EC')};
    transition: ease-in-out 0.2s;

    &:hover {
        cursor: pointer;
        color: ${props => (props.primary ? colors.veryLight : colors.veryLight)};
        background: ${props => (props.primary ? colors.primaryHover : colors.secondary)};
    }
`;

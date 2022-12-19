import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { IGameSetupProps } from './GameSetupForm';
import { Card, ICardProps } from './Card';
import { GameBoardService, IScore } from '../services/GameBoardService';

export const GameBoard: FC<IGameSetupProps> = props => {
    console.log('GameBoard rendered');

    const onCardSelect = (cardId: number) => {
        const previouslySelected: [] | ICardProps[] = board.filter(card => card.selected === true);
        updateSingleCard(cardId, { selected: true });
        if (previouslySelected.length !== 0) {
            if (getCardById(cardId).value === previouslySelected[0].value) {
                updatePlayerScore(currentPlayer, scores[currentPlayer].score + 1);
                updateTwoCards(cardId, previouslySelected[0].id, {
                    selected: false,
                    disabled: true
                });
                nextTurn();
            } else {
                updateTwoCards(cardId, previouslySelected[0].id, { selected: false });
                nextTurn();
            }
        }
        console.log('koniec');
    };

    const [board, setBoard] = useState(
        GameBoardService.getInitialBoard(props.boardLength, onCardSelect)
    );
    const [scores, setScores] = useState(GameBoardService.getInitialScores(props.playersCount));
    const [currentPlayer, setCurrentPlayer] = useState(1);

    const updateSingleCard = (cardId: number, modifiedProps) => {
        const updatedBoard = board;
        const index = updatedBoard.findIndex(card => card.id === cardId);
        updatedBoard[index] = {
            ...board[index],
            ...modifiedProps
        } as ICardProps;
        setBoard(updatedBoard);
    };

    const updateTwoCards = (cardId1: number, cardId2: number, modifiedProps) => {
        const updatedBoard = board;
        const index1 = updatedBoard.findIndex(card => card.id === cardId1);
        const index2 = updatedBoard.findIndex(card => card.id === cardId2);
        updatedBoard[index1] = {
            ...board[index1],
            ...modifiedProps
        } as ICardProps;
        updatedBoard[index2] = {
            ...board[index2],
            ...modifiedProps
        } as ICardProps;
        setBoard(updatedBoard);
    };

    const getCardById = (id: number) => {
        return board.filter(card => card.id === id)[0];
    };

    const updatePlayerScore = (playerNumber: number, newScore: number) => {
        const updatedScores = scores;
        const index = updatedScores.findIndex(score => score.playerNumber === playerNumber);
        updatedScores[index] = {
            ...updatedScores[index],
            score: newScore
        } as IScore;
        setScores(updatedScores);
    };

    const nextTurn = () => {
        if (currentPlayer + 1 <= props.playersCount) {
            setCurrentPlayer(prev => prev + 1);
        } else {
            setCurrentPlayer(1);
        }
    };

    const renderedCards = useMemo(() => {
        return board.map(card => {
            return (
                <Card
                    key={card.id}
                    id={card.id}
                    value={card.value}
                    selected={card.selected}
                    disabled={card.disabled}
                    onSelect={card.onSelect}
                />
            );
        });
    }, [board]);

    return <Board boardLength={props.boardLength}>{renderedCards}</Board>;
};

const Board = styled.ul`
    width: 100%;
    height: 100%;
    max-height: 572px;
    max-width: 572px;
    padding: 10px;
    gap: 10px;
    display: grid;
    grid-template-columns: repeat(${props => props.boardLength}, 1fr);
    grid-template-rows: repeat(${props => props.boardLength}, 1fr);
`;

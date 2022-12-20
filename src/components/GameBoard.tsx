import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IGameSetupProps } from './GameSetupForm';
import { Card } from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../store/board-slice';

export const GameBoard: FC<IGameSetupProps> = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            boardActions.startGame({
                playersCount: props.playersCount,
                boardLength: props.boardLength
            })
        );
    }, []);

    // @ts-ignore
    const board = useSelector(state => state.board.cardsList);
    // @ts-ignore
    const selectedCardsCount = useSelector(state => state.board.selectedCardsCount);

    const onCardSelect = useCallback(
        id => {
            if (selectedCardsCount === 1) {
                setTimeout(() => {
                    dispatch(boardActions.revealCardsIfValidPair());
                }, 1200);
            }
            dispatch(
                boardActions.selectCard({
                    cardId: id
                })
            );
        },
        [board]
    );

    return (
        <Board boardLength={props.boardLength}>
            {board.map(card => {
                return (
                    <Card
                        key={card.id}
                        id={card.id}
                        value={card.value}
                        selected={card.selected}
                        disabled={card.disabled}
                        onSelect={onCardSelect}
                    />
                );
            })}
        </Board>
    );
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

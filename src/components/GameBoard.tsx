import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { IGameSetupProps } from './GameSetupForm';
import { Card } from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions } from '../store/game-slice';

export const GameBoard: FC<IGameSetupProps> = props => {
    const dispatch = useDispatch();

    // @ts-ignore
    const cards = useSelector(state => state.game.cardsList);
    // @ts-ignore
    const selectedCardsCount = useSelector(state => state.game.selectedCardsCount);

    const onCardSelect = useCallback(
        id => {
            if (selectedCardsCount === 1) {
                setTimeout(() => {
                    dispatch(gameActions.revealCardsIfValidPair());
                }, 1200);
            }
            dispatch(
                gameActions.selectCard({
                    cardId: id
                })
            );
        },
        [selectedCardsCount, dispatch]
    );

    return (
        <Board boardLength={props.boardLength}>
            {cards.map(card => {
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

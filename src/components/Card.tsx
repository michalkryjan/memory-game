import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

export interface ICardProps {
    id: number;
    value: number | string;
    onSelect: (cardId) => void;
    disabled?: boolean;
    selected?: boolean;
}

export const Card: FC<ICardProps> = props => {
    return (
        <Scene>
            <CardWrapper
                id={props.id}
                disabled={props.disabled}
                selected={props.selected}
                onClick={() => {
                    props.onSelect(props.id);
                }}>
                <CardFront>{props.value}</CardFront>
                <CardBack />
            </CardWrapper>
        </Scene>
    );
};

const Scene = styled.div`
    width: 100%;
    height: 100%;
    perspective: 600px;
`;

const CardWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    transform: ${props => (props.selected ? 'rotateX(0deg)' : 'rotateX(180deg)')};
    pointer-events: ${props => (props.selected ? 'none' : 'all')};
`;

const CardFront = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.veryLight};
    font-size: 44px;
    background: ${colors.idleGray};
`;

const CardBack = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
    border-radius: 50%;
    background: ${colors.dark};
    transform: rotateY(180deg);
`;

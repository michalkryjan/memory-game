import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

export interface ICardProps {
    id: number;
    value: number | string;
    onSelect: () => void;
    disabled?: boolean;
    selected?: boolean;
    rowIndex?: number;
    columnIndex?: number;
}

export const Card: FC<ICardProps> = props => {
    return (
        <Scene>
            <CardWrapper
                id={props.id}
                disabled={props.disabled}
                selected={props.selected}
                onClick={() => {
                    props.onSelect();
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
    transition: transform 1.1s;
    transform-style: preserve-3d;
    transform: ${props => (props.disabled ? 'rotateY(180deg)' : null)};
    transform: ${props => (props.selected ? null : 'rotateY(180deg)')};
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

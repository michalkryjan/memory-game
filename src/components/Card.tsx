import React, { FC } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { colors } from '../styles/colors';

export interface ICardProps {
    id: number;
    value: number;
    icon: IconProp;
    onSelect: (cardId) => void;
    disabled?: boolean;
    selected?: boolean;
}

export const Card: FC<ICardProps> = props => {
    // @ts-ignore
    const theme = useSelector(state => state.game.theme);

    return (
        <Scene>
            <CardWrapper
                id={props.id}
                disabled={props.disabled}
                selected={props.selected}
                onClick={() => {
                    props.onSelect(props.id);
                }}>
                <CardFront disabled={props.disabled} selected={props.selected}>
                    {theme === 'Numbers' ? (
                        props.value
                    ) : (
                        // @ts-ignore
                        <FontAwesomeIcon icon={props.icon} />
                    )}
                </CardFront>
                <CardBack />
            </CardWrapper>
        </Scene>
    );
};

const cardTransition = '0.5s';

const Scene = styled.li`
    width: 100%;
    height: 100%;
    perspective: 600px;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  transition: transform ${cardTransition};
  transform-style: preserve-3d;
  ${props => {
      if (props.selected || props.disabled) {
          return `
          pointer-events: none;
          transform: rotateX(0deg);`;
      } else {
          return `
          pointer-events: all;
          transform: rotateX(180deg);`;
      }
  }};

  &:hover {
    ${props => {
        if (props.disabled || props.selected) {
            return 'cursor: default';
        } else {
            return 'cursor: pointer';
        }
    }}
`;

const CardFront = styled.p`
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.veryLight};
    font-size: 50px;
    transition: ${cardTransition};
    background: ${props => (props.selected ? colors.primary : colors.idleGray)};
`;

const CardBack = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
    border-radius: 50%;
    background: ${colors.dark};
    transform: rotateY(180deg);
    transition: ease-in-out 0.2s;

    &:hover {
        background: ${colors.secondary};
    }
`;

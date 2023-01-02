import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

type TMenuOptionSelectorProps = {
    values: string[];
    onChange: (selectedOption) => void;
    selectedValue: string;
};

export const MenuOptionSelector: FC<TMenuOptionSelectorProps> = props => {
    return (
        <OptionsWrapper>
            {props.values.map(value => {
                if (props.selectedValue === value) {
                    return (
                        <Button selected={true} disabled={true}>
                            {value}
                        </Button>
                    );
                } else {
                    return (
                        <Button
                            selected={false}
                            disabled={false}
                            onClick={() => {
                                props.onChange(value);
                            }}>
                            {value}
                        </Button>
                    );
                }
            })}
        </OptionsWrapper>
    );
};

const OptionsWrapper = styled.div`
    width: 100%;
    display: inline-flex;
    gap: 20px;
`;

const Button = styled.button`
    flex: 1 1 0;
    height: 52px;
    border-radius: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: ${props => (props.selected ? colors.dark : colors.idleGray)};
    color: ${colors.veryLight};
    font-size: 24px;
    font-family: var(--primaryFontFamily);
    font-weight: var(--primaryFontWeight);
    transition: var(--btn-hover-transition);
    border: none;

    &:hover:not([disabled]) {
        cursor: pointer;
        background: ${colors.secondary};
    }
`;

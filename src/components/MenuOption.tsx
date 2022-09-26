import styled from 'styled-components'
import { colors } from '../styles/colors'
import React, { FC } from 'react'

type TMenuOptionProps = {
  value: String
  selected: Boolean
  onSelect: (value) => void
}

export const MenuOption: FC<TMenuOptionProps> = props => {
  return (
    <Button
      selected={props.selected}
      onClick={() => {
        props.onSelect(props.value)
      }}
      disabled={props.selected}>
      {props.value}
    </Button>
  )
}

const Button = styled.button`
  flex: 1 1 0;
  height: 52px;
  border-radius: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${props =>
    props.selected ? colors.buttons.menuSelection.bg.active : colors.buttons.menuSelection.bg.idle};
  color: ${colors.veryLight};
  font-size: 26px;
  font-family: var(--primaryFontFamily);
  font-weight: var(--primaryFontWeight);
  transition: var(--default-hover-transition);
  border: none;

  &:hover:not([disabled]) {
    cursor: pointer;
    background: ${colors.buttons.menuSelection.bg.hover};
  }
`

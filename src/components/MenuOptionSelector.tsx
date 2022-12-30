import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MenuOption } from '.';

type TMenuOptionSelectorProps = {
    values: String[];
    onChange: (selectedOption) => void;
    initSelected: String;
};

export const MenuOptionSelector: FC<TMenuOptionSelectorProps> = props => {
    const [selectedOption, setSelectedOption] = useState(props.initSelected);

    useEffect(() => {
        props.onChange(selectedOption);
    }, [selectedOption]);

    return (
        <OptionsWrapper>
            {props.values.map(value => {
                if (selectedOption === value) {
                    return <MenuOption value={value} selected={true} />;
                } else {
                    return (
                        <MenuOption value={value} selected={false} onSelect={setSelectedOption} />
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

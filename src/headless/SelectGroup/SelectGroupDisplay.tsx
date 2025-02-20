import React from 'react';
import { useSelectGroup } from './SelectGroup';

type SelectGroupDisplayProps = React.HTMLAttributes<HTMLDivElement>;

const SelectGroupDisplay = (props: SelectGroupDisplayProps) => {
    const { selectGroupValue } = useSelectGroup();

    return <div {...props}>{selectGroupValue}</div>;
};

export default SelectGroupDisplay;

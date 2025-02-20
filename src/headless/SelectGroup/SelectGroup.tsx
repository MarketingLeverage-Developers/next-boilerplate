// SelectGroup.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import SelectGroupItem from './SelectGroupItem';
import SelectGroupDisplay from './SelectGroupDisplay';

type SelectGroupContextType = {
    selectGroupValue: string;
    changeSelectGroupValue: (value: string) => void;
};

const SelectGroupContext = createContext<SelectGroupContextType>({
    selectGroupValue: '',
    changeSelectGroupValue: (value) => {},
});

type SelectGroupProps = {
    children: React.ReactNode;
    defaultValue: string;
    onFormChange?: (value: string) => void;
};

const SelectGroup = ({ children, defaultValue, onFormChange }: SelectGroupProps) => {
    const [selectGroupValue, setSelectGroupValue] = useState(defaultValue ?? '');

    useEffect(() => {
        setSelectGroupValue(defaultValue);
    }, [defaultValue]);

    const changeSelectGroupValue = (value: string) => {
        onFormChange && onFormChange(value);
        setSelectGroupValue(value);
    };

    return (
        <SelectGroupContext.Provider value={{ selectGroupValue, changeSelectGroupValue }}>
            {children}
        </SelectGroupContext.Provider>
    );
};

export const useSelectGroup = () => {
    return useContext(SelectGroupContext);
};

export default SelectGroup;

SelectGroup.Display = SelectGroupDisplay;
SelectGroup.Item = SelectGroupItem;
SelectGroup.changeHandlerPropName = 'onSelectGroupChange';

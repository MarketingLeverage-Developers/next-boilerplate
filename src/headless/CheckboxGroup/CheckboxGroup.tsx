import React, {createContext, useContext, useState} from "react";
import Item from "./CheckboxGroupItem";

type CheckboxGroupContextType = {
    checkboxGroupValue: string[];
    toggleCheckboxGroupValue: (value: string) => void;
    isChecked: (value: string) => boolean;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextType>({
    checkboxGroupValue: [],
    toggleCheckboxGroupValue: () => {},
    isChecked: () => false,
});

type CheckboxGroupProps = {
    children: React.ReactNode;
    defaultValue?: string[];
};

const CheckboxGroup = ({children, defaultValue}: CheckboxGroupProps) => {
    const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>(
        defaultValue ?? [],
    );

    const isChecked = (value: string) => checkboxGroupValue.includes(value);

    const toggleCheckboxGroupValue = (value: string) => {
        if (isChecked(value)) {
            setCheckboxGroupValue(
                checkboxGroupValue.filter(item => item !== value),
            );
        } else {
            setCheckboxGroupValue([...checkboxGroupValue, value]);
        }
    };

    return (
        <CheckboxGroupContext.Provider
            value={{checkboxGroupValue, isChecked, toggleCheckboxGroupValue}}
        >
            {children}
        </CheckboxGroupContext.Provider>
    );
};
export const useCheckboxGroup = () => {
    return useContext(CheckboxGroupContext);
};

export default CheckboxGroup;

CheckboxGroup.Item = Item;

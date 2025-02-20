// Dropdown.js
import React, { createContext, useContext, useState } from 'react';
import Trigger from './Trigger';
import Content from './Content';
import Box from './Box';

type DropdownContextType = {
    dropdownValue: boolean;
    toggleDropdown: () => void;
    openDropdown: () => void;
    closeDropdown: () => void;
};

const DropdownContext = createContext<DropdownContextType>({
    dropdownValue: false,
    toggleDropdown: () => {},
    openDropdown: () => {},
    closeDropdown: () => {},
});

type DropdownProps = {
    children: React.ReactNode;
};

const Dropdown = ({ children }: DropdownProps) => {
    const [dropdownValue, setDropdownValue] = useState(false);

    const toggleDropdown = () => {
        setDropdownValue(!dropdownValue);
    };

    const openDropdown = () => {
        setDropdownValue(true);
    };

    const closeDropdown = () => {
        setDropdownValue(false);
    };

    return (
        <DropdownContext.Provider value={{ dropdownValue, toggleDropdown, openDropdown, closeDropdown }}>
            {children}
        </DropdownContext.Provider>
    );
};

export const useDropdown = () => {
    return useContext(DropdownContext);
};

export default Dropdown;

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Box = Box;

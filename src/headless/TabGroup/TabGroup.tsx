// TabGroup.js
import React, { createContext, useContext, useState } from 'react';
import TabGroupItem from './TabGroupItem';

type TabGroupContextType = {
    tabGroupValue: string;
    changeTabGroupValue: (value: string) => void;
};

const TabGroupContext = createContext<TabGroupContextType>({
    tabGroupValue: '',
    changeTabGroupValue: () => {},
});

type TabGroupProps = {
    children: React.ReactNode;
    defaultValue: string;
};

const TabGroup = ({ children, defaultValue }: TabGroupProps) => {
    const [tabGroupValue, setTabGroup] = useState(defaultValue ?? '');

    const changeTabGroupValue = (value: string) => {
        setTabGroup(value);
    };

    return (
        <TabGroupContext.Provider value={{ tabGroupValue, changeTabGroupValue }}>{children}</TabGroupContext.Provider>
    );
};

export const useTabGroup = () => {
    return useContext(TabGroupContext);
};

export default TabGroup;

TabGroup.Item = TabGroupItem;

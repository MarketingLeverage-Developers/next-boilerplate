import React, { useEffect } from 'react';
import { useTabGroup } from './TabGroup';

type TabGroupItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    children?: React.ReactNode;
    onTabGroupItemClick?: (value: string) => void;
};

const TabGroupItem = ({ value, children, onTabGroupItemClick, ...props }: TabGroupItemProps) => {
    const { tabGroupValue, changeTabGroupValue } = useTabGroup();

    const handleChangeTab = (value: string) => {
        changeTabGroupValue(value);
        onTabGroupItemClick && onTabGroupItemClick(value);
    };

    useEffect(() => {
        console.log('현재 값', tabGroupValue);
    }, [tabGroupValue]);

    return (
        <button onClick={() => handleChangeTab(value)} {...props}>
            {children}
        </button>
    );
};

export default TabGroupItem;

import React, { useEffect } from 'react';
import { useCheckboxGroup } from './CheckboxGroup';

type CheckboxGroupItemProps = React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    children: React.ReactNode;
};

const CheckboxGroupItem = ({ value, children, ...props }: CheckboxGroupItemProps) => {
    const { checkboxGroupValue, toggleCheckboxGroupValue } = useCheckboxGroup();

    const handleCheckboxGroupItem = () => {
        toggleCheckboxGroupValue(value);
    };

    useEffect(() => {
        console.log('checkboxValue', checkboxGroupValue);
    }, [checkboxGroupValue]);

    return (
        <div {...props} onClick={handleCheckboxGroupItem}>
            {children}
        </div>
    );
};

export default CheckboxGroupItem;

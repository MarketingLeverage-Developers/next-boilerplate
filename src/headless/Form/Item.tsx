import React, { useEffect } from 'react';
import { useForm } from './Form';

type ItemProps = {
    children: React.ReactElement;
    name: string;
};

const Item = ({ children, name }: ItemProps) => {
    const { formValue, changeFormValue } = useForm();

    const handleItemChange = (name: string) => (value: string) => {
        changeFormValue(name, value);
    };

    useEffect(() => {
        console.log('formValue', formValue);
    }, [formValue]);

    const childWithProps = React.cloneElement(
        children as React.ReactElement<{ onFormChange?: (value: string) => void }>,
        {
            onFormChange: handleItemChange(name),
        }
    );

    return <>{childWithProps}</>;
};

export default Item;

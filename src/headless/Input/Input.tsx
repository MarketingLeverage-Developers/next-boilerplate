import React, { ChangeEventHandler, useState } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onFormChange?: (value: string) => void;
};

const Input = ({ defaultValue, onFormChange, style, ...props }: InputProps) => {
    const [inputValue, setInputValue] = useState(defaultValue ?? '');

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        onFormChange && onFormChange(value);
        setInputValue(value);
    };

    return <input style={style} onChange={handleInputChange} value={inputValue} {...props} />;
};

export default Input;

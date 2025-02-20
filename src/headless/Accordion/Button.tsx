import React, { useEffect } from 'react';
import { useAccordion } from './Accordion';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
    onButtonClick?: (value: boolean) => void | boolean;
};

const Button = ({ children, onButtonClick, ...props }: ButtonProps) => {
    const { accordionValue, toggleAccordion } = useAccordion();

    const handleButtonClick = () => {
        const result = onButtonClick && onButtonClick(accordionValue);
        if (result) {
            return;
        }
        toggleAccordion();
    };

    useEffect(() => {
        console.log('accordionValue', accordionValue);
    }, [accordionValue]);

    return (
        <button {...props} onClick={handleButtonClick}>
            {children}
        </button>
    );
};

export default Button;

import React, { useContext, useState, createContext } from 'react';
import Box from './Box';
import Visible from './Visible';
import Hidden from './Hidden';
import Button from './Button';

type AccordionContextType = {
    accordionValue: boolean;
    toggleAccordion: () => void;
    showAccordion: () => void;
    hideAccordion: () => void;
};

const AccordionContext = createContext<AccordionContextType>({
    accordionValue: false,
    toggleAccordion: () => {},
    showAccordion: () => {},
    hideAccordion: () => {},
});

type AccordionProps = {
    children: React.ReactNode;
    defaultValue?: boolean;
};

const Accordion = ({ children, defaultValue }: AccordionProps) => {
    const [accordionValue, setAccordionValue] = useState(defaultValue ?? false);

    const toggleAccordion = () => {
        setAccordionValue(!accordionValue);
    };
    const showAccordion = () => {
        setAccordionValue(true);
    };
    const hideAccordion = () => {
        setAccordionValue(false);
    };
    return (
        <AccordionContext.Provider value={{ accordionValue, showAccordion, hideAccordion, toggleAccordion }}>
            {children}
        </AccordionContext.Provider>
    );
};

export const useAccordion = () => {
    return useContext(AccordionContext);
};

export default Accordion;

Accordion.Box = Box;
Accordion.Button = Button;
Accordion.Visible = Visible;
Accordion.Hidden = Hidden;

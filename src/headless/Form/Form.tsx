// Form.js
import React, { createContext, useContext, useState } from 'react';
import Item from './Item';

type FormContextType = {
    formValue: Record<string, any>;
    changeFormValue: (name: string, value: any) => void;
};

const FormContext = createContext<FormContextType>({
    formValue: {},
    changeFormValue: (name: string, value: any) => {},
});

type FormProps = {
    children: React.ReactNode;
};

const Form = ({ children }: FormProps) => {
    const [formValue, setFormValue] = useState<Record<string, string>>({});

    const changeFormValue = (name: string, value: any) => {
        const newFormValue = structuredClone(formValue);

        newFormValue[name] = value;

        setFormValue(newFormValue);
    };

    return <FormContext.Provider value={{ formValue, changeFormValue }}>{children}</FormContext.Provider>;
};

export const useForm = () => {
    return useContext(FormContext);
};

export default Form;

Form.Item = Item;

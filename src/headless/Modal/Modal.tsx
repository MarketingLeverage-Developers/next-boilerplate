// Modal.js
import React, { createContext, useContext, useState } from 'react';
import Trigger from './Trigger';
import Backdrop from './Backdrop';
import Close from './Close';
import Content from './Content';

type ModalContextType = {
    modalValue: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
    modalValue: false,
    openModal: () => {},
    closeModal: () => {},
});

type ModalProps = {
    children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
    const [modalValue, setModalValue] = useState(false);

    const openModal = () => {
        setModalValue(true);
    };

    const closeModal = () => {
        setModalValue(false);
    };

    return <ModalContext.Provider value={{ modalValue, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
    return useContext(ModalContext);
};

export default Modal;

Modal.Trigger = Trigger;
Modal.Backdrop = Backdrop;
Modal.Close = Close;
Modal.Content = Content;

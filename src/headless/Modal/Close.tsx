import React from 'react';
import { useModal } from './Modal';

type CloseProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Close = ({ children, style, ...props }: CloseProps) => {
    const { closeModal } = useModal();

    const handleCloseClick = () => {
        closeModal();
    };

    return (
        <div {...props} onClick={handleCloseClick} style={style}>
            {children}
        </div>
    );
};

export default Close;

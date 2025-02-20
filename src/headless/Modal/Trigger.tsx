import React from 'react';
import { useModal } from './Modal';

type TriggerProps = React.HTMLAttributes<HTMLSpanElement> & {
    children: React.ReactNode;
};

const Trigger = ({ children, style, ...props }: TriggerProps) => {
    const { openModal } = useModal();

    const handleTriggerClick = () => {
        openModal();
    };

    return (
        <span {...props} onClick={handleTriggerClick} style={style}>
            {children}
        </span>
    );
};

export default Trigger;

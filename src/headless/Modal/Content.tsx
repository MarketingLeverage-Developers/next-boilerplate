import React, { useRef, useEffect } from 'react';
import { useModal } from './Modal';

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const baseStyle: React.CSSProperties = {
    display: 'flex',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 200,
};

const Content = ({ children, style, ...props }: ContentProps) => {
    const { modalValue, closeModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        if (modalValue) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalValue, closeModal]);

    return (
        <>
            {modalValue && (
                <div ref={containerRef} style={{ ...baseStyle, ...style }} {...props}>
                    {children}
                </div>
            )}
        </>
    );
};

export default Content;

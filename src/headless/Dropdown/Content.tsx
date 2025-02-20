import React, { useRef, useEffect } from 'react';
import { useDropdown } from './Dropdown';

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Content = ({ children, ...props }: ContentProps) => {
    const { dropdownValue, closeDropdown } = useDropdown();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        if (dropdownValue) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownValue, closeDropdown]);

    return (
        <>
            {dropdownValue && (
                <div ref={containerRef} {...props}>
                    {children}
                </div>
            )}
        </>
    );
};

export default Content;

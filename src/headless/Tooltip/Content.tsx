import React from 'react';
import { useTooltip } from './Tooltip';

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Content = ({ children, ...props }: ContentProps) => {
    const { tooltipValue, showTooltip, hideTooltip } = useTooltip();

    const handleContentShowToggle = () => {
        showTooltip();
    };

    const handleContentHideToggle = () => {
        hideTooltip();
    };

    return (
        <>
            {tooltipValue && (
                <div onMouseOver={handleContentShowToggle} onMouseOut={handleContentHideToggle} {...props}>
                    {children}
                </div>
            )}
        </>
    );
};

export default Content;

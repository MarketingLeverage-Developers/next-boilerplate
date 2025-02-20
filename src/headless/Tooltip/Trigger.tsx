import React, { useEffect } from 'react';
import { useTooltip } from './Tooltip';

type TriggerProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Trigger = ({ children, ...props }: TriggerProps) => {
    const { tooltipValue, showTooltip, hideTooltip } = useTooltip();

    const handleContentShowToggle = () => {
        showTooltip();
    };

    const handleContentHideToggle = () => {
        hideTooltip();
    };

    useEffect(() => {
        console.log('tooltipValue:', tooltipValue);
    }, [tooltipValue]);

    return (
        <div onMouseOver={handleContentShowToggle} onMouseOut={handleContentHideToggle} {...props}>
            {children}
        </div>
    );
};

export default Trigger;

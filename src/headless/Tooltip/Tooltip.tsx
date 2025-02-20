import React, { createContext, useContext, useState } from 'react';
import Trigger from './Trigger';
import Box from './Box';
import Content from './Content';

type TooltipContextType = {
    tooltipValue: boolean;
    showTooltip: () => void;
    hideTooltip: () => void;
};

const TooltipContext = createContext<TooltipContextType>({
    tooltipValue: false,
    showTooltip: () => {},
    hideTooltip: () => {},
});

type TooltipProps = {
    children: React.ReactNode;
};

const Tooltip = ({ children }: TooltipProps) => {
    const [tooltipValue, setTooltipValue] = useState(false);

    const showTooltip = () => {
        setTooltipValue(true);
    };

    const hideTooltip = () => {
        setTooltipValue(false);
    };

    return (
        <TooltipContext.Provider value={{ tooltipValue, showTooltip, hideTooltip }}>{children}</TooltipContext.Provider>
    );
};

export const useTooltip = () => {
    return useContext(TooltipContext);
};

export default Tooltip;

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
Tooltip.Box = Box;

import React from 'react';

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Box = ({ children, style, ...props }: BoxProps) => {
    const baseStyle: React.CSSProperties = {
        position: 'relative',
        display: 'inline-block',
    };

    return (
        <div {...props} style={{ ...baseStyle, ...style }}>
            {children}
        </div>
    );
};

export default Box;

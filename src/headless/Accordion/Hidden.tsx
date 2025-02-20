import React, { useEffect, useRef, useState } from 'react';
import { useAccordion } from './Accordion';

type HiddenProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Hidden = ({ children, style, ...props }: HiddenProps) => {
    const { accordionValue } = useAccordion();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            // 모든 자식 요소의 높이를 합산
            const totalHeight = Array.from(containerRef.current.children).reduce(
                (acc, child) => acc + (child as HTMLElement).offsetHeight,
                0
            );

            const newHeight = accordionValue ? totalHeight : 0;
            setHeight(newHeight);
        }
    }, [accordionValue, children]);

    const baseStyle: React.CSSProperties = {
        height: `${height}px`,
        overflow: 'hidden',
        ...style,
    };

    return (
        <div ref={containerRef} style={baseStyle} {...props}>
            <div>{children}</div>
        </div>
    );
};

export default Hidden;

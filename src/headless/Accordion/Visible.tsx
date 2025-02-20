import React from 'react';

type VisibleProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Visible = ({ children, ...props }: VisibleProps) => {
    return <div {...props}>{children}</div>;
};

export default Visible;

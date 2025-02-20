import React from 'react';

type ListProps<T, P extends { item: T }> = {
    data: T[];
    children: React.ReactElement<P>;
};

const List = <T, P extends { item: T }>({ data, children }: ListProps<T, P>) => {
    return (
        <>
            {data.map((item, index) =>
                React.cloneElement(children, { item, key: index } as unknown as Partial<P> & React.Attributes)
            )}
        </>
    );
};

export default List;

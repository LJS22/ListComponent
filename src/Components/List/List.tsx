import React from 'react';

import './List.css';

type ListProps<TData> = {
    items: TData[];
    ordered?: boolean;
    renderItem?: (item: TData, index: number) => React.ReactNode;
    keyExtractor?: (item: TData, index: number) => string | number;
    className?: string;
} & React.HTMLAttributes<HTMLUListElement | HTMLOListElement>;

export const List = <TData,>({
    items,
    ordered = false,
    renderItem,
    keyExtractor,
    className,
    ...rest
}: ListProps<TData>): React.ReactElement => {
    const ListTag = ordered ? 'ol' : 'ul';

    return (
        <ListTag className={className} {...rest}>
            {items.map((item, index) => (
                <li className='list-item' key={keyExtractor ? keyExtractor(item, index) : index}>
                    {renderItem ? renderItem(item, index) : String(item)}
                </li>
            ))}
        </ListTag>
    );
};

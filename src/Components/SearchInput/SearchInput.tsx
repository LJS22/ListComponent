import React, { ChangeEvent } from 'react';

import './SearchInput.css';

type SearchInputProps = {
    setFilter: (value: string) => void;
    placeholder?: string;
    className?: string;
    label?: string;
    id?: string;
};

export const SearchInput: React.FC<SearchInputProps> = ({
    setFilter,
    placeholder = 'Search...',
    className = '',
    label = 'Search',
    id = 'search-input',
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    return (
        <div className={`search-input-wrapper ${className}`}>
            <label htmlFor={id} className='sr-only'>
                {label}
            </label>
            <input
                type='search'
                id={id}
                onChange={handleChange}
                placeholder={placeholder}
                className='search-input'
                role='searchbox'
                aria-label={label}
            />
        </div>
    );
};

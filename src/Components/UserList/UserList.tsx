import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { getUsers } from '../../api/users';

import { List } from '../List/List';
import { SearchInput } from '../SearchInput/SearchInput';

type User = {
    id: number;
    name: string;
    email: string;
};

export const UserList: React.FC = () => {
    const [filter, setFilter] = useState<string | null>(null);

    const { 
        isPending, 
        isError, 
        data: users, 
        error 
    } = useQuery<User[], Error>({ queryKey: ['users'], queryFn: getUsers });

    if (isError) return <p>Error: {error.message}</p>;
    if (isPending) return <p>Loading users...</p>;

    // Filter callback based on all emails being in lowercase. If not can set both email and filter to be lowercase
    const filteredUsers = filter ? users.filter(({ email }) => email.includes(filter.toLowerCase())) : users;

    return (
        <div>
            <h2>User List</h2>
            <SearchInput setFilter={setFilter} />
            <List
                items={filteredUsers}
                ordered
                renderItem={(user) => (
                    <div>
                        <strong>{user.name}</strong> — <em>{user.email}</em>
                    </div>
                )}
                keyExtractor={(user) => user.id}
                className='user-list'
            />
        </div>
    );
};

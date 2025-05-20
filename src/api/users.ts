export type UserResponse = {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
    company: {
        name: string;
        catchPhrase: string;
    };
};

// Will need updating to proper API endpoint
export const getUsers = async () => {
    try {
        const response = await fetch('https://random.com/users');
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const users: UserResponse[] = await response.json();

        return users.map(({ id, name, email }) => ({ id, name, email }));
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Error in getUsers: ${err.message}`);
        }
        throw new Error("Error fetching users");
    }
}
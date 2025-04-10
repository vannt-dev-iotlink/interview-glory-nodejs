export interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
}

export const users: User[] = [];
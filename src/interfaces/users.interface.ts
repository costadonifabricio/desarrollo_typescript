export interface User {
    id: number;
    role: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
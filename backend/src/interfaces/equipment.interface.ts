export interface Equipment {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
}
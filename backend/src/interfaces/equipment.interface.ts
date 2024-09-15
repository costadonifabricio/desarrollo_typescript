export interface Equipment {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    state: boolean;
    ubication: string;
    date_adquisition: Date;
    createdAt: Date;
    updatedAt: Date;
}
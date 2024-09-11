import dotenv from 'dotenv';
dotenv.config();

export const PORT: number = Number(process.env.PORT);
export const HOST: string = String(process.env.HOST);
export const DB_USER: string = String(process.env.DB_USER);
export const DB_PASS: string = String(process.env.DB_PASS);
export const DB_NAME: string = String(process.env.DB_NAME);
export const DB_PORT: number = Number(process.env.DB_PORT);

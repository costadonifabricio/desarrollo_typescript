import { Sequelize } from 'sequelize';
import { DB_NAME, DB_USER, DB_PASS, HOST, DB_PORT } from '../config/enviroments';

export const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: HOST,
  port: DB_PORT,
  dialect: 'postgres'
});

export async function dbConnection() {
  try {
    await db.authenticate();
    console.log('Base de Datos Conectada!');
  } catch (error) {
    console.log('Error al conectar la Base de Datos: ', error);
  }
}


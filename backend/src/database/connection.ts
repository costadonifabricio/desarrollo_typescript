import { Sequelize } from "sequelize";
import {
  DB_NAME,
  DB_USER,
  DB_PASS,
  HOST,
  DB_PORT,
} from "../config/enviroments";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: HOST,
        port: DB_PORT,
        dialect: "postgres",
      });

      // Autenticación inicial
      Database.instance
        .authenticate()
        .then(() => console.log("Conexión a la base de datos establecida"))
        .catch((error) =>
          console.error("Error al conectar la Base de Datos:", error)
        );
    }
    return Database.instance;
  }
}

// Exportar la instancia única de la conexión a la base de datos
export const db = Database.getInstance();

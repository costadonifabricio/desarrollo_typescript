import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT, HOST } from "../config/enviroments";
import userRoutes from "../routes/users.routes";
import organizationRoutes from "../routes/organization.routes";
import { dbConnection } from "../database/connection";

export class Server {
  private app: Application;
  private port: number;
  private host: string;
  public listening: Function;

  constructor() {
    this.app = express();
    this.port = PORT;
    this.host = HOST;
    this.listening = this.listen;

    this.dgConnect();
    this.middlewares();
    this.routes();
  }

  private async dgConnect() {
    try {
      await dbConnection();
      console.log("Conectado a la base de datos!");
    } catch (error) {
      console.error("Error en la base de datos:", error);
    }
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api", userRoutes);
    this.app.use("/api", organizationRoutes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor en http://${this.host}:${this.port}`);
    });
  }
}

import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT, HOST } from "../config/enviroments";
import userRoutes from "../routes/users.routes";
import organizationRoutes from "../routes/organization.routes";
import providerRoutes from "../routes/provider.routes";
import equipmentRoutes from "../routes/equipment.routes";
import { dbConnection } from "../database/connection";
import { EquipmentModel } from "../models/equipment.model";
import { Organizations } from "../models/organization.model";
import { ProviderModel } from "../models/provider.model";
import { Users } from "../models/users.model";

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

      await Users.sync();
      console.log("Tabla de Users creada");

      await Organizations.sync();
      console.log("Tabla de Organizations creada");

      await ProviderModel.sync();
      console.log("Tabla de Providers creada");

      await EquipmentModel.sync();
      console.log("Tabla de Equipment creada");
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
    this.app.use("/api", providerRoutes);
    this.app.use("/api", equipmentRoutes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor en http://${this.host}:${this.port}`);
    });
  }
}

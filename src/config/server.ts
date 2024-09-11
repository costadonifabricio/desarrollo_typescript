import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import equitmentRoutes from "../routes/index.routes";

export class Server {
  private app: Application;
  private port: number;
  private host: string;
  public listening: Function;

  constructor() {
    this.app = express();
    this.port = 4000;
    this.host = "localhost";
    this.listening = this.listen;

    this.dgConnect();
    this.middlewares();
    this.routes();
  }

  private dgConnect() {
    console.log("Conectando a la base de datos!");
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api", equitmentRoutes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on http://${this.host}:${this.port}`);
    });
  }
}
import { Model, DataTypes } from "sequelize";
import { db } from "../database/connection";
import { Organization } from "../interfaces/organization.interface";

export class Organizations extends Model implements Organization {
  public id!: number;
  public name!: string;
  public website!: string;
  public ubicacion!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Organizations.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    website: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    ubicacion: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    createdAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: "organizations",
    sequelize: db,
  }
);

Organizations.sync().then(() => console.log("Tabla de Organizations creada"));

export default Organizations;

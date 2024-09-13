import { Model, DataTypes } from "sequelize";
import { db } from "../database/connection";
import { Equipment } from "../interfaces/equipment.interface";

export class EquipmentModel extends Model implements Equipment {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public category!: string;
  public state!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

EquipmentModel.init(
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
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    price: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
    stock: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    category: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    state: {
      type: new DataTypes.BOOLEAN(),
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
    tableName: "equipment",
    sequelize: db,
  }
);

EquipmentModel.sync().then(() => console.log("Tabla de Equipment creada"));

export default EquipmentModel;

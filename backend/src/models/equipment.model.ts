import { Model, DataTypes } from "sequelize";
import { db } from "../database/connection";
import { Equipment } from "../interfaces/equipment.interface";

export class EquipmentModel extends Model implements Equipment {
  public id!: number;
  public brand!: string;
  public description!: string;
  public model!: string;
  public state!: boolean;
  public ubication!: string;
  public date_adquisition!: Date;
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
    brand: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    model: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    state: {
      type: new DataTypes.BOOLEAN(),
      allowNull: false,
    },
    ubication: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    date_adquisition: {
      type: new DataTypes.DATE(),
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

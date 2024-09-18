import { Model, DataTypes } from "sequelize";
import { db } from "../database/connection";
import { Provider } from "../interfaces/provider.interface";

export class ProviderModel extends Model implements Provider {
  public id!: number;
  public name!: string;
  public website!: string;
  public ubicacion!: string;
  public type_provider!: string;
  public date_contract!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ProviderModel.init(
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
    type_provider: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    date_contract: {
      type: new DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "providers",
    sequelize: db,
  }
);

export default ProviderModel;

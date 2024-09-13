import EquipmentModel from "../models/equipment.model";
import { Equipment } from "../interfaces/equipment.interface";

export class EquipmentService {
  constructor() {}

  public async findAllEquipment() {
    const equipment = await EquipmentModel.findAll();
    return equipment;
  }

  public async findEquipmentById(equipmentId: number) {
    const equipment = await EquipmentModel.findByPk(equipmentId);
    return equipment;
  }

  public async createEquipment(equipmentData: Equipment) {
    const equipment = await EquipmentModel.create(equipmentData as any);
    return equipment;
  }

  public async updateEquipment(equipmentId: number, equipmentData: Equipment) {
    await EquipmentModel.update(equipmentData, {
      where: { id: equipmentId },
    });
    const updatedEquipment = await EquipmentModel.findByPk(equipmentId);
    return updatedEquipment;
  }

  public async deleteEquipment(equipmentId: number) {
    const deletedEquipment = await EquipmentModel.destroy({
      where: { id: equipmentId },
    });
    return deletedEquipment;
  }
}



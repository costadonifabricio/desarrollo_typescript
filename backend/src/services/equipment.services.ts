import EquipmentModel from "../models/equipment.model";
import { Equipment } from "../interfaces/equipment.interface";
import { EquipmentFactory } from "../factory/pattern_factory";

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

  public async createEquipment(
    equipmentData: Omit<Equipment, "category">,
    category: string
  ) {
    const equipment = EquipmentFactory.createEquipment(equipmentData, category);
    const createdEquipment = await EquipmentModel.create(equipment as any);
    return createdEquipment;
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

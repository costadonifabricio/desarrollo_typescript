import { Equipment } from "../interfaces/equipment.interface";

export class EquipmentFactory {
  public static createEquipment(
    equipmentData: Omit<Equipment, "category">,
    category: string
  ): Equipment {
    switch (category.toLowerCase()) {
      case "laptop":
        return {
          ...equipmentData,
          category,
          description: equipmentData.description + " - Laptop",
        };
      case "desktop":
        return {
          ...equipmentData,
          category,
          description: equipmentData.description + " - Desktop",
        };
      case "printer":
        return {
          ...equipmentData,
          category,
          description: equipmentData.description + " - Printer",
        };
      default:
        return {
          ...equipmentData,
          category,
          description: equipmentData.description + " - Otros",
        };
    }
  }
}

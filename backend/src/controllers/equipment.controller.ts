import { Request, Response } from "express";
import { EquipmentService } from "../services/equipment.services";

const equipmentService = new EquipmentService();

export class EquipmentController {
  constructor() {}

  public async findAllEquipment(req: Request, res: Response) {
    try {
      const equipment = await equipmentService.findAllEquipment();
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al recuperar los equipos." });
    }
  }

  public async findEquipmentById(req: Request, res: Response) {
    try {
      const equipmentId = parseInt(req.params.id);
      const equipment = await equipmentService.findEquipmentById(equipmentId);
      if (equipment) {
        return res.json(equipment);
      }
      res.status(404).json({ error: "Equipo no encontrado" });
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al recuperar el equipo." });
    }
  }

  public async createEquipment(req: Request, res: Response) {
    try {
      const { category, ...equipmentData } = req.body;

      if (!category) {
        return res.status(400).json({ error: "La categoría es requerida." });
      }

      const equipment = await equipmentService.createEquipment(equipmentData, category);

      res.status(201).json({ msg: "Equipo creado", equipment });
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al crear el equipo." });
    }
  }

  public async updateEquipment(req: Request, res: Response) {
    try {
      const equipmentId = parseInt(req.params.id);
      const equipmentData = req.body;
      const updatedEquipment = await equipmentService.updateEquipment(equipmentId, equipmentData);
      if (updatedEquipment) {
        return res.json(updatedEquipment);
      }
      res.status(404).json({ error: "Equipo no encontrado" });
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al actualizar el equipo." });
    }
  }

  public async deleteEquipment(req: Request, res: Response) {
    try {
      const equipmentId = parseInt(req.params.id);
      const deletedEquipment = await equipmentService.deleteEquipment(equipmentId);
      if (deletedEquipment) {
        return res.json({ msg: "Equipo eliminado" });
      }
      res.status(404).json({ error: "Equipo no encontrado" });
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al eliminar el equipo." });
    }
  }
}

import { Router } from "express";
import { EquipmentController } from "../controllers/equipment.controller";

const router = Router();
const equipmentController = new EquipmentController();

router.get("/equipment", equipmentController.findAllEquipment);
router.get("/equipment/:id", equipmentController.findEquipmentById);
router.post("/equipment", equipmentController.createEquipment);
router.put("/equipment/:id", equipmentController.updateEquipment);
router.delete("/equipment/:id", equipmentController.deleteEquipment);

export default router;

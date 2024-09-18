import { Router } from "express";
import { EquipmentController } from "../controllers/equipment.controller";
import authMiddleware from "../middlewares/auth";

const router = Router();
const equipmentController = new EquipmentController();

router.get("/equipment",authMiddleware, equipmentController.findAllEquipment);
router.get("/equipment/:id",authMiddleware, equipmentController.findEquipmentById);
router.post("/equipment",authMiddleware, equipmentController.createEquipment);
router.put("/equipment/:id",authMiddleware, equipmentController.updateEquipment);
router.delete("/equipment/:id",authMiddleware, equipmentController.deleteEquipment);

export default router;

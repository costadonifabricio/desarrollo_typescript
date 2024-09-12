import { Router } from "express";
import { ProviderController } from "../controllers/provider.controller";

const router = Router();
const providerController = new ProviderController();

router.get("/provider", providerController.findAllProviders);
router.get("/provider:id", providerController.findProviderById);
router.post("/provider", providerController.createProvider);
router.put("/provider:id", providerController.updateProvider);
router.delete("/provider:id", providerController.deleteProvider);

export default router;

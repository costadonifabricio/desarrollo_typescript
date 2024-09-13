import { Router } from "express";
import { OrganizationController } from "../controllers/organization.controller";

const router = Router();

const organizationController = new OrganizationController();

router.get("/organizations", organizationController.findAllOrganizations);
router.get("/organizations/:id", organizationController.findOrganizationById);
router.post("/organizations", organizationController.createOrganization);
router.put("/organizations/:id", organizationController.updateOrganization);
router.delete("/organizations/:id", organizationController.deleteOrganization);

export default router;

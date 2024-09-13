import { Request, Response } from "express";
import { OrganizationService } from "../services/organization.services";
import { Organization } from "../interfaces/organization.interface";

const Organizations = new OrganizationService();

export class OrganizationController {
  constructor() {}

  public async findAllOrganizations(req: Request, res: Response) {
    try {
      const organizations = await Organizations.findAllOrganizations();
      res.json(organizations);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al recuperar las organizaciones." });
    }
  }

  public async findOrganizationById(req: Request, res: Response) {
    try {
      const organizationId = parseInt(req.params.id);
      const organization = await Organizations.findOrganizationById(
        organizationId
      );
      if (organization) {
        return res.json(organization);
      }
      res.status(404).json({ error: "Organización no encontrada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al recuperar la organización." });
    }
  }

  public async createOrganization(req: Request, res: Response) {
    try {
      const organizationData: Organization = req.body;

      const organization = await Organizations.createOrganization(
        organizationData
      );

      res.status(201).json({ msg: "Organización creada", organization });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al crear la organización." });
    }
  }

  public async updateOrganization(req: Request, res: Response) {
    try {
      const organizationId = parseInt(req.params.id);
      const organizationData: Organization = req.body;
      const updatedOrganization = await Organizations.updateOrganization(
        organizationId,
        organizationData
      );
      if (updatedOrganization) {
        return res.json(updatedOrganization);
      }
      res.status(404).json({ error: "Organización no encontrada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al actualizar la organización." });
    }
  }

  public async deleteOrganization(req: Request, res: Response) {
    try {
      const organizationId = parseInt(req.params.id);
      const deletedOrganization = await Organizations.deleteOrganization(
        organizationId
      );
      if (deletedOrganization) {
        return res.json({ msg: "Organización eliminada" });
      }
      res.status(404).json({ error: "Organización no encontrada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al eliminar la organización." });
    }
  }
}

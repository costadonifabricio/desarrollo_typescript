import { Request, Response } from "express";
import { Organizations } from "../models/organization.model";
import { Organization } from "../interfaces/organization.interface";

export class OrganizationController {
  constructor() {}

  public async findAllOrganizations(req: Request, res: Response) {
    try {
      const organizations = await Organizations.findAll();
      res.json(organizations);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving organizations." });
    }
  }

  public async findOrganizationById(req: Request, res: Response) {
    try {
      const organizationId = parseInt(req.params.id);
      const organization = await Organizations.findByPk(organizationId);
      if (organization) {
        return res.json(organization);
      }
      res.status(404).json({ error: "Organization not found" });
    } catch (error) {
      res
        .status(500)
        .json({
          error: "An error occurred while retrieving the organization.",
        });
    }
  }

  public async createOrganization(req: Request, res: Response) {
    try {
      const organizationData: Organization = req.body;
      const existingOrganization = await Organizations.findOne({
        where: { name: organizationData.name },
      });
      if (existingOrganization) {
        return res
          .status(400)
          .json({ error: "An organization with that name already exists." });
      }
      const organization = await Organizations.create(organizationData as any);
      res.status(201).json({ msg: "Organization created", organization });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the organization." });
    }
  }

  public async updateOrganization(req: Request, res: Response) {
    try {
      const organizationId = parseInt(req.params.id);
      const organizationData: Organization = req.body;
      await Organizations.update(organizationData, {
        where: { id: organizationId },
      });
      const updatedOrganization = await Organizations.findByPk(organizationId);
      if (updatedOrganization) {
        return res.json(updatedOrganization);
      }
      res.status(404).json({ error: "Organization not found" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the organization." });
    }
  }

  public async deleteOrganization(req: Request, res: Response) {
    try {
      const organizationId = parseInt(req.params.id);
      const organization = await Organizations.findByPk(organizationId);
      if (organization) {
        await Organizations.destroy({ where: { id: organizationId } });
        return res.json({ msg: "Organization deleted" });
      }
      res.status(404).json({ error: "Organization not found" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the organization." });
    }
  }
}

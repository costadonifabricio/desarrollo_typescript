import Organizations from "../models/organization.model";
import { Organization } from "../interfaces/organization.interface";

export class OrganizationService {
  constructor() {}

  public async findAllOrganizations() {
    const organizations = await Organizations.findAll();
    return organizations;
  }

  public async findOrganizationById(organizationId: number) {
    const organization = await Organizations.findByPk(organizationId);
    return organization;
  }

  public async createOrganization(organizationData: Organization) {
    const organization = await Organizations.create(organizationData as any);
    return organization;
  }

  public async updateOrganization(
    organizationId: number,
    organizationData: Organization
  ) {
    await Organizations.update(organizationData, {
      where: { id: organizationId },
    });
    const updatedOrganization = await Organizations.findByPk(organizationId);
    return updatedOrganization;
  }

  public async deleteOrganization(organizationId: number) {
    const deletedOrganization = await Organizations.destroy({
      where: { id: organizationId },
    });
    return deletedOrganization;
  }
}

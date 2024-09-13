import ProviderModel from "../models/provider.model";
import { Provider } from "../interfaces/provider.interface";

export class ProviderService {
  constructor() {}

  public async findAllProviders() {
    const providers = await ProviderModel.findAll();
    return providers;
  }

  public async findProviderById(providerId: number) {
    const provider = await ProviderModel.findByPk(providerId);
    return provider;
  }

  public async createProvider(providerData: Provider) {
    const provider = await ProviderModel.create(providerData as any);
    return provider;
  }

  public async updateProvider(providerId: number, providerData: Provider) {
    await ProviderModel.update(providerData, {
      where: { id: providerId },
    });
    const updatedProvider = await ProviderModel.findByPk(providerId);
    return updatedProvider;
  }

  public async deleteProvider(providerId: number) {
    const deletedProvider = await ProviderModel.destroy({
      where: { id: providerId },
    });
    return deletedProvider;
  }
}

import { Request, Response } from "express";
import { ProviderService } from "../services/provider.services";
import { Provider } from "../interfaces/provider.interface";

const providerService = new ProviderService();

export class ProviderController {
  constructor() {}

  public async findAllProviders(req: Request, res: Response) {
    try {
      const providers = await providerService.findAllProviders();
      res.json(providers);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al recuperar los proveedores." });
    }
  }

  public async findProviderById(req: Request, res: Response) {
    try {
      const providerId = parseInt(req.params.id);
      const provider = await providerService.findProviderById(providerId);
      if (provider) {
        return res.json(provider);
      }
      res.status(404).json({ error: "Proveedor no encontrado" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al recuperar el proveedor." });
    }
  }

  public async createProvider(req: Request, res: Response) {
    try {
      const providerData: Provider = req.body;

      const provider = await providerService.createProvider(providerData);

      res.status(201).json({ msg: "Proveedor creado", provider });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al crear el proveedor." });
    }
  }

  public async updateProvider(req: Request, res: Response) {
    try {
      const providerId = parseInt(req.params.id);
      const providerData: Provider = req.body;
      const updatedProvider = await providerService.updateProvider(
        providerId,
        providerData
      );
      if (updatedProvider) {
        return res.json(updatedProvider);
      }
      res.status(404).json({ error: "Proveedor no encontrado" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al actualizar el proveedor." });
    }
  }

  public async deleteProvider(req: Request, res: Response) {
    try {
      const providerId = parseInt(req.params.id);
      const deletedProvider = await providerService.deleteProvider(providerId);
      if (deletedProvider) {
        return res.json({ msg: "Proveedor eliminado" });
      }
      res.status(404).json({ error: "Proveedor no encontrado" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al eliminar el proveedor." });
    }
  }
}


import { Request, Response } from "express";
import { Users } from "../models/users.model";
import { User } from "../interfaces/users.interface";

export class UsersController {
  constructor() {}

  public async findAllUsers(req: Request, res: Response) {
    try {
      const users = await Users.findAll();
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al recuperar los usuarios." });
    }
  }

  public async findUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const user = await Users.findByPk(userId);
      if (user) {
        return res.json(user);
      }
      res.status(404).json({ error: "Usuario no encontrado" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al recuperar el usuario." });
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      const existingUser = await Users.findOne({
        where: { email: userData.email },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Ya existe un usuario con ese correo electrónico." });
      }
      const user = await Users.create(userData as any);
      res.status(201).json({ msg: "Usuario creado", user });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al crear el usuario." });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const userData: User = req.body;
      await Users.update(userData, { where: { id: userId } });
      const updatedUser = await Users.findByPk(userId);
      if (updatedUser) {
        return res.json(updatedUser);
      }
      res.status(404).json({ error: "Usuario no encontrado" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al actualizar el usuario." });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const deletedUser = await Users.destroy({
        where: { id: userId },
      });
      if (deletedUser) {
        return res.json({ msg: "Usuario eliminado" });
      }
      res.status(404).json({ error: "Usuario no encontrado" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocurrió un error al eliminar el usuario." });
    }
  }
}

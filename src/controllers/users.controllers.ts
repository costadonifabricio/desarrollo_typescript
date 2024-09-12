import { Request, Response } from "express";
import { UsersService } from "../services/users.services";
import { User } from "../interfaces/users.interface";

const usersService = new UsersService();

export class UsersController {
  constructor() {}

  public async findAllUsers(req: Request, res: Response) {
    try {
      const users = await usersService.findAllUsers();
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
      const user = await usersService.findUserById(userId);
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

      const { user, token } = await usersService.createUser(userData);

      res.status(201).json({ msg: "Usuario creado", user, token });
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al crear el usuario." });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const userData: User = req.body;
      const updatedUser = await usersService.updateUser(userId, userData);
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
      const deletedUser = await usersService.deleteUser(userId);
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
  public async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email y contraseña requeridos." });
      }

      const { user, token } = await usersService.loginUser(email, password);

      if (user && token) {
        return res.json({ msg: "Login exitoso", user, token });
      } else {
        return res.status(401).json({ error: "Credenciales inválidas." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Ocurrió un error al hacer login." });
    }
  }
}

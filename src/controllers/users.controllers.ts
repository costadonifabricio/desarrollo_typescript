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
        .json({ error: "An error occurred while retrieving users." });
    }
  }

  public async findUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const user = await Users.findByPk(userId);
      if (user) {
        return res.json(user);
      }
      res.status(404).json({ error: "User not found" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the user." });
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      const user = await Users.create(userData as any);
      res.status(201).json({ msg: "User created", user });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the user." });
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
      res.status(404).json({ error: "User not found" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the user." });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const deletedUser = await Users.destroy({
        where: { id: userId },
      });
      if (deletedUser) {
        return res.json({ msg: "User deleted" });
      }
      res.status(404).json({ error: "User not found" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    }
  }
}

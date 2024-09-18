import { Users } from "../models/users.model";
import { User } from "../interfaces/users.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "../config/enviroments";

export class UsersService {
  constructor() {}

  public async findAllUsers() {
    const users = await Users.findAll();
    return users;
  }

  public async findUserById(userId: number) {
    const user = await Users.findByPk(userId);
    return user;
  }

  public async createUser(userData: User) {
    const existingUser = await Users.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error("Ya existe un usuario con ese correo electrónico.");
    }

    const user = await Users.create(userData as any);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return { user, token };
  }

  public async updateUser(userId: number, userData: User) {
    await Users.update(userData, { where: { id: userId } });
    const updatedUser = await Users.findByPk(userId);
    return updatedUser;
  }

  public async deleteUser(userId: number) {
    const deletedUser = await Users.destroy({
      where: { id: userId },
    });
    return deletedUser;
  }
  public async loginUser(email: string, password: string) {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return { user, token };
  }
}

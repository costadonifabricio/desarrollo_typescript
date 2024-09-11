import { Users } from "../models/users.model";
import { User } from "../interfaces/users.interface";

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
    const user = await Users.create(userData as any);
    return user;
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
}

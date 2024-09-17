import { Router } from "express";
import { UsersController } from "../controllers/users.controllers";
import hashPassword from "../middlewares/hash";
import authMiddleware from "../middlewares/auth";

const router = Router();
const usersController = new UsersController();

router.get("/users", usersController.findAllUsers);
router.get("/users/:id", usersController.findUserById);
router.post("/auth/register", hashPassword, usersController.createUser);
router.put("/users/:id",usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);
router.post("/auth/login", usersController.loginUser);

export default router;

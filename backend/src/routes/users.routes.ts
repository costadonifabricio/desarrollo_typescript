import { Router } from "express";
import { UsersController } from "../controllers/users.controllers";
import hashPassword from "../middlewares/hash";
import authMiddleware from "../middlewares/auth";

const router = Router();
const usersController = new UsersController();

router.get("/users", authMiddleware, usersController.findAllUsers);
router.get("/users/:id", authMiddleware, usersController.findUserById);
router.post("/users", hashPassword, usersController.createUser);
router.put("/users/:id", authMiddleware, usersController.updateUser);
router.delete("/users/:id", authMiddleware, usersController.deleteUser);
router.post("/users/login", usersController.loginUser);

export default router;

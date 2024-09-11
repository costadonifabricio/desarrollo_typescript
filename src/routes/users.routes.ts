import { Router } from "express";
import { UsersController } from "../controllers/users.controllers";
import hashPassword from "../middlewares/hash";

const router = Router();

const usersController = new UsersController();

router.get("/users", usersController.findAllUsers);
router.get("/users/:id", usersController.findUserById);
router.post("/users", hashPassword, usersController.createUser);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);

export default router;

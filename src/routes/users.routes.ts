import { Request, Response, Router } from "express";
import { UsersController } from "../controllers/users.controllers";

const router = Router();

const usersController = new UsersController();

router.get("/users", usersController.findAllUsers);
router.get("/users/:id", usersController.findUserById);
router.post("/users", usersController.createUser);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);

export default router;
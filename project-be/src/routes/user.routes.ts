import { Router } from "express";
import * as UserController from "../controllers/user.controller";
import { authenticate } from "../middlewares/user.middleware";

const router = Router();

router.post("/sign-in", UserController.signIn);

router.post("/login", UserController.login);

router.put("/sign-out", authenticate, UserController.signOut);

router.get("/user-information", authenticate, UserController.getUserInfo);

router.put("/refresh-token", UserController.refreshToken);

export default router;
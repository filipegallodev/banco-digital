import express from "express";
import * as UserController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/login", UserController.login);

userRouter.post("/register", UserController.register);

userRouter.post("/token/validate", UserController.token)

export default userRouter;

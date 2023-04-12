import express from "express";
import * as UserController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/login", UserController.login);

userRouter.post("/register", UserController.register);

export default userRouter;

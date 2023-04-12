import { Request, Response, NextFunction } from "express";
import * as UserService from "../services/user.service";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserService.login(req.body);
    if (!data?.token) throw new Error("E-mail ou senha incorretos.");
    res.status(200).json({ token: data?.token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

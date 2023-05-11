import { Request, Response, NextFunction } from "express";
import * as UserService from "../services/user.service";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserService.login(req.body);
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ status: data.status, token: data.token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UserService.register(req.body);
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ status: data.status });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UserService.updateUser(
      req.body,
      req.headers.authorization
    );
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ user: data.user, status: data.status });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

export async function updateEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UserService.updateEmail(
      req.body,
      req.headers.authorization
    );
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ user: data.user, status: data.status });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

export async function updatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UserService.updatePassword(
      req.body,
      req.headers.authorization
    );
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ user: data.user, status: data.status });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UserService.deleteUser(req.headers.authorization);
    if (!data?.success) throw new Error(data?.status);
    res
      .status(200)
      .json({ validToken: false, user: null, status: data.status });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

export async function token(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserService.token(req.headers.authorization);
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ validToken: true, user: data.user });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

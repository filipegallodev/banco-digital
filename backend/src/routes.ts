import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();

const routes = express();
routes.use(express.json());

routes.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.users.create({
    data: {
      username: username,
      password: password,
    },
  });
  res.json(user);
});

routes.get("/", async (req: Request, res: Response) => {
  const usersList = await prisma.users.findMany();
  res.json(usersList);
});

routes.get("/byId/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

routes.put("/", async (req: Request, res: Response) => {
  const { id, username } = req.body;
  const updatedUser = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      username: username,
    },
  });
  res.json(updatedUser);
});

routes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await prisma.users.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedUser);
});

export default routes;

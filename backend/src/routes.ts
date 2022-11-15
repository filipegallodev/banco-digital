import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ name: "Fulano Ciclano", age: 99 });
});

// Testando o caminho "/home"
routes.get("/home", (req, res) => {
  return res.json({ name: "Filipe", age: 22 });
});

routes.get("/users", async (req, res) => {
  const usersResult = await prisma.users.findMany({
    orderBy: { username: "desc" },
  });

  return res.json(usersResult);
});

export { routes as default };

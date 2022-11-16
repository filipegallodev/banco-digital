import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

const postCorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const prisma = new PrismaClient();

const routes = express();
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));
routes.use(cors());

routes.post("/", cors(postCorsOptions), async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.users.create({
    data: {
      username: username,
      password: password,
      account: {
        create: {
          balance: "R$ 100,00",
        },
      },
    },
    include: {
      account: true,
    },
  });
  res.json(user);
});

routes.get("/", cors(corsOptions), async (req: Request, res: Response) => {
  const usersList = await prisma.users.findMany();
  res.json(usersList);
});

routes.get(
  "/byUsername/:username",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    const username = req.params.username;
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    res.json(user);
  }
);

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

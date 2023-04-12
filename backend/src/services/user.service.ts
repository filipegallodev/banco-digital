import { PrismaClient } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "ngcash2022";

interface ILoginData {
  username: string;
  password: string;
}

interface IRegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export async function login({ username, password }: ILoginData) {
  const dbUser = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });
  if (!dbUser?.username) return;
  const dbPassword = dbUser?.password || "null";
  const passwordComparisonResult = compareSync(password, dbPassword);
  if (passwordComparisonResult) {
    const token = jwt.sign({ userId: dbUser.id }, JWT_SECRET, {
      expiresIn: 86400,
    });
    return { token: token };
  }
}

export async function register({
  username,
  password,
  firstName,
  lastName,
}: IRegisterData) {
  const dbUser = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });
  if (dbUser)
    return {
      status: "E-mail já cadastrado.",
    };
  const saltRounds = 10;
  const hashedPassword = hashSync(password, saltRounds);
  const user = await prisma.users.create({
    data: {
      username: username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
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
  if (user)
    return {
      status: "Usuário criado com sucesso.",
      success: true,
    };
  return {
    status: "Ocorreu um erro ao cadastrar o usuário.",
  };
}

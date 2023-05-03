import { PrismaClient } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import checkAuth from "../middleware/checkAuth.middleware";
import * as PrismaUtil from "../utils/prisma.util";
import currencyFormatter from "../helpers/currencyFormatter";

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

interface IUserUpdateFormData {
  firstName: string;
  lastName: string;
  username: string;
  accountId: string;
  birth?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  income?: string;
  job?: string;
}

export async function login({ username, password }: ILoginData) {
  const dbUser = await PrismaUtil.findUser("username", username);
  if (!dbUser?.username)
    return { status: "E-mail ou senha incorretos.", success: false };
  const dbPassword = dbUser?.password || "null";
  const passwordComparisonResult = compareSync(password, dbPassword);
  if (passwordComparisonResult) {
    const token = jwt.sign({ userId: dbUser.id }, JWT_SECRET, {
      expiresIn: 86400,
    });
    return {
      token: token,
      status: "Login realizado com sucesso.",
      success: true,
    };
  }
}

export async function register({
  username,
  password,
  firstName,
  lastName,
}: IRegisterData) {
  const dbUser = await PrismaUtil.findUser("username", username);
  if (dbUser)
    return {
      status: "E-mail já cadastrado.",
      success: false,
    };
  const user = await PrismaUtil.createUser({
    username,
    password,
    firstName,
    lastName,
  });
  if (user)
    return {
      status: "Usuário criado com sucesso.",
      success: true,
    };
  return {
    status: "Ocorreu um erro ao cadastrar o usuário.",
    success: false,
  };
}

export async function update(
  formData: IUserUpdateFormData,
  authorization: string | undefined
) {
  const userId = checkAuth(authorization);
  const dbUser = await PrismaUtil.findUser("id", userId);
  if (!dbUser) return { status: "ID de usuário inválido.", success: false };
  const updatedUser = await PrismaUtil.updateUser(formData);
  return {
    user: {
      ...updatedUser,
    },
    status: "Dados atualizados com sucesso.",
    success: true,
  };
}

export async function token(authorization: string | undefined) {
  const userId = checkAuth(authorization);
  const dbUser = await PrismaUtil.findUser("id", userId);
  if (!dbUser) return { status: "ID de usuário inválido.", success: false };
  const dbUserAccount = await PrismaUtil.findAccount(dbUser);
  const brazilianCurrency = currencyFormatter(
    "pt-BR",
    "BRL",
    dbUserAccount?.balance
  );
  const user = {
    ...dbUser,
    balance: brazilianCurrency,
  };
  return { status: "Token validado com sucesso.", success: true, user };
}

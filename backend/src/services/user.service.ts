import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "ngcash2022";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
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

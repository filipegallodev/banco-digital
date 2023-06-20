import checkAuth from "../middleware/checkAuth.middleware";
import { ILoan } from "../types/loan";
import * as PrismaUtil from "../utils/prisma.util";

export async function newLoan(
  loanData: ILoan,
  authorization: string | undefined
) {
  const userId = checkAuth(authorization);
  const dbUser = await PrismaUtil.findUser("id", userId);
  if (!dbUser) return { status: "Usuário não encontrado.", success: false };
  await PrismaUtil.createLoan(loanData, dbUser);
  return { status: "Empréstimo realizado com sucesso.", success: true };
}

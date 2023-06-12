import checkAuth from "../middleware/checkAuth.middleware";
import * as PrismaUtil from "../utils/prisma.util";

interface ILoan {
  loan: {
    debt: number;
    requested: number;
  };
  installment: {
    amount: number;
    dueDay: number;
    value: number;
  };
}

export async function newLoan(
  { loan, installment }: ILoan,
  authorization: string | undefined
) {
  const userId = checkAuth(authorization);
  const dbUser = await PrismaUtil.findUser("id", userId);
  if (!dbUser) return { status: "Usuário não encontrado.", success: false };
  return { status: "Tudo Ok.", success: true };
}

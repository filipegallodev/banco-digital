import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "ngcash2022";

const routes = express();
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));
routes.use(cors());

routes.get("/", cors(corsOptions), async (req: Request, res: Response) => {
  res.json({ message: "Tudo okay por aqui!" });
});

function verifyJWT(req: Request, res: Response, next: any) {
  const token = req.headers.authorization;
  jwt.verify(<any>token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(401).json({ validToken: false }).end();

    req.body.userId = (<any>decoded).userId;
    next();
  });
}

routes.post(
  "/validateToken",
  cors(corsOptions),
  verifyJWT,
  async (req: Request, res: Response) => {
    const { userId: id } = req.body;
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    const userAccount = await prisma.accounts.findUnique({
      where: {
        id: user?.accountId,
      },
    });
    res.status(200).json({
      validToken: true,
      user: { username: user?.username, balance: userAccount?.balance },
    });
  }
);

async function addTransaction(
  accountToDebit: any,
  accountToCredit: any,
  amountToTransfer: any
) {
  const amountInBrFormat = `R$ ${amountToTransfer.replace(".", ",")}`;
  const transaction = await prisma.transactions.create({
    data: {
      creditedAccountId: accountToCredit.id,
      debitedAccountId: accountToDebit.id,
      value: amountInBrFormat,
    },
  });
  if (transaction) return true;
  return false;
}

async function transferMoney(amountToTransfer: any, [...accounts]) {
  const [accountToDebit, accountToCredit] = accounts.map((account) => {
    return {
      id: account.id,
      balance: account.balance.replace("R$ ", "").replace(",", "."),
    };
  });

  const debitSum = `${accountToDebit.balance - amountToTransfer}`.replace(
    ".",
    ","
  );

  const creditSum = `${
    Number(accountToCredit.balance) + Number(amountToTransfer)
  }`.replace(".", ",");

  if (Number(accountToDebit.balance) > amountToTransfer) {
    const updateAccountDebited = await prisma.accounts.update({
      where: {
        id: accountToDebit.id,
      },
      data: {
        balance: `R$ ${debitSum}`,
      },
    });
    const updateAccountCredited = await prisma.accounts.update({
      where: {
        id: accountToCredit.id,
      },
      data: {
        balance: `R$ ${creditSum}`,
      },
    });

    const transaction = addTransaction(
      accountToDebit,
      accountToCredit,
      amountToTransfer
    );

    if (await transaction) return true;
    return false;
  }
  return false;
}

routes.post(
  "/transfer",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    const { userOrigin, userDestiny, amountToTransfer } = req.body;

    const userToDebit = await prisma.users.findUnique({
      where: {
        username: userOrigin,
      },
    });
    const accountToDebit = await prisma.accounts.findUnique({
      where: {
        id: userToDebit?.accountId,
      },
    });

    const userToCredit = await prisma.users.findUnique({
      where: {
        username: userDestiny,
      },
    });
    const accountToCredit = await prisma.accounts.findUnique({
      where: {
        id: userToCredit?.accountId,
      },
    });

    const data = transferMoney(amountToTransfer, [
      accountToDebit,
      accountToCredit,
    ]);

    if (await data) {
      res.status(200).json({ transactionStatus: true }).end();
    } else {
      res.status(400).json({ transactionStatus: false }).end();
    }
  }
);

routes.post(
  "/transactions",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    const userDebitTransactions = await prisma.transactions.findMany({
      where: {
        debitedAccountId: user?.accountId,
      },
    });

    const userCreditTransactions = await prisma.transactions.findMany({
      where: {
        creditedAccountId: user?.accountId,
      },
    });

    if (userDebitTransactions || userCreditTransactions) {
      res
        .status(200)
        .json({
          transactions: [...userDebitTransactions, ...userCreditTransactions],
          accountId: user?.accountId,
        })
        .end();
    }
    res.status(404).end();
  }
);

routes.post(
  "/login",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    const hashPassword = user?.password || "null";
    const comparisonResult = bcrypt.compareSync(password, hashPassword);
    if (comparisonResult) {
      const token = jwt.sign({ userId: user?.id }, JWT_SECRET, {
        expiresIn: 86400,
      });
      return res.json({ auth: true, token });
    }
    res.status(401).end();
  }
);

routes.post(
  "/register",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const user = await prisma.users.create({
      data: {
        username: username,
        password: hashPassword,
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
  }
);

routes.post(
  "/logout",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    res.end();
  }
);

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

routes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await prisma.transactions.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedUser);
});

export default routes;

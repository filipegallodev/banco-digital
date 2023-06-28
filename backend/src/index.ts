import express from "express";
import userRouter from "./routes/user.route";
import transactionRouter from "./routes/transaction.route";
import cors from "cors";
import loanRouter from "./routes/loan.route";
import cardRouter from "./routes/card.route";

const port = process.env.PORT || 3333;
const server = express();

server.use(cors());
server.use(express.json());
server.use(userRouter);
server.use(loanRouter);
server.use(transactionRouter);
server.use(cardRouter);

server.listen(port, () => {
  console.log(`[SERVIDOR] Rodando na porta ${port}`);
});

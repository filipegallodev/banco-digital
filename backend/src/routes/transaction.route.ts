import express from "express";
import * as TransactionController from "../controllers/transaction.controller";

const transactionRouter = express.Router();

transactionRouter.post("/transaction/create", TransactionController.create);
transactionRouter.post("/transaction/list", TransactionController.list)

export default transactionRouter;

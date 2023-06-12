import express from "express";
import * as LoanController from "../controllers/loan.controller";

const loanRouter = express.Router();

loanRouter.post("/loan/new", LoanController.newLoan);

export default loanRouter;

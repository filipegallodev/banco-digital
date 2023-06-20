import { Request, Response, NextFunction } from "express";
import * as LoanService from "../services/loan.service";

export async function newLoan(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await LoanService.newLoan(req.body, req.headers.authorization);
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ status: data.status });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

export async function getLoans(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await LoanService.getLoans(req.headers.authorization);
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ loans: data.loans, nextLoan: data.nextLoan });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

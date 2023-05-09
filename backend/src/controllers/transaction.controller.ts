import { Request, Response, NextFunction } from "express";
import * as TransactionService from "../services/transaction.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await TransactionService.create(
      req.body,
      req.headers.authorization
    );
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ status: data?.status });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await TransactionService.list(req.headers.authorization);
    if (!data?.success) throw new Error(data?.status);
    res
      .status(200)
      .json({
        status: data.status,
        allTransactions: data.allTransactions,
        totalTransferValue: data.totalTransferValue,
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

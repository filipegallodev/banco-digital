import { Request, Response, NextFunction } from "express";
import * as CardService from "../services/card.service";

export async function newCard(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CardService.newCard(req.body, req.headers.authorization);
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ status: data.status });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

export async function getCards(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CardService.getCards(req.headers.authorization);
    if (!data?.success) throw new Error(data?.status);
    res.status(200).json({ cards: data.cards, status: data.status });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ error: err.message });
    }
    next(err);
  }
}

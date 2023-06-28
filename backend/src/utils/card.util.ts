import { PrismaClient, User } from "@prisma/client";
import { ICard } from "../types/card";

const prisma = new PrismaClient();

export async function createCard(cardData: ICard, user: User) {
  return false;
}

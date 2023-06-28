import { PrismaClient, User } from "@prisma/client";
import { ICard } from "../types/card";
import { generateCardCvv } from "../helpers/generateCardCvv";

const prisma = new PrismaClient();

export async function createCard(cardData: ICard, user: User) {
  try {
    await prisma.card.create({
      data: {
        type: cardData.type,
        number: cardData.number,
        cvv: generateCardCvv(),
        owner: cardData.owner,
        validity: cardData.validity,
        invoiceClosing: cardData.invoiceClosing,
        accountId: user.accountId,
      },
    });
    return true;
  } catch (error) {
    return;
  }
}

export async function findCards(user: User) {
  try {
    const cards = await prisma.card.findMany({
      where: {
        accountId: user.accountId,
      },
    });
    return cards;
  } catch (error) {
    return;
  }
}

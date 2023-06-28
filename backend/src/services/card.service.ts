import checkAuth from "../middleware/checkAuth.middleware";
import { ICard } from "../types/card";
import * as PrismaUtil from "../utils/prisma.util";
import * as CardUtil from "../utils/card.util";

export async function newCard(
  cardData: ICard,
  authorization: string | undefined
) {
  const userId = checkAuth(authorization);
  const dbUser = await PrismaUtil.findUser("id", userId);
  if (!dbUser) return { status: "Usuário não encontrado.", success: false };
  const cards = await CardUtil.findCards(dbUser);
  const result = cards?.find((card) => card.type === cardData.type);
  if (result)
    return {
      cards,
      status: `Você já possui um cartão ${cardData.type.toUpperCase()}.`,
      success: false,
    };
  await CardUtil.createCard(cardData, dbUser);
  const newCards = await CardUtil.findCards(dbUser);
  return {
    cards: newCards,
    status: "Cartão solicitado com sucesso.",
    success: true,
  };
}

export async function getCards(authorization: string | undefined) {
  const userId = checkAuth(authorization);
  const dbUser = await PrismaUtil.findUser("id", userId);
  if (!dbUser) return { status: "Usuário não encontrado.", success: false };
  const cards = await CardUtil.findCards(dbUser);
  if (!cards) return { status: "Nenhum cartão encontrado.", success: false };
  return {
    cards,
    status: "Busca de cartões concluída com sucesso.",
    success: true,
  };
}

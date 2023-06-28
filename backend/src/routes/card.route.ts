import express from "express";
import * as CardController from "../controllers/card.controller";

const cardRouter = express.Router();

cardRouter.post("/card/new", CardController.newCard);
cardRouter.post("/cards", CardController.getCards);

export default cardRouter;

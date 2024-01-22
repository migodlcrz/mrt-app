import express from "express";
import {
  getCard,
  getCards,
  createCard,
  deleteCard,
  updateCard,
} from "../controllers/cardControllers";
import requireAuth from "../middleware/requireAuth";

const crd = express.Router();

crd.use(requireAuth);

//GET all card
crd.get("/", getCards);

// GET one card
crd.get("/:id", getCard);

//CREATE a card
crd.post("/", createCard);

//DELETE one card
crd.delete("/:id", deleteCard);

//UPDATE one card
crd.patch("/:id", updateCard);

export default crd;

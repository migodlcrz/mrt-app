import Card from "../models/cardModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

//GET all cards
export const getCards = async (req: Request, res: Response) => {
  const cards = await Card.find({}).sort({ createdAt: -1 });
  res.status(200).json(cards);
};

//GET one card
export const getCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  //check if entered id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Card does not exist." });
  }

  //gets the json with the same id
  const card = await Card.findById(id);

  //check if card exist
  if (!card) {
    return res.status(404).json({ error: "Card does not exist." });
  }

  //outputs the json with the id
  res.status(200).json(card);
};

//CREATE a card
export const createCard = async (req: Request, res: Response) => {
  const { uid, balance } = req.body;

  //Checking if the user exists in databases
  try {
    const card = await Card.create({ uid, balance });
    res.status(200).json(card);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//UPDATE a card
export const updateCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  //check if entered id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Card does not exist." });
  }

  const { balance } = req.body;

  if (balance < 1) {
    return res.status(404).json({ error: "Balance cannot be negative." });
  }

  //updates the card
  const card = await Card.findOneAndUpdate(
    { _id: id },
    {
      // ...req.body,
      balance: balance,
    }
  );

  //check if user exist
  if (!card) {
    return res.status(404).json({ error: "Card does not exist." });
  }

  res.status(200).json(card);
};

//DELETE a card
export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid card ID." });
  }

  const card = await Card.findOneAndDelete({ _id: id });

  if (!card) {
    return res.status(404).json({ error: "Card does not exist." });
  }

  res.status(200).json(card);
};

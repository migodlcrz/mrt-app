import Account from "../models/accountModel";
import { Request, Response } from "express";
import mongoose, { mongo } from "mongoose";

//check if account exist
export const checkAccount = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const account = await Account.findOne({ username, password });

    if (!account) {
      return res.status(401).json("Invalid Credentials");
    }
    res.status(200).json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

//GET all accounts
export const getAccounts = async (req: Request, res: Response) => {
  const accounts = await Account.find({}).sort({ createdAt: -1 });
  res.status(200).json(accounts);
};

//GET one account
export const getAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID input." });
  }

  const account = await Account.findById(id);

  if (!account) {
    return res.status(404).json({ error: "Account does not exist." });
  }

  res.status(200).json(account);
};

//CREATE an account
export const createAccount = async (req: Request, res: Response) => {
  const { uid, username, password } = req.body;

  try {
    const account = await Account.create({ uid, username, password });
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//UPDATE an account
export const updateAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID input" });
  }

  const account = await Account.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!account) {
    return res.status(404).json({ error: "Account does not exist." });
  }

  res.status(200).json(account);
};

//DELETE an account
export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ error: "Invalid user ID." });
  }

  const account = await Account.findOneAndDelete({ _id: id });

  if (!account) {
    return res.status(404).send({ error: "User not found." });
  }

  res.status(200).json(account);
};

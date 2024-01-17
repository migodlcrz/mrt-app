import express from "express";

import {
  getAccount,
  getAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
  checkAccount,
} from "../controllers/accountControllers";

const acc = express.Router();

//check if it exist
acc.post("/check/", checkAccount);

//GET all account
acc.get("/", getAccounts);

// GET one account
acc.get("/:id", getAccount);

//CREATE a account
acc.post("/", createAccount);

//DELETE one account
acc.delete("/:id", deleteAccount);

//UPDATE one account
acc.patch("/:id", updateAccount);

export default acc;

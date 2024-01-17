import express from "express";
import { loginUser, signupUser } from "../controllers/userControllers";

const user = express.Router();

user.post("/login", loginUser);

user.post("/signup", signupUser);

export default user;

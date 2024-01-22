import express from "express";

import {
  getFares,
  getFare,
  updateFare,
  createFare,
} from "../controllers/fareController";
import requireAuth from "../middleware/requireAuth";

const fare = express.Router();

fare.get("/", getFares);

fare.get("/:id", getFare);

fare.post("/", createFare);

fare.patch("/:id", updateFare);

export default fare;

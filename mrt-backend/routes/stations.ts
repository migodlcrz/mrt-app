import express from "express";

import {
  getStations,
  getStation,
  createStation,
  deleteStation,
  updateStation,
} from "../controllers/stationControllers";
import requireAuth from "../middleware/requireAuth";

const stn = express.Router();

stn.get("/", getStations);

stn.get("/:id", getStation);

stn.post("/", createStation);

stn.delete("/:id", deleteStation);

stn.patch("/:id", updateStation);

export default stn;

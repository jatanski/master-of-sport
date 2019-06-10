import express from "express";
import Statistics from "../models/statisticsModel";
import auth from "../middleware/auth";
import { User } from "../models/userModel";

const router = express.Router();
